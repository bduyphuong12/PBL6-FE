import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoHoaDon from "../InfoHoaDon/infoHoaDon";
import "./detailhistory.scss";
export default function DetailHistory({ showDetail, idGD, tong }) {
  const [infoGD, setInfoGD] = useState(null);
  useEffect(() => {
    const getInfoGD = () => {
      axios.get(`/ctdg/getByIdGD/${idGD}`).then((res) => {
        setInfoGD(res.data);
      });
    };
    getInfoGD();
  }, [idGD]);
  if (infoGD) {
    if (infoGD.result !== null) {
      return (
        <div style={{ display: showDetail ? "flex" : "none" }}>
          <div className="modal-detail">
            <h3 style={{ color: "black" }}>CHI TIẾT HÓA ĐƠN</h3>
            <div className="detail-up">
              {React.Children.toArray(
                infoGD.result.map((d) => <InfoHoaDon dataHD={d} />)
              )}
            </div>
            <div>
              <hr className="hr-class" />
              <br />
              <p className="detail-left">Tổng: {tong}.000đ</p>
            </div>
          </div>
        </div>
      );
    } else {
      <h4>Người dùng chưa thực hiện giao dịch!</h4>;
    }
  }
}
