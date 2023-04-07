export const counterTypes = {
  increment: 'INCREMENT',
  decrement: 'DECREMENT',
  getCounterRejected: "OBSERVABLE-REDUX--COUNTER-REJECTED",
  getCounterFulfilled: "OBSERVABLE-REDUX--COUNTER-FULFILLED",
  cancelGetCounter: "OBSERVABLE-REDUX-EXERCISE--CANCEL-GET-COUNTER",
  setName: "SET_NAME",
}

const initialState = {
  value: 0,
  name: 'test1'
}

function counterReducer( state = initialState, action) {
  switch(action.type) {
    case counterTypes.increment:
      console.log('increment')
      return { ...state, value: state.value + 1}
    case counterTypes.decrement:
      console.log('decrement')
      return { ...state, value: state.value - 1}
    case counterTypes.getCounterRejected:
      console.log('getCounterRejected')
      return state
    case counterTypes.cancelGetCounter:
      console.log('cancelGetCounter')
      return state
    case counterTypes.getCounterFulfilled:
      console.log('reducer: getCounterFulfilled', action.payload.newCounter)
      return { ...state, value: state.value + +action.payload.newCounter}
    case 'PONG':
      return state
    case counterTypes.setName:
      console.log('SET_NAME', action.payload.name)
      return { ...state, name: action.payload.name }
    default:
      return state
  }
}

export function increment() {
  return { type: counterTypes.increment}
}
export function decrement() {
  return { type: counterTypes.decrement}
}
export function setName() {
  return { type: counterTypes.setName}
}
export default counterReducer
