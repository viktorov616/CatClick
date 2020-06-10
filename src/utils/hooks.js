import produce from 'immer';

export const basicFormReducer = (state, action) => produce(state, (draftState) => {
  switch (action.type) {
    case 'changeField':
      draftState[action.field] = action.value;
      break;
    case 'changeFields':
      Object.entries(action.fields).forEach(([key, value]) => { draftState[key] = value; });
      break;
    case 'reset':
      return action.initialState;
    default:
      return state;
  }
});