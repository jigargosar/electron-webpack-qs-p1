import React from 'react'
import PouchDb from 'pouchdb-browser'

const db = new PouchDb('notes')

export default function App() {
  return <div className="sans-serif lh-title">Notes</div>
}

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}
