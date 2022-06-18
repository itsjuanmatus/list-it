export interface InputStateType {
  name: string;
  label: string;
  placeholder: string;
  inputEntered: boolean;
  value: string;
  id?: string;
}

export type InputStatesObjectType = {
  [key: string]: InputStateType;
};
