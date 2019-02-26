import React from 'react'

export default function App() {
  return (
    <div>
        Hello
    </div>
  )
}


if (module.hot) {
  module.hot.dispose(()=>{
    console.clear()
  })
}
