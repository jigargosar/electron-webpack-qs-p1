import React from 'react'

const electron = require('electron')
const app = electron.app || electron.remote.app

window.electron = electron

export default function App() {
  return (
    <div className="sans-serif lh-title">
      <div className="f4">Electron Info</div>
      <div className="">userData: {app.getPath('userData')}</div>
      <div className="">cwd: {process.cwd()}</div>
      <pre
        style={{
          'background-color': '#ffffff',
          color: '#000000',
          fontFamily: 'Menlo',
          fontSize: '9.0pt',
        }}
      >
        <span style={{ color: '#008000', fontWeight: 'bold' }}>
          userData
        </span>
      </pre>
    </div>
  )
}

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}
