import { useActionState, useState } from "react";
import { Stack, Button, Box } from "@mui/material";
import styles from "./New.module.css";
import { PersonAddAltSharp } from "@mui/icons-material";
import Modal from '@mui/material/Modal';

import { Header } from "../../components/Header/Header";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%',
//   width: 600,
//   bgcolor: 'black',
//   boxShadow: 24,
//   border: '2px solid #000'
// }

const New = () => {
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [roster, setRoster] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleAdd = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Header lossCheck={true} />
      <Modal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}>
          <div className={styles.modal}>
          {/* <Box sx={style}> */}
            <h3>Add player</h3>
            <Button onClick={() => handleAdd()}>Add Player</Button>
          {/* </Box> */}
          </div>
      </Modal>
      <section className={styles.main}>
        <h1>New Tournament</h1>
        <h4>
          Add players for your tournament and click finished when all players
          are entered.
        </h4>
        <div className={styles.mainButtons}>
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              startIcon={<PersonAddAltSharp />}
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              Add Player
            </Button>
            {playerCount > 1 && <Button>Finished</Button>}
          </Stack>
        </div>
      </section>
    </>
  );
};

export default New;
