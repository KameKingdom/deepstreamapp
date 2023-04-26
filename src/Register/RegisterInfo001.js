import React, { useCallback, useEffect, useRef, useState } from 'react'
import { auth, db } from '../firebase';
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import "../css/kame_register.css"

function RegisterInfo001() {
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

  const PersonalName = useRef(null);
  const PersonalName_kana = useRef(null);
  const StudentNum = useRef(null);
  const NickName = useRef(null);



  const [isalreadyuploaded, setIsAlreadyUploaded] = useState(false);
  const [isclicked, setIsClicked] = useState(false)

  const RegisterProcess001 = (PersonalName, PersonalName_kana, StudentNum, NickName) => {
    setIsAlreadyUploaded(false);
    setIsClicked(true)
    try {
      setDoc(doc(db, "users", auth.currentUser.email), {
        MailAddress: auth.currentUser.email,
        PersonalName: PersonalName,
        PersonalNameFurigana: PersonalName_kana,
        StudentNumber: StudentNum,
        NickName: NickName,
      });
      console.log("データ受信成功001");
      setIsAlreadyUploaded(true);
    } catch {
      console.log("データ受信失敗001");
    }
  }

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
    if (/[^ァ-ヶー]/u.test(inputValue)) { setError2("カタカナで入力してください"); }
    else { setError2(""); }
  }
  const handleInput3 = (event) => {
    const inputValue = event.target.value;
    console.log(inputValue);
    setValue3(inputValue);
    if (inputValue.length === 8) { setError3(""); }
    else { setError3("8桁の半角数字で入力して下さい"); }
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
        {error2 && <p>{error2}</p>}
        <div class="Form-Item">
          <p class="Form-Item-Label"><span class="Form-Item-Label-Required" >必須</span>学籍番号</p>
          <input type="number" class="Form-Item-Input" placeholder="例）00000000" ref={StudentNum} name="StudentNumber" value={value3} onChange={handleInput3} />
        </div>
        {error3 && <p>{error3}</p>}
        <div class="Form-Item">
          <p class="Form-Item-Label"><span class="Form-Item-Label-Required">必須</span>ニックネーム</p>
          <input type="email" class="Form-Item-Input" placeholder="例）でぃーぷ" name="NickName" ref={NickName} value={value4} onChange={handleInput4} />
        </div>

        {value1 && !(/[^ァ-ヶー]/u.test(value2)) && value3 && value4 && !isalreadyuploaded && !isclicked &&
          <button class="Form-Btn" onClick={() => RegisterProcess001(PersonalName.current.value, PersonalName_kana.current.value, StudentNum.current.value, NickName.current.value)}>
            確定
          </button>
        }
        {
          isclicked && !isalreadyuploaded && <center><br /><span class="kame_loader"><span class="kame_loader-inner"></span></span><p class="kame_font">登録中…</p></center>
        }
        {isalreadyuploaded &&
          <Link to="/register002">
            <input type="submit" class="Form-Btn" value="次へ" />
          </Link>
        }
      </div>
      <br /><br />
    </>
  );
}

export default RegisterInfo001