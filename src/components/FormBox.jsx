import styled from "styled-components";
import colors from "../lib/colors";

const FormStyle = styled.article`
  width: 100vw;
  min-height: 100vh;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .header-gap {
    height: 64px;
    width: 100%;
    background-color: #fff;
  }
  & > .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
  }
`;

const FormMain = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px;
  width: 30rem;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px 1px rgb(0 0 0 / 5%);
  border-radius: 0.5rem;
  
  .head {
    font-weight: bold;
    font-size: 32px;
    color: ${colors.fontDarkGrey};
  }
  .inputBox {
    margin-bottom:16px;
  }
`;

const FormBox = ({children}) => {
  return (
    <FormStyle className="login">
      <div className="header-gap" />
      <div className="inner">
        <FormMain>
          {children}
        </FormMain>
      </div>
    </FormStyle>
  )
}

export default FormBox
