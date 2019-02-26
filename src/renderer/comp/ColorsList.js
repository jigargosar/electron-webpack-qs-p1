import Button from './Button'
import { _ } from 'param.macro'
import * as PropTypes from 'prop-types'
import React from 'react'

function ColorsList({ colors, actions }) {
  return (
    <div className="flex flex-column items-center justify-center">
      <Button onClick={actions.onAddColorClicked}>add color</Button>
      {colors.map((color, idx) => {
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
  )
}

ColorsList.propTypes = {
  actions: PropTypes.object.isRequired,
  colors: PropTypes.array.isRequired,
}

export default ColorsList
