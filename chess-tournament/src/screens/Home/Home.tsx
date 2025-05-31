// import PropTypes from 'prop-types'
import { Stack, Button } from '@mui/material'
import styles from './Home.module.css'
import { Save, AddCircleOutlineSharp, StorageSharp } from '@mui/icons-material'

// Home.propTypes = {
//   second: PropTypes.third
// }

export const Home = () => {
  return (
    <div className={styles.body}>
      <section className={styles.card}>
        <h1>Need a Chess Tournament?</h1>
        <div>
          <Stack spacing={2} direction="row">
            <Button variant='outlined' startIcon={<AddCircleOutlineSharp />} size="large">New</Button>
            <Button variant='outlined' startIcon={<StorageSharp />} size='small'>Saved</Button>
          </Stack>
        </div>
      </section>
    </div>
  )
}

export default Home