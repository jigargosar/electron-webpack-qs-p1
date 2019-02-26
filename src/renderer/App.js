import React, { useEffect, useState } from 'react'
import * as R from 'ramda'
import * as nanoid from 'nanoid'
import faker from 'faker'
import PouchDb from 'pouchdb-browser'

const db = new PouchDb('notes')

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

function handleNotesDbChange(change) {
  return model => model
}

function handleNotesDbError(err) {
  return model => model
}

function App() {
  const [model, setModel] = useState({ notesById: {} })

  useLogModel(model)
  const onAddClicked = () => setModel(addNewNote)

  useEffect(() => {
    db.changes()
      .on('change', change => setModel(handleNotesDbChange(change)))
      .on('error', err => setModel(handleNotesDbError(err)))
  }, [])

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
