import React from 'react'
import { Provider } from 'react-redux'
import Counter from './components/Counter'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <main className="App">
        <Counter />
      </main>
    </Provider>
  );
}

export default App;
