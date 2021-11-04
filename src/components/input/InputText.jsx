import styled from "styled-components";

import colors from "../../lib/colors";

const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .inputTitle {
    font-weight: bold;
    color: ${colors.fontDarkGrey};
  }

  .subinfo {
  }

  input {
    box-sizing: border-box;
    padding: 0.5rem;
    border: 1px solid ${colors.borderColor};
    border-radius: 5px;
  }
`;

const InputText = ({
  placeholder,
  inputTitle,
  subinfo,
  handler,
  defaultValue,
  target,
  type = "text",
  required,
}) => {
  return (
    <InputStyle className="inputBox">
      <label className="inputTitle">{inputTitle}</label>
      {subinfo && <lebel className="subinfo">* {subinfo}</lebel>}
      <input
        required={required ? true : false}
        type={type}
        placeholder={placeholder}
        onChange={(e) => handler(e, target)}
        defaultValue={defaultValue ? defaultValue : ""}
      />
    </InputStyle>
  );
};

export default InputText;
