import React, { useEffect, useState } from 'react';
import { Footer, Header } from '../PageParts';
import "../css/kame.css";
import { collection, deleteDoc, doc, getDoc, query, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';

function HomePage() {
    /* スプラッシュスクリーンの表示設定 */
    const [show, setShow] = useState(true); // スプラッシュスクリーンをshowするか否か
    useEffect(() => { // 3000m秒だけ表示する
        const timer = setTimeout(() => { setShow(false); }, 3000);
        return () => clearTimeout(timer);
    }, []);

    /* データの取得 */
    useEffect(() => {
        async function fetchFirestoreData() {
            const docRef = doc(db, "Setting", "Reservation");
            const docSnap = await getDoc(docRef, { source: 'cache' });
            const today = moment(); // 現在の日付を取得
            const monday = today.clone().startOf('isoWeek').subtract(1, 'week'); // 週の日曜日を取得
            if (docSnap.exists()) {
                const docData = docSnap.data();
                if (docData.LastResetDate !== monday.format('YYYYMMDD')) {
                    console.log("Reset Reservation Data")
                    await updateDoc(doc(db, "Setting", "Reservation"), {
                        LastResetDate: monday.format('YYYYMMDD')
                    });
                    // 予約情報の消去
                    const WeekDayList = ["月", "火", "水", "木", "金", "土", "日"];
                    const TimeSlotList = ["朝練", "１限", "チャペル", "２限", "昼練", "３限", "４限", "５限", "夜練Ⅰ", "夜練Ⅱ"];
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
                        await setDoc(userDocRef, { ReservationNum: 0 });
                    });
                    console.log("fin")
                }
            }
        }
        fetchFirestoreData();
    }, []);

    const imageUrls = [
        'http://deepstream.boo.jp/kame_kingdom/DeepMagazine/DeepMagazine001.jpg',
        'http://deepstream.boo.jp/kame_kingdom/DeepMagazine/DeepMagazine002.jpg'
    ];
    const [imageUrl, setImageUrl] = useState(imageUrls[0]);
    const [page, setPage] = useState(0);

    const toggleImage = () => {
        const nowPage = (page + 1) % (imageUrls.length)
        setImageUrl(imageUrls[nowPage]);
        setPage(nowPage);
    };

    return (show ? (
        <div>
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
                <Header />
                <center>
                    <p className='kame_font_004'>Welcome to Deep Stream</p>
                    {/*<iframe style={{aspectRatio:"8/4"}} width="80%" src="https://www.youtube.com/embed/oJKhbRFKIjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>*/}
                    <img style={{ width: '70%' }} src={imageUrl} alt="Image" onClick={toggleImage} />
                    <p className='kame_font_002'>{page + 1} / {imageUrls.length}</p>
                </center>
                <Footer />
            </>
        ))
}

export default HomePage