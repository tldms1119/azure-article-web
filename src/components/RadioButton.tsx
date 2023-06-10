import styled from "styled-components";

type Props = {
    children: string,
    value : string,
    name : string,
    checked?: boolean | false,
    defaultChecked?: string,
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Label = styled.label`
    padding: 10px;
    width: 100px;
    input {
        margin-top: 10px;
        padding: 10px;
    }
`;

function RadioButton({children, value, name, checked, defaultChecked, onChange}: Props) {
    return (
        <Label>
          <input
            type="radio"
            value={value}
            name={name}
            checked={checked}
            onChange={onChange}
          />
          {children}
        </Label>
      );
}

export default RadioButton;