import React from 'react'
import NoteItem from './comp/NoteItem'
import { getDisplayNotes, useAppModel } from './useAppModel'
import Button from './comp/Button'
import { _ } from 'param.macro'

function App() {
  const [model, actions] = useAppModel()

  return (
    <div className="sans-serif lh-title measure-wide center">
      <header className="flex items-center">
        <div className="f4 pv2" onClick={actions.onNoteListHeadingClick}>
          Notes List
        </div>
        <div className="flex-grow-1" />
        <input
          type="color"
          value={model.color}
          onChange={actions.onColorChange}
        />
        <Button onClick={actions.onAddClicked}>add new</Button>
        <Button onClick={actions.onDeleteAllClicked}>delete all</Button>
      </header>
      <Button onClick={actions.onAddColorClicked}>add color</Button>
      <div className="flex flex-wrap items-center justify-center">
        {model.colors.map((color, idx) => {
          return (
            <div className="ma1 flex flex-column items-center">
              <input
                className="w3"
                key={idx}
                type="color"
                value={color}
                onChange={actions.onColorIdxChange(idx, _)}
              />
              <div className="code f6">{color}</div>
            </div>
          )
        })}
      </div>
      {getDisplayNotes(model).map(note => (
        <NoteItem key={note._id} note={note} actions={actions} />
      ))}
    </div>
  )
}

export default App
