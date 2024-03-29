import React from 'react'
import Bill from "../CSS/Bill.css"
import bill from "../Images/bill.png"
import { useEffect, useState } from "react";
import axios from 'axios';
import Solver from "../Classes/Solver";
import DetailBill from './DetailBill';
import { useHistory } from 'react-router-dom';
import URL from '../DATA/URL.jsx';

export default function DonHang({ idUser }) {
    const solver = new Solver();
    const [bills, setBills] = useState([])
    const history = useHistory();
    useEffect(() => {
        if (idUser !== null) {
            axios.get(`${URL}/data/bill/iduser=${idUser}`, null)
                .then((res) => setBills(res.data))
                .catch((err) => console.error("", err))
        }
    }, [])
    return (
        <div className="wrapper billInfo">
            <div className="container-bill">
                <div className="Bill">
                    <div className="title-bill">
                        <img src={bill} />
                        <p>Quản lý đơn hàng</p>
                    </div>
                    <div className="centerTitle-bill">

                        <table className="table table-hover table-bill">
                            <thead>
                                <tr className="title-bills">
                                    <th className="col cols row-idOrder">Mã đơn hàng</th>
                                    <th className="col cols row-pro">Sản phẩm</th>
                                    <th className="col cols row-sltt">Tổng tiền bill</th>
                                    <th className="col cols row-date">Ngày đặt</th>
                                    <th className="col cols row-address">Địa chỉ</th>
                                    <th className="col cols row-bill">Trạng thái</th>
                                </tr>
                            </thead>
                            {bills.map((bill, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr className="info-bill">
                                            <td className="id-bill">{bill.id}</td>
                                            {bill.billDetails.map((item, index) =>
                                                <DetailBill item={item} index={index} />
                                            )}
                                            <td className="info-productInBill bill-price" >{solver.formatCurrency("vi-VN", "currency", "VND", bill.tongtien)}</td>
                                            <td className="info-productInBill">{bill.ngaydat.split("T", 1)}</td>
                                            <td className="info-productInBill">{bill.diachinhan}</td>
                                            <td className="info-productInBill">{bill.tinhtrang}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}

                        </table>
                    </div>
                    {/* <div className="info-bill">
                        <div className="info-idPro">
                            <p>123156778adas</p>
                        </div>
                        <div className="info-Product">
                            <p>Laptop</p>
                        </div>
                        <div className="info-idPro"></div>
                        <div className="info-idPro"></div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
