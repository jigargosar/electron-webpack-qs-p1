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
      <div className="pv2">
        <Button onClick={actions.onAddColorClicked}>add color</Button>
      </div>
      <div className="flex flex-column items-center justify-center">
        {model.colors.map((color, idx) => {
          return (
            <div key={idx} className="ma1 flex">
              <div
                className=""
                // style={{ backgroundColor: color }}
              >
                <input
                  // className="h-100 bn pa0 ma0 o-0"
                  type="color"
                  value={color}
                  onChange={actions.onColorIdxChange(idx, _)}
                />
              </div>
              <input
                className="ml1 code f6 tc pa1 ba b--black-50 br-0 bt-0 bl-0"
                style={{ width: '5em' }}
                type="text"
                value={color}
                onChange={actions.onColorIdxChange(idx, _)}
              />
              <div className="pa1 f7">
                <button
                  className=""
                  onClick={actions.onDeleteColorAtIdxClicked(idx, _)}
                >
                  X
                </button>
              </div>
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
