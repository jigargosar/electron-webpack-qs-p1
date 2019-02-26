import * as PropTypes from 'prop-types'
import React from 'react'

function NoteItem({ note, actions }) {
  const onContextMenu = e => {
    actions.onNoteContextMenu(note, e)
  }
  return (
    <div
      className="pv2 code"
      onClick={() => console.table(note)}
      onContextMenu={onContextMenu}
    >
      {note.content}
    </div>
  )
}

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
export default NoteItem
