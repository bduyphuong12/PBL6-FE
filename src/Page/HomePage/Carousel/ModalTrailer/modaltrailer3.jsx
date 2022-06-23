import React from "react";
import "./modaltrailer.scss";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";

export default function ModalTrailer3({ open2, handleToggle2 }) {
  
  const style = {
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translate(-50%, -5%)",
    width: "100%",
    height: "100%",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open2}
      onClose={handleToggle2}
      closeAfterTransition
    >
      <Fade in={open2}>
        <Box sx={style}>
          <div className="position-relative w-100 h-100">
            <div className="d-flex justify-content-center align-items-center">
              <iframe
                // title={maPhim}
                width="100%"
                height={`${window.innerHeight}px`}
                src={`https://www.youtube.com/embed/Go8nTmfrQd8`}
                
                frameBorder={0}
                allowFullScreen
              />
            </div>
            <div
              style={{
                fontSize: 50,
                fontWeight: "bold",
                top: 1,
                right: 10,
                cursor: "pointer",
                border: "5px solid #fff",
                borderRadius: "50%",
                width: 50,
                height: 50,
                zIndex: "9000",
              }}
              className="position-absolute d-flex justify-content-center align-items-center text-white p-6"
              onClick={() => handleToggle2(false)}
            >
              X
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
