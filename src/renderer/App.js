import React, { useEffect, useState } from 'react'
import { clipboard } from 'electron'
import * as R from 'ramda'
import { now } from 'mobx-utils'
import { observer, useDisposable, useObservable } from 'mobx-react-lite'
import { reaction, values } from 'mobx'

// const db = new PouchDb('notes')

function getClipText() {
  return clipboard.readText()
}

function App() {
  const clip = useObservable({ prev: null, buff: [] })

  useDisposable(() =>
    reaction(
      () => [now()],
      () => {
        const next = getClipText()
        console.log(`next`, next)
        if (!R.equals(next, clip.prev)) {
          console.log(`prev`, clip.prev)
          clip.prev = next
          clip.buff = R.compose(
            R.uniq,
            R.take(10),
            R.prepend(R.compose(R.take(1024))(next)),
            values,
          )(clip.buff)
        }
      },
    ),
  )

  const [lastClipText, setLastClipText] = useState(() => null)
  const [clipBuffer, setClipBuffer] = useState([])
  useEffect(() => {
    const ci = setInterval(() => {
      const newClipText = getClipText()
      // console.log(`newClipText=${newClipText}, lastClipText=${lastClipText}`)
      if (!R.equals(newClipText, lastClipText)) {
        // console.log(clipboard.availableFormats())
        setLastClipText(newClipText)
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
  }, [lastClipText])

  // console.log(`lastClipText`, lastClipText)
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

export default observer(App)

if (module.hot) {
  module.hot.dispose(() => {
    console.clear()
  })
}
