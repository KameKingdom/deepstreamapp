import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import "../css/kame.css";
import { Footer, Header } from '../PageParts';
import { auth, db } from '../firebase';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
function Contact() {
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

    const title = useRef(null);
    const message = useRef(null);

    const [isalreadyuploaded, setIsAlreadyUploaded] = useState(false);
    const [isclicked, setIsClicked] = useState(false)

    const SendMessage = async (title, message) => {
        setIsAlreadyUploaded(false);
        setIsClicked(true)
        const postRef = await addDoc(collection(db, "Contacts"), { title: "" });
        const postId = postRef.id;
        try {
            setDoc(doc(db, "Contacts", postId), {
                user: auth.currentUser.displayName,
                email: auth.currentUser.email,
                title: title,
                message: message,
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

    const handleInput1 = (event) => {
        setValue1(event.target.value);
        setIsAlreadyUploaded(false);
        setIsClicked(false)
    }
    const handleInput2 = (event) => {
        setValue2(event.target.value);
        setIsAlreadyUploaded(false);
        setIsClicked(false)
    }

    return (
        <>
            <Header />
            <center>
                <h1 class="kame_font_005">Contact Form</h1>
                <input className="kame_textarea_small" placeholder="タイトル" type="text" name="familyname" ref={title} value={value1} onChange={handleInput1} />
                <br /><br />
                <textarea placeholder="内容" className="kame_textarea" type="text" name="familyname" ref={message} value={value2} onChange={handleInput2} />
                <br /><br />

                {value1 && value2 && !isalreadyuploaded && !isclicked &&
                    <button class="kame_button_blue" onClick={() => SendMessage(title.current.value, message.current.value)}><p class="kame_font_002">送信</p></button>
                }
                {
                    isclicked && !isalreadyuploaded && <center><br /><span class="kame_loader"><span class="kame_loader-inner"></span></span><p class="kame_font_002">送信中…</p></center>
                }
                {isalreadyuploaded &&
                    <Link class="kame_button_black" to="/"><p class="kame_font_002">ホーム</p></Link>
                }
                <Footer />
            </center>
        </>
    );
}



export default Contact;