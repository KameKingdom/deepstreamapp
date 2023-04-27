import React, { useEffect, useState } from 'react';
import { Footer, Header } from '../PageParts';
import "../css/kame.css";
import { collection, deleteDoc, doc, getDoc, query, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';

function HomePage() {
    /* スプラッシュスクリーンの表示設定 */
    const [show, setShow] = useState(true); // スプラッシュスクリーンをshowするか否か
    const [user] = useAuthState(auth);
    useEffect(() => { // 3000m秒だけ表示する
        const timer = setTimeout(() => { setShow(false); }, 3000);
        return () => clearTimeout(timer);
    }, []);

    /* データの取得 */
    useEffect(() => {
        async function fetchFirestoreData() {
            const docRef = doc(db, "Setting", "Reservation");
            const docSnap = await getDoc(docRef);
            const today = moment(); // 現在の日付を取得
            const monday = today.clone().startOf('isoWeek'); // 週の月曜日を取得
            if (docSnap.exists()) {
                const docData = docSnap.data();
                if (docData.LastResetDate !== monday.format('YYYYMMDD')) {
                    console.log("Reset Reservation Data")
                    await updateDoc(doc(db, "Setting", "Reservation"), {
                        LastResetDate: monday.format('YYYYMMDD')
                    });
                    // 予約情報の消去
                    const WeekDayList = ["月", "火", "水", "木", "金", "土", "日"];
                    const TimeSlotList = ["朝練", "1限", "チャペル", "2限", "昼休み", "3限", "4限", "5限", "放課後1", "放課後2"];
                    await Promise.all(
                        WeekDayList.map(async (weekday) => {
                            await Promise.all(
                                TimeSlotList.map(async (timeslot) => {
                                    await deleteDoc(doc(db, weekday, timeslot));
                                })
                            );
                        })
                    );
                    // 予約ユーザーの予約回数をリセット
                    const usersRef = collection(db, 'users');
                    const reservationNumQuery = query(usersRef);
                    const snapshot = await reservationNumQuery.get();
                    snapshot.docs.forEach(async (doc) => {
                        const userDocRef = doc.ref;
                        await updateDoc(userDocRef, { ReservationNum: 0 });
                    });
                    console.log("fin")
                }
            }
        }
        fetchFirestoreData();
    }, []);


    return (show && user ? (
        <div>
            <body class="mobile-hidden" />
            <div id="container">
                <span></span>
                <span></span>
                <span></span>
                <p style={{ fontSize: "2.0em" }}>Deep Stream</p>
            </div>
        </div>

    ) :
        (
            <>
                <body class="mobile-hidden" />
                <Header />
                <center>
                    <p class="kame_font_004" style={{ fontFamily: "Comic Sans MS" }}>Welcome to Deep Stream</p>
                    <iframe width="80%" height="400" src="https://www.youtube.com/embed/oJKhbRFKIjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <br />
                </center>

                <div class="kame_textbox_001">
                    <div class="box-title">サークル理念
                    </div>
                    &emsp;大学時代とは、長い人生において音楽活動を最も自由に楽しみ、 異なる趣味や考えを持った仲間と最も多く関わることの出来る、 非常に貴重な4年間です。<br />&emsp;その大切な時間において、
                    部員同士が様々な刺激を与え合いながら<p style={{ color: "red", fontSize: "1.0em" }}><center>『音楽的かつ人間的に成長する』</center></p>ことをコンセプトとして、Deep Streamは日々活動しています。
                </div>

                <Footer />
            </>
        ))
}

export default HomePage