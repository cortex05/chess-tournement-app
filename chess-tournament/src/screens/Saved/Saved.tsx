import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { LOCAL_TOURNAMENTS_KEY } from "../../data/keys";

import styles from './Saved.module.css'
import Modal from "../../components/Modals/Modal";
import SavedModalBody from "./modal/SavedModalBody";

const Saved = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedTournaments, setSavedTournaments] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [activePreview, setActivePreview] = useState<string>("")
  

  useEffect(() => {
    setIsLoading(true);
    const jsonValue = localStorage.getItem(LOCAL_TOURNAMENTS_KEY);
    if (!jsonValue) {
      setSavedTournaments([])
    } else {
      // get the keys
      const jsonValue = localStorage.getItem(LOCAL_TOURNAMENTS_KEY);
      const keys = jsonValue !== null ? JSON.parse(jsonValue) : null
      setSavedTournaments(keys)
    }

    setIsLoading(false)
  }, []);

  const handleClick = (name: string) => {
    setActivePreview(name)
    setIsModalOpen(true)
  }

  return (
    <>
      <Header lossCheck={false} />
      <div className={styles.mainBody}>
        {isLoading && <div>LOADING</div>}
        {!isLoading && savedTournaments.length > 0 && <section>
            <h1>Here are the local saved tournaments</h1>
            <div className={styles.tourneyField}>
              {savedTournaments.map((key, index) => {
                return <div key={index} className={styles.tourneyItem} onClick={() => handleClick(key)}>
                  <h3>{key.toLowerCase()}</h3>
                </div>
              })}
            </div>
          </section>}
        {!isLoading && savedTournaments.length === 0 && <section>There are no saved tournaments. Go to the home page and make a new one.</section>}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tall={true}>
        <SavedModalBody keyName={activePreview} closeModal={setIsModalOpen}/>
      </Modal>
    </>
  );
};

export default Saved;
