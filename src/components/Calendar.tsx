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
  width: 600rem;
  height: fit-content;
  max-width: 100%;
  font-weight: 600;
  background: #ffff;
  border: 1rem solid #eeeeee;
  line-height: 1.125em;
  border-radius: 10rem;
  box-shadow: 0rem 0rem 10rem #f4f4f4;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0rem 0 20rem 0;

  .react-calendar__navigation__label__labelText {
    font-weight: 700;
    font-size: 25rem;
  }

  .react-calendar {
    margin: 10rem;
  }

  .react-calendar__tile {
    margin: 10rem 10rem 10rem 0;
  }

  .react-calendar__navigation {
    font-weight: 700;
    margin-bottom: 40rem;
    margin-top: 20rem;
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
