import * as R from 'ramda'
import PouchDb from 'pouchdb-browser'
import * as nanoid from 'nanoid'
import faker from 'faker'
import { useEffect, useMemo, useState } from 'react'

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
  useEffect(() => {
    const allNotes = R.values(model.notesById)
    allNotes && console.table(allNotes)
    console.log(`model.noteContextMenu`, model.noteContextMenu)
  }, [model])
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

function getAllNotes(model) {
  R.values(model.notesById)
}

export function getDisplayNotes(model) {
  return R.compose(
    R.sortWith([R.descend(R.prop('modifiedAt'))]),
    R.values,
  )(model.notesById)
}

export function useAppModel() {
  const [model, setModel] = useState({
    notesById: {},
    lastErrMsg: null,
    noteContextMenu: null,
  })

  useLogModelEffect(model)
  usePouchNotesEffect(setModel)

  const actions = useMemo(
    () => ({
      onAddClicked: () => addNewNote(setModel),
      onNoteListHeadingClick: () => console.table(getAllNotes(model)),
      onNoteContextMenu: (note, e) => {
        setModel(
          R.assoc('noteContextMenu')({
            ...R.mergeRight({}, e),
            note,
          }),
        )
      },
    }),
    [],
  )

  return [model, actions]
}
