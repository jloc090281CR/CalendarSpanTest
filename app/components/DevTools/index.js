import React from 'react'
import { createDevTools } from 'redux-devtools'

// DevTools monitors.
import DockMonitor from 'redux-devtools-dock-monitor'
import DevtoolsInspector from 'redux-devtools-inspector'

const DevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    changeMonitorKey='ctrl-m'>
    <DevtoolsInspector />
  </DockMonitor>
)

export default DevTools
