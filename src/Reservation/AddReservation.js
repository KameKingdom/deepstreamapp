import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from "react";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import "../css/kame.css";
import { Link } from 'react-router-dom';
import { Footer, Header } from '../PageParts';
import { InfoContext } from '../App';

function AddReservation() {
    const DAYOFWEEKSTR = ["月", "火", "水", "木", "金", "土", "日"];
    var date = new Date();
    var dayOfWeek = date.getDay();
    var DayOfWeekStr = DAYOFWEEKSTR[(dayOfWeek + 6) % 7];

    // ブラウザバック禁止コード
    const blockBrowserBack = useCallback(() => {
        alert("会員登録中はブラウザバックできません。");
        window.history.go(1)
    }, [])
    useEffect(() => {
        window.history.pushState(null, '', window.location.href)
        window.addEventListener('popstate', blockBrowserBack)
        return () => { window.removeEventListener('popstate', blockBrowserBack) }
    }, [blockBrowserBack])

    const [category, setCategory] = useState("バンド");
    const [memo, setMemo] = useState(null);
    const [isalreadyuploaded, setIsAlreadyUploaded] = useState(false);
    const [isclicked, setIsClicked] = useState(false);

    const handleSelectChange1 = (e) => { setCategory(e.target.value); setIsAlreadyUploaded(""); setIsClicked(false); }
    const handleSelectChange3 = (e) => { setMemo(e.target.value); setIsAlreadyUploaded(""); setIsClicked(false); }
    function PostButtonClick() {
        setIsClicked(true);
        handleUploadClick();
    }

    const [nickname, setNickName] = useState("");
    const [reservationNum, setReservationNum] = useState(null);
    const [canReserve, setCanReserve] = useState(false);

    const [isloaded, setIsLoaded] = useState(false)
    useEffect(() => {
        async function fetchFirestoreData() {
            const docRef = doc(db, "users", auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const docData = docSnap.data();
                setNickName(docData.NickName);
                setReservationNum(docData.ReservationNum);
                setCanReserve(isNaN(docData.ReservationNum) ? true : docData.ReservationNum <= 1);
            }
            setIsLoaded(true);
        }
        fetchFirestoreData();
    }, []);

    const ReservationInfo = useContext(InfoContext);

    const handleUploadClick = async (e) => {

        const TimeSlot = ReservationInfo.TimeSlot;
        const WeekDay = ReservationInfo.WeekDay;
        // Firestoreに投稿を追加
        await setDoc(doc(db, WeekDay, TimeSlot), {
            PostUserMail: auth.currentUser.email,
            WeekDay: ReservationInfo.WeekDay,
            TimeSlot: ReservationInfo.TimeSlot,
            Category: category,
            Memo: memo,
            NickName: nickname
        });
        let count = 0;
        if (DayOfWeekStr === ReservationInfo.WeekDay) { count = reservationNum; }
        else if (isNaN(reservationNum) || reservationNum <= 0) { count = 1; }
        else { count = reservationNum + 1; }
        await updateDoc(doc(db, "users", auth.currentUser.email), {
            ReservationNum: count
        });
        setIsAlreadyUploaded("uploaded");
    };

    if (!isloaded) {
        return (
            <>
                <Header />
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <div class="loader">Loading...</div>
                <Footer />
            </>
        )
    }
    else {
        return (
            <div>
                <Header />
                <center>
                    <div class="kame_header_003"><p class="kame_font_004">{ReservationInfo.WeekDay}曜日</p></div>
                    <p class="kame_font_003">{ReservationInfo.TimeSlot}({ReservationInfo.Time})</p>
                    <form>
                        <label class="kame_select_005">
                            <select onChange={handleSelectChange1}>
                                <option value="バンド"><p class="kame_font_002"></p>バンド</option>
                                <option value="個人">個人</option>
                                <option value="パート">パート</option>
                                <option value="その他">その他</option>
                            </select>
                        </label>
                    </form>
                    <br /><br />
                    {!category && <p class="kame_font_error">※練習内容を選択してください</p>}
                    <label>
                        <textarea class="kame_textarea" onChange={handleSelectChange3} placeholder="Saucy Dog" minLength={"0"} maxLength={"20"} value={memo} />
                    </label>
                    <br /><br /><br />
                    {canReserve && !isalreadyuploaded && !isclicked &&
                        <button to="/" class="kame_button_black" onClick={PostButtonClick}><p class="kame_font_002">予約</p></button>
                    }
                    {!canReserve &&
                        <p class="kame_font_002">予約は週に2回までです</p>
                    }
                    {
                        isclicked && !isalreadyuploaded && <center><br /><span class="kame_loader"><span class="kame_loader-inner"></span></span><p class="kame_font_002">アップロード中…</p></center>
                    }
                    {isloaded && isalreadyuploaded &&
                        <Link to="/reservation" class="kame_button_black"><p class="kame_font_002">完了</p></Link>
                    }
                </center>
                <Footer />
            </div>
        )
    }
}

export default AddReservation