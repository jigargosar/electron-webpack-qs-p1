import * as R from 'ramda'
import PouchDb from 'pouchdb-browser'
import * as nanoid from 'nanoid'
import faker from 'faker'
import { useEffect, useMemo, useState } from 'react'
import { getCached, setCache } from './cache-helpers'
import { _, it } from 'param.macro'

const db = new PouchDb('notes')

function createNewNote() {
  return {
    _id: nanoid(),
    content: faker.lorem.paragraph(),
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  }
}

function otherwiseHandleNodeDbError(setModel) {
  return R.otherwise(
    R.pipe(
      handleNotesDbError,
      setModel,
    ),
  )
}

function addNewNote(setModel) {
  const newNote = createNewNote()
  R.pipe(
    it.put(newNote),
    otherwiseHandleNodeDbError(setModel),
  )(db)
}

function deleteAllNotes(setModel) {
  R.pipe(
    it.allDocs({ include_docs: true }),
    R.then(
      R.pipe(
        R.prop('rows'),
        R.pluck('doc'),
        R.map(R.mergeLeft({ _deleted: true })),
        db.bulkDocs(_),
      ),
    ),
    R.then(R.tap(console.log)),
    otherwiseHandleNodeDbError(setModel),
  )(db)
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
  // useEffect(() => {
  //   const allNotes = R.values(model.notesById)
  //   allNotes && console.table(allNotes)
  // }, [model.notesById])
  // useEffect(() => {
  //   console.log(`model.noteContextMenu`, model.noteContextMenu)
  // }, [model.noteContextMenu])
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
  return R.values(model.notesById)
}

export function getDisplayNotes(model) {
  return R.compose(
    R.sortWith([R.descend(R.prop('modifiedAt'))]),
    R.values,
  )(model.notesById)
}

export function useAppModel() {
  const [model, setModel] = useState(() =>
    R.compose(
      R.mergeDeepRight({
        notesById: {},
        lastErrMsg: null,
        noteContextMenu: null,
        colors: [],
      }),
      R.defaultTo({}),
      getCached,
    )('appModel'),
  )

  if (process.env.NODE_ENV !== 'production') {
    window.model = model
  }

  useEffect(() => setCache('appModel', model), [model])

  useLogModelEffect(model)
  usePouchNotesEffect(setModel)

  const overColors = R.over(R.lensProp('colors'))
  const actions = useMemo(
    () => ({
      onAddClicked: () => addNewNote(setModel),
      onAddColorClicked: () => setModel(overColors(R.append('#ffffff'))),
      onColorIdxChange: (idx, e) =>
        setModel(R.assocPath(['colors', idx])(e.target.value)),
      onDeleteColorAtIdxClicked: idx =>
        setModel(overColors(R.remove(idx, 1))),
      onDeleteAllClicked: () => deleteAllNotes(setModel),
      onNoteListHeadingClick: () => console.table(getAllNotes(model)),
      onNoteContextMenu: (note, e) => {
        e.persist()
        console.log(Object.keys(e))
        setModel(
          R.assoc('noteContextMenu')({
            ...R.compose(
              R.reject(R.isNil),
              R.mapObjIndexed(R.when(R.is(Object))(R.always(null))),
            )(e),
            note,
          }),
        )
      },
    }),
    [],
  )

  return [model, actions]
}
