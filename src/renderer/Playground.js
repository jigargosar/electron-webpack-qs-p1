import React from 'react'
import fs from 'fs'
import { Light, Prism } from 'react-syntax-highlighter'
import * as pt from 'react-syntax-highlighter/dist/esm/styles/prism'
import * as hl from 'react-syntax-highlighter/dist/esm/styles/hljs'
import PouchDb from 'pouchdb-browser'

const electron = require('electron')
const app = electron.app || electron.remote.app

const db = new PouchDb('notes')

export default function PlayGround() {
  const codeSnippet = getCodeSnippet()
  return (
    <div className="sans-serif lh-title">
      <div className="f4">Electron Info</div>
      <div className="">userData: {app.getPath('userData')}</div>
      <div className="">cwd: {process.cwd()}</div>
      <div className="">
        clipboard.availableFormats: {clipboard.availableFormats()}
      </div>
      <Light language="react" style={hl.tomorrowNightBright}>
        {codeSnippet}
      </Light>
      <Prism language="jsx" style={pt.atomDark}>
        {codeSnippet}
      </Prism>
      <hr />
    </div>
  )
}

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}

window.electron = electron
window._fs = fs

const clipboard = electron.clipboard

function getCodeSnippet() {
  return _fs.readFileSync(
    '/Users/jigargosar/dev/electron-webpack-qs-p1/src/renderer/App.js',
    { encoding: 'UTF-8' },
  )
}
