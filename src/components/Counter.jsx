import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, setName } from '../store/counter.reducer';

function Counter() {
  const counter = useSelector(state => state.counter.value)
  // const name = useSelector(state => state.counter.name)
  const dispatch = useDispatch()

  const plus = () => dispatch(increment())
  const minus = () => dispatch(decrement())
  // const setName = (v) => dispatch(setName(v))

  return (
    <div className="counter-component">
      {/* <div>name: { name }</div> */}
      <div>counter: { counter }</div>
      <button onClick={() => plus()}>increment</button>
      <button onClick={() => minus()}>decrement</button>
      {/* <button onClick={() => setName('toto')}>set name</button> */}
    </div>
  );
}

export default Counter;
