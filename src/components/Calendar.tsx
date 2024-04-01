import styled from 'styled-components';
import Calendar from 'react-calendar';
import { useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarSection() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <Wrapper>
      <Calendar onChange={onChange} value={value} locale="kr-KR" />
    </Wrapper>
  );
}

export default CalendarSection;

const Wrapper = styled.div`
  width: 600px;
  height: fit-content;
  max-width: 100%;
  font-weight: 600;
  background: #ffff;
  border: 1px solid #eeeeee;
  line-height: 1.125em;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #f4f4f4;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0px 0 20px 0;

  .react-calendar__navigation__label__labelText {
    font-weight: 700;
    font-size: 25rem;
  }

  .react-calendar {
    margin: 10px;
  }

  .react-calendar__tile {
    margin: 10px 10px 10px 0;
  }

  .react-calendar__navigation {
    font-weight: 700;
    margin-bottom: 40px;
    margin-top: 20px;
  }

  .react-calendar__tile--now {
    background: #ef7ff1;
    color: #fafafa;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ef7ff1;
    color: #fafafa;
  }

  .react-calendar__tile--active {
    background: #7fd8d9;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #7fd8d9;
  }
`;
