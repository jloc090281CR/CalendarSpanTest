// Ignore styles.
import register from 'ignore-styles'
register([ '.css', '.png', '.svg' ])

// Third party.
import expect from 'expect'
import React from 'react'
import shallowRender from 'react-shallow-renderer'
import { jsdom } from 'jsdom'

// Set Node environment to test.
process.env.NODE_ENV = 'test'

// JSdom.
global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator

// Globalize Leaflet.
global.XMLHttpRequest = () => null

// Expose globals.
Object.assign(global, {
  expect,
  React,
  shallowRender
})
