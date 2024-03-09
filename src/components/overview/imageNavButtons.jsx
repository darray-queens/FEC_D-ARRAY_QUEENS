import styled from 'styled-components';

export const PrevThumb = styled.a`
  cursor: pointer;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 3px;
  user-select: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const NextThumb = styled.a`
  cursor: pointer;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  user-select: none;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const PrevMain = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  left: 70px;
  border-radius: 3px;
  user-select: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const NextMain = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  user-select: none;
  right: 70px;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
