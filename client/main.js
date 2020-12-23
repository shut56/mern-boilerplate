import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'

const Main = () => {
  return (
    <div>This is Main Component!</div>
  )
}

const target = document.querySelector('#root')

ReactDOM.render(<Main />, target)
