import React from 'react'
import fs from 'fs'
import Highlight from 'react-highlight'
import 'highlight.js/styles/tomorrow-night-bright.css'

const electron = require('electron')
const app = electron.app || electron.remote.app

window.electron = electron
window._fs = fs

const clipboard = electron.clipboard

function getCodeSnippet() {
  return _fs.readFileSync(
    '/Users/jigargosar/dev/electron-webpack-qs-p1/src/renderer/App.js',
    { encoding: 'UTF-8' },
  )
}

export default function App() {
  const codeSnippet = getCodeSnippet()
  return (
    <div className="sans-serif lh-title">
      <div className="f4">Electron Info</div>
      <div className="">userData: {app.getPath('userData')}</div>
      <div className="">cwd: {process.cwd()}</div>
      <div className="">
        clipboard.availableFormats: {clipboard.availableFormats()}
      </div>
      <Highlight>{codeSnippet}</Highlight>
    </div>
  )
}

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}
