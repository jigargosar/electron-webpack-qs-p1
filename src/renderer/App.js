import React, { useEffect, useState } from 'react'
import * as R from 'ramda'
import * as nanoid from 'nanoid'
import faker from 'faker'

// const db = new PouchDb('notes')

function createNewNote() {
  return {
    _id: nanoid(),
    content: faker.lorem.paragraph(),
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  }
}

function addNewNote(model) {
  const newNote = createNewNote()
  return R.compose(R.assocPath(['notesById', newNote._id])(newNote))(model)
}

function useLogModel(model) {
  useEffect(() => console.table(R.values(model.notesById)), [model])
}

function App() {
  const [model, setModel] = useState({ notesById: {} })

  useLogModel(model)
  const onAddClicked = () => setModel(addNewNote)

  return (
    <div className="sans-serif lh-title measure center">
      <div className="f4">Notes List</div>
      <button onClick={onAddClicked}>add new</button>
      {R.values(model.notesById).map(note => (
        <div key={note._id} className="pa2">
          {note.content}
        </div>
      ))}
    </div>
  )
}

export default App
