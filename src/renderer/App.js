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

function addNewNote(setModel) {
  const newNote = createNewNote()
  db.put(newNote).catch(e => setModel(handleNotesDbError(e)))
}

function handleNotesDbChange(change) {
  return model => {
    if (change.deleted) {
      return R.dissocPath(['notesById', change.id])(model)
    } else {
      const doc = change.doc
      return R.assocPath(['notesById', doc._id])(doc)(model)
    }
  }
}

function handleNotesDbError(err) {
  console.error('handleNotesDbError', err)
  return R.assoc('lastErrMsg')(err.message)
}

function useLogModelEffect(model) {
  useEffect(() => console.table(R.values(model.notesById)), [model])
}

function getDisplayNotes(model) {
  return R.compose(
    R.sortWith([R.descend(R.prop('modifiedAt'))]),
    R.values,
  )(model.notesById)
}

function usePouchNotesEffect(setModel) {
  useEffect(() => {
    const changes = db
      .changes({ include_docs: true, live: true })
      .on('change', change => setModel(handleNotesDbChange(change)))
      .on('error', err => setModel(handleNotesDbError(err)))
    return () => changes.cancel()
  }, [])
}

function App() {
  const [model, setModel] = useState({ notesById: {}, lastErrMsg: null })

  useLogModelEffect(model)
  usePouchNotesEffect(setModel)

  const onAddClicked = () => addNewNote(setModel)

  return (
    <div className="sans-serif lh-title measure center">
      <div
        className="f4"
        onClick={() => console.table(R.values(model.notesById))}
      >
        Notes List
      </div>
      <button onClick={onAddClicked}>add new</button>
      {getDisplayNotes(model).map(note => (
        <div
          key={note._id}
          className="pa2"
          onClick={() => console.table(note)}
        >
          {note.content}
        </div>
      ))}
    </div>
  )
}

export default App
