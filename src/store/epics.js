import { combineEpics, ofType } from 'redux-observable';
import { counterTypes } from './counter.reducer';
import { from, of, filter, delay, mapTo, startWith, mergeMap, switchMap,  concatMap, take, catchError, map, takeUntil  } from "rxjs";

// api call
export const getMockApi = (getError, loadTime) => {
  const timeout = loadTime ? loadTime : 1000;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (getError) return reject("Dummy error message");
      else return resolve(1);
    }, timeout);
  });
};

//actions
export function getCounterRejected (err) {
  return {
    type: counterTypes.getCounterRejected,
    payload: { err },
  }
}
export function getCounterFulfilled (newCounter) {
  return {
    type: counterTypes.getCounterFulfilled,
    payload: { newCounter },
  }
}
export function setName (name) {
  return {
    type: counterTypes.setName,
    payload: { name },
  }
}

// epics
export const incrementEpic = (action$, state$) => action$.pipe(
    ofType(counterTypes.increment),
    concatMap(() => {
      console.log('epic: increment +');
      return from(getMockApi(0, 500)).pipe(
        map((num) => console.log(num) || getCounterFulfilled(num)),
        catchError((err) => of(getCounterRejected(err))),
        takeUntil(
          action$.pipe(ofType(counterTypes.cancelGetCounter))
        ),
      );
    }),
    concatMap((action) => {
      console.log('action', action)
      return decrementEpic(of({ type: counterTypes.decrement }))
    }),
  );

export const decrementEpic = (action$) =>action$.pipe(
    // delay(1000),
    ofType(counterTypes.decrement),
    mergeMap(() => {
      console.log('epic: decrement -')
      return from(Promise.resolve(-1)).pipe(
          map((num) => console.log(num) || getCounterFulfilled(num)),
          takeUntil(
            action$.pipe(ofType(counterTypes.cancelGetCounter))
          ),
      )
    }),
    // concatMap((action) => {
    //   console.log('action', action)
    //   return incrementEpic(of({ type: counterTypes.increment }))
    // }),
  );

const nameEpic = (action$) => action$.pipe(
  ofType(counterTypes.setName),
  delay(1000),
  mergeMap(() => {
    console.log('epic: set name')
    return from([`name1`]).pipe(
      map(name => console.log(name) || setName(name)),
      catchError((err) => of(getCounterRejected(err))),
      takeUntil(
        action$.pipe(ofType(counterTypes.cancelGetCounter))
      ),
    )
  })
);


const pingEpic = action$ => action$.pipe(
  filter(action => {
    console.log('>>>>>>ACTION_TYPE>>>>>', action.type)
    return action.type === 'PING'
  }),
  mapTo({ type: 'PONG' })
);

export default combineEpics(incrementEpic, decrementEpic, pingEpic, nameEpic);



