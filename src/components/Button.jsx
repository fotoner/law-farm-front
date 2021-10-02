import styled from "styled-components";
import colors from "../lib/colors";

const ButtonStyle = styled.button`
  width: 100%;
  height: 3rem;
  font-weight: bold;
  background-color: ${colors.highlightColor};
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 0 solid;

  transition: background 0.3s ease;
  
  :focus{
    background-color:${colors.lightColor}
  }
  :hover{
    background-color:${colors.lightColor}
  }
`;

const Button = ({ children }) => {
  return <ButtonStyle>{children}</ButtonStyle>;
};

export default Button;
