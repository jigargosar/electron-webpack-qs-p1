import React from 'react'
import fs from 'fs'

const electron = require('electron')
const app = electron.app || electron.remote.app

window.electron = electron
window._fs = fs

const clipboard = electron.clipboard

export default function App() {
  return (
    <div className="sans-serif lh-title">
      <div className="f4">Electron Info</div>
      <div className="">userData: {app.getPath('userData')}</div>
      <div className="">cwd: {process.cwd()}</div>
      <div className="">
        clipboard.availableFormats: {clipboard.availableFormats()}
      </div>
      <div dangerouslySetInnerHTML={{ __html: clipboard.readHTML() }} />
      <pre className="">
        <code>
          {_fs.readFileSync(
            '/Users/jigargosar/dev/electron-webpack-qs-p1/src/renderer/App.js',
            { encoding: 'UTF-8' },
          )}
        </code>
      </pre>
    </div>
  )
}

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}
