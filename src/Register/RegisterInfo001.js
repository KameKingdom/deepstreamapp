import React, { useCallback, useEffect, useRef, useState } from 'react'
import { auth, db } from '../firebase';
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import "../css/kame_register.css"
import { useBlockBrowserBack } from '../App';

function RegisterInfo001() {
  useBlockBrowserBack();
  const PersonalName = useRef(null);
  const PersonalName_kana = useRef(null);
  const StudentNum = useRef(null);
  const NickName = useRef(null);

  const [isalreadyuploaded, setIsAlreadyUploaded] = useState(false);
  const [isclicked, setIsClicked] = useState(false)

  const RegisterProcess001 = async (PersonalName, PersonalName_kana, StudentNum, NickName) => {
    setIsAlreadyUploaded(false);
    setIsClicked(true);
    try {
      const docRef = doc(db, "users", auth.currentUser.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("既存アカウントのアップデート");
        updateDoc(docRef, {
          PersonalName: PersonalName,
          PersonalNameFurigana: PersonalName_kana,
          StudentNumber: StudentNum,
          NickName: NickName,
        });
      } else {
        console.log("新規アカウントの登録");
        setDoc(docRef, {
          MailAddress: auth.currentUser.email,
          PersonalName: PersonalName,
          PersonalNameFurigana: PersonalName_kana,
          StudentNumber: StudentNum,
          NickName: NickName,
          ReservationNum: 0
        });
      }
      console.log("会員登録成功");
      setIsAlreadyUploaded(true);
    } catch {
      console.log("会員登録失敗");
      console.error();
    }
  };


  // 全部埋めると次に進めるようになる用変数
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [error2, setError2] = useState("");

  const [value3, setValue3] = useState("");
  const [error3, setError3] = useState("");

  const [value4, setValue4] = useState("");

  const handleInput1 = (event) => { setValue1(event.target.value); }
  const handleInput2 = (event) => {
    const inputValue = event.target.value;
    setValue2(inputValue);
    if (/[^ァ-ヶー \s]/u.test(inputValue)) { setError2("※カタカナで入力してください"); }
    else { setError2(""); }
  }
  const handleInput3 = (event) => {
    const inputValue = event.target.value;
    setValue3(inputValue);
    if (inputValue.length === 8) { setError3(""); }
    else { setError3("※８桁の半角数字で入力して下さい"); }
  }
  const handleInput4 = (event) => { setValue4(event.target.value); }


  return (
    <>
      <br /><br />
      <p class="kame_font_004">会員登録</p>
      <div class="Form">
        <div class="Form-Item">
          <p class="Form-Item-Label"><span class="Form-Item-Label-Required" >確認</span>メールアドレス</p>
          <input type="text" class="Form-Item-Input" value={auth.currentUser.email} readOnly />
        </div>
        <div class="Form-Item">
          <p class="Form-Item-Label"><span class="Form-Item-Label-Required" >必須</span>氏名(漢字)</p>
          <input type="text" class="Form-Item-Input" placeholder="例）深流太郎" name="PersonalName" ref={PersonalName} value={value1} onChange={handleInput1} />
        </div>
        <div class="Form-Item">
          <p class="Form-Item-Label"><span class="Form-Item-Label-Required" >必須</span>氏名(フリガナ)</p>
          <input type="text" class="Form-Item-Input" placeholder="例）ディープストリームタロウ" name="PersonalName_kana" ref={PersonalName_kana} value={value2} onChange={handleInput2} />
        </div>
        {error2 && <p style={{ color: "red", fontSize: "1.5em" }}>{error2}</p>}
        <div class="Form-Item">
          <p class="Form-Item-Label"><span class="Form-Item-Label-Required" >必須</span>学籍番号</p>
          <input type="number" class="Form-Item-Input" placeholder="例）00000000" ref={StudentNum} name="StudentNumber" value={value3} onChange={handleInput3} />
        </div>
        {error3 && <p style={{ color: "red", fontSize: "1.5em" }}>{error3}</p>}
        <div class="Form-Item">
          <p class="Form-Item-Label"><span class="Form-Item-Label-Required">必須</span>ニックネーム</p>
          <input type="email" class="Form-Item-Input" placeholder="例）でぃーぷ" name="NickName" ref={NickName} value={value4} onChange={handleInput4} />
        </div>

        {value1 && value2 && value3 && !error2 && !error3 && value4 && !isalreadyuploaded && !isclicked &&
          <>
            <br /><br />
            <button class="Form-Btn" onClick={() => RegisterProcess001(PersonalName.current.value, PersonalName_kana.current.value, StudentNum.current.value, NickName.current.value)}>
              <p className='kame_font_002'>確定</p>
            </button>
          </>
        }
        {
          isclicked && !isalreadyuploaded && <div class="loader">Loading...</div>

        }
        {isalreadyuploaded &&
          <>
            <br /><br /><Link to="/register002" className='kame_button_light_blue'><p className='kame_font_002'>確認画面へ</p></Link>
          </>
        }
      </div>
      <br /><br />
    </>
  );
}

export default RegisterInfo001