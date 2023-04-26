import React, { useContext, useEffect, useState } from 'react'
import { Footer, Header } from '../PageParts'
import { InfoContext } from '../App';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import "../css/kame.css";
import { Link } from 'react-router-dom';

function ReservationDetail() {
  const DAYOFWEEKSTR = ["月", "火", "水", "木", "金", "土", "日"];
  var date = new Date();
  var dayOfWeek = date.getDay();
  var DayOfWeekStr = DAYOFWEEKSTR[(dayOfWeek + 6) % 7];
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
  const ReservationInfo = useContext(InfoContext);
  const [isloaded, setIsLoaded] = useState(false)

  const [isalreadyDeleted, setIsAlreadyDeleted] = useState(false);

  const [category, setCategory] = useState("");
  const [memo, setMemo] = useState("");
  const [nickname, setNickName] = useState("");
  const TimeSlot = ReservationInfo.TimeSlot;
  const WeekDay = ReservationInfo.WeekDay;

  const [isDeleting, setIsDeleting] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const handleClick = async () => {
    try {
      setIsDeleting(true);
      const docRef = doc(db, ReservationInfo.WeekDay, ReservationInfo.TimeSlot);
      await deleteDoc(docRef);
      setIsDeleting(false);
      let count = 0;
      if (DayOfWeekStr === ReservationInfo.WeekDay) { count = reservationNum; }
      else { count = reservationNum - 1; }
      await updateDoc(doc(db, "users", auth.currentUser.email), {
        ReservationNum: count
      });
    } catch (error) {
      console.error('ドキュメントの削除中にエラーが発生しました', error);
      setIsDeleting(false);
      alert('ドキュメントの削除中にエラーが発生しました');
    }
    setIsAlreadyDeleted(true);
  };

  const [reservationNum, setReservationNum] = useState(null);
  useEffect(() => {
    async function fetchFirestoreData() {
      let docRef = doc(db, ReservationInfo.WeekDay, ReservationInfo.TimeSlot);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        setCategory(docData.Category);
        setMemo(docData.Memo);
        setNickName(docData.NickName);
        setCanEdit(docData.PostUserMail === auth.currentUser.email);
      }
      docRef = doc(db, "users", auth.currentUser.email);
      docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        setReservationNum(docData.ReservationNum);
      }
      setIsLoaded(true);
    }
    fetchFirestoreData();
  }, []);

  if (!isloaded) {
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
  else {
    return (
      <>

        <Header />
        <div class="kame_header_003"><p class="kame_font_004">{WeekDay}曜日</p></div>
        <p class="kame_font_003">{TimeSlot}({ReservationInfo.Time})</p>

        <p class="kame_font_002">
        </p>
        <center>
          <table class="kame_table_001">
            <tr>
              <th>ユーザー</th>
              <td><p class="kame_font_001">{nickname}</p></td>
            </tr>
            <tr>
              <th>練習内容
              </th>
              <td><p class="kame_font_001">{category}</p></td>
            </tr>
          </table>
          <br /><br />
          <textarea class="kame_textarea" placeholder={memo} readOnly />
          <br /><br /><br />
        </center>

        {canEdit && !isalreadyDeleted &&
          <button class="kame_button_black" onClick={handleClick} disabled={isDeleting}><p class="kame_font_002">消去</p></button>
        }
        {console.log("canedit:" + canEdit)}
        {console.log("isalreadydeleted:" + isalreadyDeleted)}
        {isDeleting && !isalreadyDeleted &&
          <p class="kame_font_002">'削除中...'</p>
        }
        {isloaded && isalreadyDeleted &&
          <Link to="/reservation" class="kame_button_black"><p class="kame_font_002">完了</p></Link>
        }

        <Footer />
      </>
    )
  }
}

export default ReservationDetail