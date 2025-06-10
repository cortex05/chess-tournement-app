// import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: any;
  tall: boolean 
};

const Modal = (props: Props) => {
  const { isOpen, onClose, children, tall } = props;
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1"
      }}
    >
      <div
        style={{
          background: "#222a3d",
          height: `${tall ? 600 : 100}`,
          width: 400,
          margin: "auto",
          padding: "2%",
          border: "2px solid #000",
          borderRadius: "5px",
          boxShadow: "2px solid black",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;