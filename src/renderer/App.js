import React from 'react'
import NoteItem from './comp/NoteItem'
import { getDisplayNotes, useAppModel } from './useAppModel'

function App() {
  const [model, actions] = useAppModel()

  return (
    <div className="sans-serif lh-title measure center">
      <div className="f4" onClick={actions.onNoteListHeadingClick}>
        Notes List
      </div>
      <button onClick={actions.onAddClicked}>add new</button>
      {getDisplayNotes(model).map(note => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  )
}

export default App
