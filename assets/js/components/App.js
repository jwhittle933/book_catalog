import React, { useState } from 'react'
import Catalog from './Catalog'

const App = () => {
  const [showItems, setShowItems] = useState(true)
  const [showItem, setShowItem] = useState(false)
  const [whichItems, setWhichItems] = useState('')
  const [whichItem, setWhichItem] = useState('')

  return (
    <div>
      <Catalog />
    </div>
  )
}
