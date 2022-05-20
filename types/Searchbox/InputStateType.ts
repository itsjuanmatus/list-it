export interface InputStateType {
  name: string;
  label: string;
  placeholder: string;
  inputEntered: boolean;
  value: string;
}

export type InputStatesObjectType = {
  [key: string]: InputStateType;
};
