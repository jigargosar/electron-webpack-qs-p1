import PropTypes from 'prop-types'
import React from 'react'
import NoteItem from './comp/NoteItem'
import { getDisplayNotes, useAppModel } from './useAppModel'

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

function NoteContextMenu({ model }) {
  const cm = model.noteContextMenu
  return (
    cm &&
    false && (
      <div
        className="absolute bg-black-80 white w4 pa1"
        style={{ left: cm.pageX, top: cm.pageY }}
      >
        <div>Delete</div>
        <div>Edit</div>
        <div>Cancel</div>
      </div>
    )
  )
}

export default App

NoteContextMenu.propTypes = {
  model: PropTypes.object.isRequired,
}
