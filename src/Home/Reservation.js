import React, { useContext, useEffect, useState } from 'react'
import { Footer, Header } from '../PageParts'
import { Link } from 'react-router-dom'
import { InfoContext } from '../App';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import "../css/kame.css";

function Reservation() {
    const linkStyle = { opacity: 0, display: 'block', width: '70%', height: '70%', color: "black", background: "white" };
    const [loading, setLoading] = useState(true);
    const ReservationInfo = useContext(InfoContext);


    const TimeSlotList = ["朝練", "1限", "チャペル", "2限", "昼休み", "3限", "4限", "5限", "放課後1", "放課後2"];
    const TimeList = ["8:00 ~ 8:50", "9:00 ~ 10:30", "10:40 ~ 11:00", "11:10 ~ 12:40", "12:50 ~ 13:20", "13:30 ~ 15:00", "15:10 ~ 16:40", "16:50 ~ 18:20", "18:30 ~ 19:40", "19:50 ~ 21:00"];
    const WeekDayList = ["　　　　", "月", "火", "水", "木", "金", "土", "日"];
    const DAYOFWEEKSTR = ["月", "火", "水", "木", "金", "土", "日"];

    var date = new Date();
    var dayOfWeek = date.getDay();
    var DayOfWeekStr = DAYOFWEEKSTR[(dayOfWeek + 6) % 7];
    const [reserve, setReserve] = useState(null);
    const DayOfWeekStrIndex = DAYOFWEEKSTR.indexOf(DayOfWeekStr);
    const IsAvailableReservationDay = [];

    for (let i = 0; i < DAYOFWEEKSTR.length; i++) {
        if (i <= DayOfWeekStrIndex - 1) {
            IsAvailableReservationDay.push(false);
        } else {
            IsAvailableReservationDay.push(true);
        }
    }


    useEffect(() => {
        async function findFirestoreData() {
            try {
                const newData = await Promise.all(
                    WeekDayList.map(async (weekday) => {
                        return Promise.all(
                            TimeSlotList.map(async (slot) => {
                                const docRef = doc(db, weekday, slot);
                                const docSnap = await getDoc(docRef);
                                if (docSnap.exists()) {
                                    const docData = docSnap.data();
                                    return docData.NickName;
                                } else {
                                    return false;
                                }
                            })
                        );
                    })
                );
                setReserve(newData);
                console.log(newData);
                console.log(dayOfWeek);
                console.log("IsAvailableReservationDay:" + IsAvailableReservationDay);
                console.log("今日の曜日" + DayOfWeekStr);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        findFirestoreData();
    }, []);


    if (loading) {
        return (
            <>
                <Header />
                <br /><br /><br /><br />
                <br /><br /><br /><br />
                <br /><br /><br /><br />
                <br /><br /><br /><br />
                <div class="loader">Loading...</div>
                <Footer />
            </>
        )
    }
    return (
        <>
            <Header />

            <table border="0" class="kame_table_003">
                <tr>
                    {WeekDayList.map((weekday, num) =>
                        IsAvailableReservationDay[(num + 6) % 7] ?
                            <th style={{ color: "black" }}>{weekday}</th> :
                            <th style={{ color: "#B1B3B6" }}>{weekday}</th>
                    )}
                </tr>
                {TimeSlotList.map((timeslot, index) =>
                    <tr>
                        <td>{timeslot}</td>
                        {DAYOFWEEKSTR.map((weekday, num) => (
                            <td key={num} style={{ padding: 0 }}>
                                {IsAvailableReservationDay[num] ?
                                    (reserve[num + 1][index] ? (
                                        <Link to="/reservationdetail" onClick={() => {
                                            ReservationInfo.WeekDay = weekday; ReservationInfo.TimeSlot = timeslot; ReservationInfo.Time = TimeList[index];
                                        }} style={{ color: "black", background: "white" }}>{reserve[num + 1][index]}</Link>
                                    ) : (
                                        <Link to="/addreservation" onClick={() => {
                                            ReservationInfo.WeekDay = weekday; ReservationInfo.TimeSlot = timeslot; ReservationInfo.Time = TimeList[index];
                                        }} style={linkStyle}>リンク</Link>
                                    ))

                                    :
                                    (reserve[num + 1][index] ? (
                                        <Link to="/alertreservation" onClick={() => {
                                            ReservationInfo.WeekDay = weekday; ReservationInfo.TimeSlot = timeslot; ReservationInfo.Time = TimeList[index];
                                        }} style={{ color: "black", background: "white" }}>{reserve[num + 1][index]}</Link>
                                    ) : (
                                        <Link to="/alertreservation" onClick={() => {
                                            ReservationInfo.WeekDay = weekday; ReservationInfo.TimeSlot = timeslot; ReservationInfo.Time = TimeList[index];
                                        }} style={linkStyle}>リンク</Link>
                                    ))
                                }

                            </td>
                        ))}

                    </tr>
                )}
            </table>
            <a href="http://deepstream.boo.jp/kame_kingdom/Documents/部室利用規約.pdf"><p style={{ fontSize: "2.0em", color: "green" }}>部室の利用規約</p></a>
            <Footer />
        </>
    )
}

export default Reservation