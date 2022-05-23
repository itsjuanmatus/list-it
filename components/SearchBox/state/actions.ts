export const actions = {
  inputEnteredFalse: () => ({
    type: 'INPUT_ENTERED_FALSE',
  }),
  inputEnteredTrue: (name: string) => ({
    type: 'INPUT_ENTERED_TRUE',
    name,
  }),
  inputChanged: (name: string, payload: string) => ({
    type: 'INPUT_CHANGED',
    name,
    payload,
  }),
};
