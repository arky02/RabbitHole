import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Book from '@/public/icon/book.svg';
import Arrow from '@/public/icon/purpleDownTriArrow.svg';
import { Dispatch, SetStateAction, useState } from 'react';
import UpArrow from '@/public/icon/purpleUpTriArrow.svg';
import useMenuPopup from '@/hooks/useMenuPopup';

interface DropdownProps {
  content: string[];
  name: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}
function Dropdown({ content, name, selected, setSelected }: DropdownProps) {
  const { buttonRef, popupRef, isOpen, setIsOpen } = useMenuPopup();

  return (
    <Wrapper>
      <DropdownButton
        onClick={() => setIsOpen((prev) => !prev)}
        ref={buttonRef}
      >
        {selected || name}
        <Image
          src={isOpen ? UpArrow : Arrow}
          width={11}
          height={9}
          alt="arrow"
        ></Image>
      </DropdownButton>
      {isOpen && (
        <StyledContainer $isOpen={isOpen} ref={popupRef}>
          <ul>
            {content.map((el) => (
              <li key={el}>
                <StyledLink
                  onClick={(e) => {
                    setSelected(e.currentTarget.textContent!);
                  }}
                >
                  {el}
                </StyledLink>
              </li>
            ))}
          </ul>
        </StyledContainer>
      )}
    </Wrapper>
  );
}

export default Dropdown;

const Wrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  border-radius: 10rem;
  border: 1rem solid #cdcdcd;
  background: white;
  color: #000;
  font-size: 14rem;
  font-weight: 600;
  width: 70rem;
  height: 40rem;
  flex-shrink: 0;
  padding: 0 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const StyledContainer = styled.div<{
  $isOpen: boolean;
}>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: absolute;
  height: auto;
  background-color: white;
  top: 45rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6rem;
  z-index: 10;
  display: flex;
  width: 70rem;
  padding: 9rem 8rem;
  gap: 5rem;
  border-radius: 10rem;
  border: 1rem solid #cdcdcd;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  ul > li {
    display: flex;
    align-items: center;

    padding: 3rem 9rem;
    border-radius: 5rem;

    &:hover {
      background-color: #c8abee74;
    }
  }
`;

const StyledLink = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14rem;
  font-style: normal;
  justify-content: center;
  font-weight: 500;
`;

const StyledImage = styled(Image)`
  margin-right: 11rem;
`;
