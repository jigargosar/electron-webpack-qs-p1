import React from 'react'
import NoteItem from './comp/NoteItem'
import { getDisplayNotes, useAppModel } from './useAppModel'
import validate from 'aproba'

/**
 * @return {null}
 */
function NoteContextMenu({ model }) {
  validate('O', [model])
  if (model.noteContextMenu) {
    return <div className="fixed bg-black-80 white">Menu</div>
  }
  return null
}

function App() {
  const [model, actions] = useAppModel()

  return (
    <div className="sans-serif lh-title measure-wide center">
      <header className="flex items-center">
        <div className="f4 pv2" onClick={actions.onNoteListHeadingClick}>
          Notes List
        </div>
        <NoteContextMenu model={model} />
        <div className="flex-grow-1" />
        <button onClick={actions.onAddClicked}>add new</button>
      </header>
      {getDisplayNotes(model).map(note => (
        <NoteItem key={note._id} note={note} actions={actions} />
      ))}
    </div>
  )
}

export default App
