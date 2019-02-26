import React from 'react'
import NoteItem from './comp/NoteItem'
import { getDisplayNotes, useAppModel } from './useAppModel'
import Button from './comp/Button'
import ColorsList from './comp/ColorsList'

function App() {
  const [model, actions] = useAppModel()

  const onToggleColors = () => actions.toggleSV('colorsOpen')
  return (
    <div className="sans-serif lh-title measure-wide center">
      <header className="flex items-center">
        <div className="f4 pv2" onClick={actions.onNoteListHeadingClick}>
          Notes List
        </div>
        <div className="flex-grow-1" />
        <Button onClick={onToggleColors}>colors</Button>
        <Button onClick={actions.onAddClicked}>add new</Button>
        <Button onClick={actions.onDeleteAllClicked}>delete all</Button>
      </header>
      <div className="pv2" />
      {model.sv.colorsOpen && (
        <ColorsList actions={actions} colors={model.colors} />
      )}
      {getDisplayNotes(model).map(note => (
        <NoteItem key={note._id} note={note} actions={actions} />
      ))}
    </div>
  )
}

export default App
