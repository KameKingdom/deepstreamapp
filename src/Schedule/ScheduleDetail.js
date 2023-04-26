import React, { useContext, useEffect, useState } from 'react'
import { Footer, Header } from '../PageParts'
import { InfoContext } from '../App'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function ScheduleDetail() {
    // リロード禁止
    useEffect(() => {
        window.addEventListener('beforeunload', handleWindowClose);
        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        }
    }, []);
    const handleWindowClose = (event) => {
        event.preventDefault();
        event.returnValue = '';
    }
    /* スケジュール情報変数 */
    const ScheduleInfo = useContext(InfoContext); // 共有変数の取得

    const day = ScheduleInfo.Eventday; // 日付
    const month = ScheduleInfo.EventMonth; // 月
    const [dayofweek, setDayOfWeek] = useState("") // 曜日
    const [title, setTitle] = useState("") // タイトル
    const [content, setContent] = useState("") // コンテンツ
    const [category, setCategory] = useState("") // カテゴリ
    const [link, setLink] = useState("") // リンク

    /* スケジュール情報取得 */
    useEffect(() => {
        async function fetchFirestoreData() {
            let docRef = doc(db, "Schedules", "2023", month.toString(), day.toString());
            let docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const docData = docSnap.data();
                setDayOfWeek(docData.dayofweek);
                setTitle(docData.title);
                setContent(docData.content);
                setCategory(docData.category);
                setLink(docData.link);
            }
        }
        fetchFirestoreData();
    }, []);



    return (
        <>
            <Header />
            <div class="kame_header_003"><p class="kame_font_004">{title}</p></div>
            <p class="kame_font_003">{month}/{day}({dayofweek})</p>

            <p class="kame_font_002">
            </p>
            <center>
                <textarea class="kame_textarea" placeholder={content} readOnly />
                <a href={link}><textarea class="kame_textarea_small" value={link.slice(0,30)} style={{color:"green"}} readOnly/></a>
            </center>

            <br /><br /><br />
            <Footer />
        </>
    )
}

export default ScheduleDetail