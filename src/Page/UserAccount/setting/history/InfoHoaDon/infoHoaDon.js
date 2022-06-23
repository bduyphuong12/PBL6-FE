import React, { useState, useEffect } from "react";
import axios from "axios";
import "./infohoadon.scss";
const InfoHoaDon = ({ dataHD }) => {
  const [dataMatHang, setDataMatHang] = useState(null);
  useEffect(() => {
    const getMatHang = () => {
      axios.get(`/mh/detail/${dataHD.id_hang}`).then((res) => {
        setDataMatHang(res.data);
      });
    };
    getMatHang();
  },[dataHD]);
  if (dataMatHang) {
    return (
      <>
        <div className="detail-up">
          <p>
            {dataMatHang.result[0].ten} x{dataHD.so_luong}:{" "}
            {parseInt(dataMatHang.result[0].gia) * dataHD.so_luong}.000đ
          </p>
        </div>
      </>
    );
  }
};

export default InfoHoaDon;
