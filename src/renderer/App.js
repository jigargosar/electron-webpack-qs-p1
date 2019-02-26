import React from 'react'
import fs from 'fs'
import PouchDb from 'pouchdb-browser'

const electron = require('electron')
const app = electron.app || electron.remote.app

const db = new PouchDb('notes')

export default function App() {
  const codeSnippet = getCodeSnippet()
  return <div className="sans-serif lh-title">Notes</div>
}

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}

window.electron = electron
window._fs = fs
window.app = app

const clipboard = electron.clipboard

function getCodeSnippet() {
  return _fs.readFileSync(
    '/Users/jigargosar/dev/electron-webpack-qs-p1/src/renderer/App.js',
    { encoding: 'UTF-8' },
  )
}
