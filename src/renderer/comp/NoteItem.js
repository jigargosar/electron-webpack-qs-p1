import * as PropTypes from 'prop-types'
import React from 'react'

function NoteItem({ note }) {
  return (
    <div className="pa2" onClick={() => console.table(note)}>
      {note.content}
    </div>
  )
}

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
}
export default NoteItem
