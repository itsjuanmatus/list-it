import { InputStatesObjectType } from '../../../types/Searchbox/InputStateType';

export function reducer(state: InputStatesObjectType, action: any) {
  switch (action.type) {
    case 'INPUT_ENTERED_FALSE':
      return {
        ...state,
        ...Object.keys(state).reduce((acc: any, key) => {
          acc[key] = {
            ...state[key],
            inputEntered: false,
          };
          return acc;
        }, {}),
      };

    case 'INPUT_ENTERED_TRUE':
      return {
        ...state,
        // only the input state.inputEntered = true
        [action.name]: {
          ...state[action.name],
          inputEntered: true,
        },
        // all other states.inputEntered = false
        ...Object.keys(state).reduce((acc: any, key) => {
          if (key !== action.name) {
            acc[key] = {
              ...state[key],
              inputEntered: false,
            };
          }
          return acc;
        }, {}),
      };

    case 'INPUT_CHANGED':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          value: action.payload,
          ...(action.id ? { id: action.id } : {}),
        },
      };

    default:
      return state;
  }
}
