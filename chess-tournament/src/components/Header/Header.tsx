import React from 'react'
import { Stack, Button } from '@mui/material'
import { AddCircleOutlineSharp, StorageSharp } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

type Props = {
  lossCheck: Boolean
}

export const Header = (props: Props) => {
  const { lossCheck } = props
  const navigate = useNavigate()

  const handleNavigation = (check: Boolean) => {
    if(check){
      alert('Test!')
    } else {
      navigate('/')
    }
  }

  return (
    <div className={styles.main}>
      <Button
        variant='outlined'
        startIcon={<AddCircleOutlineSharp />}
        size="large"
        onClick={() => handleNavigation(lossCheck)}>Home</Button>
    </div>
  )
}
