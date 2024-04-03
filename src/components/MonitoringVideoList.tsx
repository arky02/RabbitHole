import { FlexColumn, FlexColumnCenterAll } from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import styled from 'styled-components';
import Button from './Buttons/Button';
import useManageUserToken from '@/hooks/useManageUserToken';
import VideoModal from './Modals/VideoModal';
import { useQuery } from '@tanstack/react-query';
import { getStudentInfo } from '@/apis/capsuleQuery';

export interface Student {
  peerConnection: RTCPeerConnection | null;
  remoteStream: MediaStream | null;
  callID: string | null;
  studentUID: number | null;
}

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

function MonitoringVideoList() {
  const [studentList, setStudentList] = useState<Student[]>([]);
  const studentMonitorList = useRef<Student[]>([]);

  const socket = useRef<Socket | null>(null);

  const { userToken } = useManageUserToken();

  const connectSocket = () => {
    if (userToken.length !== 0 && socket.current == null) {
      console.log('attempting to connect : ' + userToken);

      socket.current = io('https://api.rabbitholecompany.com/', {
        reconnectionDelayMax: 10000,
        query: {
          token: userToken,
        },
      });

      socket.current.on('connect', () => {
        console.log('Connected to server');
      });

      socket.current.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
          // socket close is initiated by server
          // socket.connect();
        }
        console.error('ERROR : ' + reason);
      });

      socket.current.on('message', (data) => {
        console.log('Recieve message : ', data);
      });

      socket.current.on('student_status_change', (data) => {
        console.log(
          'Student Join : ' + data.message + ' / ID : ' + data.student_uid,
        );

        if (data.message === 'disconnected') {
          setStudentList((prev) =>
            prev.filter((el) => el.studentUID !== data.student_uid),
          );
          return;
        }

        // check student id is already in list
        let haveStudent = false;
        studentList.forEach((student) => {
          if (student.callID === data.student_uid) {
            haveStudent = true;
          }
        });

        // collide same student id key => end
        if (haveStudent) {
          console.log(
            'Already same student joined! JOINED_KEY : ' + data.student_uid,
          );
          return;
        }

        const studentConnection = new RTCPeerConnection(servers);
        const remoteStream = new MediaStream();

        // localStream might be null.. -> It's ok (선생님 항상 비디오 보여줄 필요 없음)
        // TODO : 과연 모든 학생에게 선생 미디어를 보여줘야 하나요?
        // localStream.current.getTracks().forEach((track) => {
        //   studentConnection.addTrack(track, localStream.current);
        // });

        studentConnection.ontrack = (event) => {
          remoteStream.addTrack(event.track);
        };

        // add new monitor
        // const studentMonitor = new StudentMonitor(
        //   studentConnection,
        //   remoteStream,
        //   '',
        //   data.student_uid,
        // );

        let studentMonitor: Student = {
          peerConnection: studentConnection,
          remoteStream: remoteStream,
          callID: '',
          studentUID: data.student_uid,
        };

        studentMonitorList.current.push(studentMonitor);

        setStudentList((prev) => [...prev, studentMonitor]);
        // setStudentList(studentMonitorList.current);

        console.log('curr studentMonitorEl: ', studentMonitor);

        const newArr = [...studentList, studentMonitor];
        console.log('Made new array size : ' + newArr.length + ' ts');

        console.log('New student "' + data.student_uid + '" video set');
      });

      let targetStudent: Student = {
        callID: null,
        peerConnection: null,
        remoteStream: null,
        studentUID: null,
      };

      socket.current?.on('receive_webrtc', (data) => {
        console.log('Receiving message from student...');

        // let targetStudent: StudentMonitor | null = null;

        console.log('student size : ', studentList.length);
        studentMonitorList.current.forEach((student) => {
          if (student.studentUID === data.studentUid) {
            console.log(
              'Found student with UID : ' +
                student.studentUID +
                ' / ' +
                data.studentUid,
            );
            console.log(student);
            targetStudent.callID = student.callID;
            targetStudent.peerConnection = student.peerConnection;
            targetStudent.remoteStream = student.remoteStream;
            targetStudent.studentUID = student.studentUID;
          }
        });

        // if (targetStudent === null || targetStudent !== StudentMonitor) {
        //   console.error('No student found in list.');
        //   return;
        // }

        console.log(targetStudent);
        if (targetStudent === null) return;

        console.log('data', data.event);

        switch (data.event) {
          case 'offerInfo':
            const offer = data.message.offer;
            console.log('took offer => ');
            console.log(offer);

            targetStudent.callID = data.message.callID;
            console.log(
              'targetStudent.callID : ' +
                targetStudent.callID +
                '\n' +
                'targetStudent.UID : ' +
                targetStudent.studentUID,
            );

            targetStudent!.peerConnection!.setRemoteDescription(
              new RTCSessionDescription(offer),
            );

            const answerDescription =
              targetStudent!.peerConnection!.createAnswer();

            answerDescription.then((_answer: any) => {
              targetStudent!
                .peerConnection!.setLocalDescription(_answer)
                .then(() => {
                  const answer = {
                    sdp: _answer.sdp,
                    type: 'answer',
                  };
                  console.log('AnswerDesc => ');
                  console.log(answerDescription);

                  socket.current!.emit('webrtc_msg_to_student', {
                    studentUid: targetStudent.studentUID,
                    event: 'answerInfo',
                    message: { answer: answer },
                  });
                });
            });
            targetStudent!.peerConnection!.onicecandidate = (event) => {
              if (event.candidate) {
                const _cand = event.candidate.toJSON();

                console.log('New Candidate Generated => ');
                console.log(_cand);

                socket.current!.emit('webrtc_msg_to_student', {
                  studentUid: targetStudent.studentUID,
                  event: 'candidateInfo',
                  message: {
                    candidate: _cand,
                  },
                });
              }
            };

            break;

          case 'candidateInfo':
            console.log(
              'Got Candidate from student UID : ' + targetStudent.studentUID,
            );

            const candiate = data.message.candidate;
            const sdpMLineIndex = data.message.sdpMLineIndex;
            const sdpMid = data.message.sdpMid;

            console.log(
              'Candiate Info : ' +
                candiate +
                ' / ' +
                sdpMLineIndex +
                ' / ' +
                sdpMid,
            );

            const iceCandidate = new RTCIceCandidate({
              candidate: candiate,
              sdpMLineIndex: sdpMLineIndex,
              sdpMid: sdpMid,
            });

            targetStudent!.peerConnection!.addIceCandidate(iceCandidate);

            console.log('ICE Candidate from student Registered!');

            console.log(
              "Teacher's 'ICE candidates sending to student' delegate registered",
            );

            break;
          default:
            console.error('Unfound event in receiving webrtc');
        }
      });
    }
  };

  useEffect(() => {
    connectSocket();
  }, [userToken, studentList]);

  return (
    <VideoListWrapper>
      {studentList &&
        studentList.map((student, idx: number) => (
          <Video
            stream={student.remoteStream}
            studentId={student.studentUID}
            key={student.studentUID}
          />
        ))}
      {/* <div> Student Number : {studentList && studentList.length}</div> */}
    </VideoListWrapper>
  );
}

export default MonitoringVideoList;

const Video = ({
  stream,
  studentId,
}: {
  stream: MediaStream | null;
  studentId: number | null;
}) => {
  const ref = useRef<HTMLVideoElement | null>();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const { userToken } = useManageUserToken();

  const studentInfo = useQuery(getStudentInfo(userToken, studentId!)).data
    ?.data;

  console.log(studentInfo);

  useEffect(() => {
    if (ref.current) {
      ref.current!.srcObject = stream;
    }
  }),
    [];

  return (
    <FlexColumnCenterAll>
      <VideoWrapper onClick={() => setIsVideoModalOpen(true)}>
        {/* @ts-ignore */}
        <StyledVideo ref={ref} playsInline autoPlay muted></StyledVideo>
        {/* <VideoStyleWrapper /> */}
      </VideoWrapper>
      {ref && <Text>{studentInfo?.name}</Text>}
      <VideoModal
        /* @ts-ignore */
        ref={ref}
        isOpen={isVideoModalOpen}
        onOkClick={() => setIsVideoModalOpen(false)}
        onCancelClick={() => setIsVideoModalOpen(false)}
        studentName={studentInfo?.name}
      ></VideoModal>
    </FlexColumnCenterAll>
  );
};

const StyledVideo = styled.video`
  width: auto;
  height: 100%;
`;

const VideoWrapper = styled.div`
  width: 250px;
  position: relative;
  height: 180px;
  border-radius: 20px;
  overflow: hidden;
`;

const VideoListWrapper = styled.div`
  width: 1150px;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
`;

const VideoStyleWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  border-radius: 20px;
  width: 250px;
  height: 180px;
  overflow: hidden;
  display: flex;
  z-index: 999;
  inset: 0;
  position: absolute;

  &:hover {
    cursor: pointer;
    background: ${COLORS.MAIN_GRAD};
  }
`;

const StateChip = styled(Button)`
  cursor: none;
  z-index: 99;
`;

const Text = styled.h5`
  color: #666;
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
`;

// 214231		: 5
// 11321 		: 6
// 1234		: 8
// 123432		: 9
// 214231		: 10
