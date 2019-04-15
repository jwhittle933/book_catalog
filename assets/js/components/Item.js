import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const Item = ({ id }) => {
  useEffect(() => {
    Axios.get('/api/books/')
  }, [])
}
