import { useRef, useState, useEffect } from 'react';
import produce from 'immer';

export const basicFormReducer = (state, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case 'changeField':
        draftState[action.field] = action.value;
        break;
      case 'changeFields':
        Object.entries(action.fields).forEach(([key, value]) => {
          draftState[key] = value;
        });
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

export function useSaveData({ money, shopStore }) {
  const [timer, setTimer] = useState(true);
  useEffect(() => {
    setTimeout(() => setTimer(false), 60 * 1000);
    if (!timer) {
      localStorage.setItem('money', money);
      localStorage.setItem('shopStore', JSON.stringify(shopStore));
    }
    setTimer(true);
  }, [timer]);
}
