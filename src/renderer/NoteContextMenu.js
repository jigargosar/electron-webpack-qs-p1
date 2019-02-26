import React, { Component } from 'react'
import * as PropTypes from 'prop-types'

class NoteContextMenu extends Component {
  render() {
    let { model } = this.props
    const cm = model.noteContextMenu
    return (
      cm &&
      false && (
        <div
          className="absolute bg-black-80 white w4 pa1"
          style={{ left: cm.pageX, top: cm.pageY }}
        >
          <div>Delete</div>
          <div>Edit</div>
          <div>Cancel</div>
        </div>
      )
    )
  }
}

NoteContextMenu.propTypes = {
  model: PropTypes.object.isRequired,
}

export default NoteContextMenu
