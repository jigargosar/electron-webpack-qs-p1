import React, { useEffect, useState } from 'react'
import PouchDb from 'pouchdb-browser'
import { clipboard } from 'electron'
import * as R from 'ramda'

const db = new PouchDb('notes')

function getClipText() {
  return clipboard.readText()
}

export default function App() {
  const [lastClipText, setClipText] = useState(() => null)
  const [clipBuffer, setClipBuffer] = useState([])

  useEffect(() => {
    const ci = setInterval(() => {
      const newClipText = getClipText()
      if (newClipText !== lastClipText) {
        setClipText(newClipText)
        setClipBuffer(
          R.compose(
            R.uniq,
            R.take(10),
            R.prepend(R.compose(R.take(1024))(newClipText)),
          ),
        )
      }
    }, 1000)
    return () => clearInterval(ci)
  }, [])

  return (
    <div className="sans-serif lh-title measure center">
      <div className="f4">Clipboard History</div>
      {clipBuffer.map((clipText, idx) => (
        <div key={idx} className="pa2">
          {clipText}
        </div>
      ))}
    </div>
  )
}

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}
