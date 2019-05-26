import * as React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  height: 60px;
  display: inline-flex;
  flex-direction: column;
  border-bottom: 1px solid #e7e7e7;
`

const Label = styled.div`
  color: #bbbbbb;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  height: 16px;
`

const Input = styled.input`
  border: none;
  caret-color: #242424;
  color: #242424;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 500;
  height: 24px;
  margin: 6px 0 10px;
  outline: none;
  width: 440px;
  ::placeholder {
    color: #bbbbbb;
  }
`

export interface SelectProps {
  defaultValue?: string;
  label: string;
  placeholder?: string;
}

export class Select extends React.Component<SelectProps, {}> {
  render() {
    const {
      defaultValue,
      label,
      placeholder
    } = this.props;
    return (
      <Field>
        <Label>{label}</Label>
        <Input placeholder={placeholder} defaultValue={defaultValue} />
      </Field>
    );
  }
}
