import { useRef, useEffect } from 'react';
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

export function usePrevious(value) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}