import React, { useContext, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import "../css/kame.css";

function RegisterInfo002() {
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

  // 個人情報取得
  const [PersonalName, setPersonalName] = useState("");
  const [PersonalNameFurigana, setPersonalNameFurigana] = useState("");
  const [StudentNumber, setStudentNumber] = useState("");
  const [NickName, setNickName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFirestoreData() {
      const docRef = doc(db, "users", auth.currentUser.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        setPersonalName(docData.PersonalName);
        setPersonalNameFurigana(docData.PersonalNameFurigana);
        setStudentNumber(docData.StudentNumber);
        setNickName(docData.NickName);
      }
    }
    fetchFirestoreData();
    setLoading(false);
  }, []);
  if (loading) { return <div class="loader">Loading...</div> }


  return (
    <>
      <br /><h1 class="kame_header_003" />
      <center>
        <p class="kame_font_004">情報の確認</p><br />
        <table class="kame_table_001">
          <tr>
            <th>氏名</th>
            <td>{PersonalName}({PersonalNameFurigana})</td>
          </tr>
          <tr>
            <th>学籍番号</th>
            <td>{StudentNumber}</td>
          </tr>
          <tr>
            <th>ニックネーム</th>
            <td>{NickName}</td>
          </tr>
        </table>
        <br /><br />
        <Link to="/register001">
          <button class="kame_button_blue">
            <p class="kame_font_002">修正</p>
          </button>
        </Link><br />
        <Link to="/">
          <button class="kame_button_blue">
            <p class="kame_font_002">完了</p>
          </button>
        </Link>
      </center>
    </>
  )
}

export default RegisterInfo002