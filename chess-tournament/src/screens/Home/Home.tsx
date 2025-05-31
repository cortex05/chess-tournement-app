// import PropTypes from 'prop-types'
import { Stack, Button } from '@mui/material'
import styles from './Home.module.css'
import { AddCircleOutlineSharp, StorageSharp } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

// Home.propTypes = {
//   second: PropTypes.third
// }

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.body}>
      <section className={styles.card}>
        <h1>Need a Chess Tournament?</h1>
        <div>
          <Stack spacing={2} direction="row">
            <Button 
              variant='outlined' 
              startIcon={<AddCircleOutlineSharp />} 
              size="large"
              onClick={() => navigate('/new')}>New</Button>
            <Button 
              variant='outlined' 
              startIcon={<StorageSharp />} 
              size='small'
              onClick={() => navigate('/saved')}>Saved</Button>
          </Stack>
        </div>
      </section>
    </div>
  )
}

export default Home