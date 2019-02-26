import React from 'react'

const electron = require('electron')
const app = electron.app || electron.remote.app

export default function App() {
  return <div>Hello {app.getPath('userData')}</div>
}

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}
