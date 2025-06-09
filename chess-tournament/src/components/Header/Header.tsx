import { useState } from "react";
import { Button } from "@mui/material";
import { AddCircleOutlineSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import AddPlayerModal from "../Modals/Modal";

type Props = {
  lossCheck: Boolean;
};

export const Header = (props: Props) => {
  const { lossCheck } = props;
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavigation = (check: Boolean) => {
    if (check) {
      setWarningModal(true);
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.main}>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineSharp />}
        size="large"
        onClick={() => handleNavigation(lossCheck)}
      >
        Home
      </Button>
      <AddPlayerModal
        tall={false}
        isOpen={warningModal}
        onClose={() => setWarningModal(false)}
      >
        <div className={styles.modal}>
          Warning! If you leave now, you will lose all unsaved progress. Are you
          sure you want to leave?
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              setWarningModal(false);
              navigate("/");
            }}
          >Leave</Button>
        </div>
      </AddPlayerModal>
    </div>
  );
};
