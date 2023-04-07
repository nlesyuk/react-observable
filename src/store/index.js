import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import rootEpics from './epics'

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(epicMiddleware)
)

epicMiddleware.run(rootEpics)

export default store