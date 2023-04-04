import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../store/counter.reducer';

function Counter() {
  const counter = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  const plus = () => dispatch(increment())
  const minus = () => dispatch(decrement())

  return (
    <div className="counter-component">
      { counter }
      <button onClick={() => plus()}>increment</button>
      <button onClick={() => minus()}>decrement</button>
    </div>
  );
}

export default Counter;
