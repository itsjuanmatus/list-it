import { InputStatesObjectType } from '../../../types/Searchbox/InputStateType';

export const InitialInputStates: InputStatesObjectType = {
  location: {
    name: 'location',
    label: 'Location',
    placeholder: 'Where are you going?',
    inputEntered: false,
    value: '',
  },
  category: {
    name: 'category',
    label: 'What do you need?',
    placeholder: 'E.g. Sony Alpha A6000',
    inputEntered: false,
    value: '',
  },
  checkIn: {
    name: 'checkIn',
    label: 'Check in',
    placeholder: 'Check in date',
    inputEntered: false,
    value: '',
  },
  checkOut: {
    name: 'checkOut',
    label: 'Check out',
    placeholder: 'Check out date',
    inputEntered: false,
    value: '',
  },
};
