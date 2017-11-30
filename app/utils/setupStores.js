import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import thunk from 'redux-thunk'
import rootReducer from 'store'

export default function configureStore (initialState, history) {
  const DevTools = require('components/DevTools').default
  const enhancers = compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    ),
    DevTools.instrument()
  )
  const store = createStore(
    rootReducer,
    initialState,
    enhancers
  )

  if (module.hot) {
    module.hot.accept('../store', () => {
      const nextRootReducer = require('../store').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
