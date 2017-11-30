import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import routes from 'routes'
import setupStores from 'utils/setupStores'

// Needed for onTouchTap
// Can go away when react 1.0 release
injectTapEventPlugin()
const store = setupStores({
}, browserHistory)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} children={routes} />
  </Provider>, document.querySelector('#app')
)
