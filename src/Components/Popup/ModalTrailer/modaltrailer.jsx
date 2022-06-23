import React, {useEffect,useState} from "react";

import "./ModalTrailer.scss";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import axios from 'axios';
import { withTheme } from "@material-ui/core";
export default function ModalTrailer({openF, handleToggleF }) {
  var moment = require("moment");
  const [notification,setNotification] = useState(null);
  useEffect(() => {
    const getNotification = () => {
      axios.get('/tb/list').then(res => {
        setNotification(res.data);
      })
    }
    getNotification();
  },[]);
  
  const style = {
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translate(-50%, -100%)",
    width: "40%",
    height: "40%",
    border: "2px solid #000",
    background: "white",
    p: 1,
  };
    if(notification){
      return (
        <>
        {
            React.Children.toArray(
              notification.result.map(d => (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openF}
          onClose={handleToggleF}
          closeAfterTransition
        >
          
                <Fade in={openF}>
                <Box sx={style}>
                  <div className="position-relative w-100 h-100">
                    <div className="d-flex justify-content-center align-items-center">
                      <h1>Notification</h1>
                     
                    </div>
                    <div>
                      {moment(d.ngay).format("DD/MM/yyyy")}  : {d.noi_dung}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        background:"black",
                        top: -5,
                        right: -5,
                        cursor: "pointer",
                        border: "1px solid #000",
                        borderRadius: "50%",
                        width: 20,
                        height: 20,
                        zIndex: "9000",
                      }}
                      className="position-absolute d-flex justify-content-center align-items-center text-white p-6"
                      onClick={() => handleToggleF(false)}
                    >
                      X
                    </div>
                  </div>
                </Box>
              </Fade>
            
         
        </Modal>
          ))
          )
        }
        </>
        
      );
    }
}
