import React from 'react'
import * as R from 'ramda'
import { observer, useObservable } from 'mobx-react-lite'

// const db = new PouchDb('notes')

function App() {
  const model = useObservable({ notesById: {} })

  return (
    <div className="sans-serif lh-title measure center">
      <div className="f4">Notes List</div>
      {R.values(model.notesById).map(note => (
        <div key={note._id} className="pa2">
          {note.content}
        </div>
      ))}
    </div>
  )
}

export default observer(App)
