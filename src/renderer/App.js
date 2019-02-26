import React from 'react'

const electron = require('electron')
const app = electron.app || electron.remote.app

window.electron = electron

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
    </div>
  )
}

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}
