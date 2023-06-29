import React, { useEffect, useState } from 'react';
import { Footer, Header } from '../PageParts';
import "../css/kame.css";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, writeBatch } from 'firebase/firestore';
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

    useEffect(() => {
        async function fetchFirestoreData() {
            const today = moment();
            const dayOfWeek = today.day(); // 0 (日曜日) から 6 (土曜日) の範囲で取得できます

            // 日曜日、月曜日、火曜日以外は処理をスキップします
            if (dayOfWeek !== 0 && dayOfWeek !== 1 && dayOfWeek !== 2) {
                return;
            }

            const docRef = doc(db, "Setting", "Reservation");
            const docSnap = await getDoc(docRef, { source: 'cache' });
            const sunday = today.clone().startOf('week');
            if (docSnap.exists() && docSnap.data().LastResetDate === sunday.format('YYYYMMDD')) {
                return;
            }
            console.log("Reset Reservation Data");
            const batch = writeBatch(db);
            const settingRef = doc(db, "Setting", "Reservation");
            batch.set(settingRef, { LastResetDate: sunday.format('YYYYMMDD') });
            const usersRef = collection(db, 'users');
            const reservationNumQuery = query(usersRef);
            const userDocs = await getDocs(reservationNumQuery);
            userDocs.forEach((doc) => {
                batch.update(doc.ref, { ReservationNum: 0 });
            });
            const deleteOps = [];
            const WeekDayList = ["月", "火", "水", "木", "金", "土", "日"];
            const TimeSlotList = ["朝練", "１限", "チャペル", "２限", "昼練", "３限", "４限", "５限", "夜練Ⅰ", "夜練Ⅱ"];
            WeekDayList.forEach((weekday) => {
                TimeSlotList.forEach((timeslot) => {
                    const docToDelete = doc(db, weekday, timeslot);
                    deleteOps.push(deleteDoc(docToDelete));
                });
            });
            await Promise.all(deleteOps);
            await batch.commit();
            console.log("fin");
        }

        fetchFirestoreData();
    }, []);

    const imageUrls = [
        'http://deepstream.boo.jp/kame_kingdom/DeepMagazine/DeepMagazine003.jpg',
        'http://deepstream.boo.jp/kame_kingdom/DeepMagazine/DeepMagazine004.jpg',
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
                <p style={{ fontSize: "1.5em" }}>ver 2.0.0</p>
            </div>
        </div>
    ) :
        (
            <>
                <Header />
                <center>
                    <p style={{fontSize:"4.5em"}}>Welcome to Deep Stream</p>
                    {/*<iframe style={{aspectRatio:"8/4"}} width="80%" src="https://www.youtube.com/embed/oJKhbRFKIjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>*/}
                    <img style={{ width: '90%' }} src={imageUrl} alt="Image" onClick={toggleImage} />
                    <p className='kame_font_003'>{page + 1} / {imageUrls.length}</p>
                </center>
                <Footer />
            </>
        ))
}

export default HomePage