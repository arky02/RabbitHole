import {
  Border20GrayD9Div,
  FlexColumn,
  FlexColumnCenterAll,
} from '@/styles/CommonStyles';
import { COLORS } from '@/styles/palatte';
import styled from 'styled-components';
import Checkbox from './Buttons/Checkbox';
import { useState } from 'react';

const student = [
  ['강ㅇㅇ', 1, 2],
  ['김ㅇㅇ', 3, 2],
  ['강ㅇㅇ', 2, 1],
  ['강ㅇㅇ', 1, 2],
  ['김ㅇㅇ', 3, 2],
  ['강ㅇㅇ', 2, 1],
];
function StudentList() {
  const [checkedList, setCheckedList] = useState<number[]>([]);

  return (
    <Wrapper>
      <Text>참여 학생 목록</Text>
      <ListWrapper>
        {student.map((el, idx) => (
          <div key={idx}>
            <ListDiv>
              <Checkbox
                isChecked={checkedList.includes(idx)}
                onClick={() =>
                  setCheckedList((prev) =>
                    prev.includes(idx)
                      ? prev.filter((el) => el !== idx)
                      : [...prev, idx],
                  )
                }
              />
              <Name>{el[0]}</Name>
              <Desc>{el[1] + '학년 ' + el[2] + '반'}</Desc>
            </ListDiv>
          </div>
        ))}
      </ListWrapper>
    </Wrapper>
  );
}

export default StudentList;

const Wrapper = styled(Border20GrayD9Div)`
  padding: 18rem 15rem 25rem 42rem;
  height: 220rem;
  width: 100%;
`;

const Text = styled.h5`
  color: ${COLORS.GRAY_66};
  font-size: 14rem;
  font-weight: 700;
  margin-bottom: 7rem;
`;

const ListWrapper = styled(FlexColumn)`
  overflow-y: scroll;
  height: 170rem;
`;

const ListDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 19rem;
  padding: 16rem 0;
  border-bottom: 1rem solid #e0e0e0;
`;

const Name = styled.h3`
  color: ${COLORS.GRAY_66};
  text-align: center;
  font-size: 14rem;
  font-weight: 700;
`;

const Desc = styled.h5`
  color: #b0b0b0;
  font-size: 10rem;
  font-weight: 700;
`;
