import React from 'react'
import { clipboard } from 'electron'
import * as R from 'ramda'
import { now } from 'mobx-utils'
import { observer, useDisposable, useObservable } from 'mobx-react-lite'
import { reaction } from 'mobx'

// const db = new PouchDb('notes')

function getClipText() {
  return clipboard.readText()
}

function prependNewClipItem(next) {
  return R.compose(
    R.uniq,
    R.take(10),
    R.prepend(R.compose(R.take(1024))(next)),
  )
}

function addClipTextIfNew(clip) {
  const next = getClipText()
  if (!R.equals(next, clip.prev)) {
    console.log(`next`, next)
    console.log(`prev`, clip.prev)
    clip.prev = next
    clip.buff = prependNewClipItem(next)(clip.buff)
  }
}

function App() {
  const clip = useObservable({ prev: null, buff: [] })

  useDisposable(() =>
    reaction(
      () => [now()],
      () => {
        addClipTextIfNew(clip)
      },
      { fireImmediately: true },
    ),
  )

  return (
    <div className="sans-serif lh-title measure center">
      <div className="f4">Clipboard History</div>
      {clip.buff.map((clipText, idx) => (
        <div key={idx} className="pa2">
          {clipText}
        </div>
      ))}
    </div>
  )
}

export default observer(App)
