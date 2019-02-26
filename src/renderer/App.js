import React from 'react'

const electron = require('electron')
const app = electron.app || electron.remote.app

export default function App() {
  return (
    <div>
      Hello
      <div className="">userData: {app.getPath('userData')}</div>
      <div className="">cwd: {process.cwd()}</div>
    </div>
  )
}

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}
