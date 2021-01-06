import React from 'react'
import { Provider } from 'react-redux'

import store from '../redux'

const Root = () => {
  return (
    <Provider store={store}>
      <div>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
            This is Root component
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default Root
