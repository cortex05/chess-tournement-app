import { useState } from "react";
import { Stack, Button } from "@mui/material";
import { Header } from "../../components/Header/Header";
import styles from "./New.module.css";
import { PersonAddAltSharp } from "@mui/icons-material";

const New = () => {
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [roster, setRoster] = useState<string[]>([]);
  return (
    <>
      <Header lossCheck={true} />
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
