import React, { useEffect, useState, useContext } from 'react'
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import "../css/kame.css";
import { Link } from 'react-router-dom';
import { Footer, Header } from '../PageParts';
import { ref } from 'firebase/storage';

function AdminEventPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [link, setLink] = useState("");
    const [category, setCategory] = useState("0");
    const [isalreadyuploaded, setIsAlreadyUploaded] = useState(false);

    const handleUploadClick = async (e) => {
        // Firestoreに投稿を追加
        const postRef = await addDoc(collection(db, "NotificationPosts"), { Category: 0 });
        const postId = postRef.id;
        const categoryToInt = parseInt(category, 10);
        await updateDoc(doc(db, "NotificationPosts", postId), {
            Title: title,
            Content: content,
            Link: link,
            Category: categoryToInt
        });
        setIsAlreadyUploaded(true);
    };

    const handleSelectChange1 = (e) => { setCategory(e.target.value); }
    const handleSelectChange2 = (e) => { setTitle(e.target.value); }
    const handleSelectChange3 = (e) => { setContent(e.target.value); }
    const handleSelectChange4 = (e) => { setLink(e.target.value); }

    return (
        <div>
            <Header />
            <center>
                <p class="kame_font_003">イベント投稿画面</p>
                <form>
                    <label class="kame_select_005">
                        <select onChange={handleSelectChange1}>
                            <option value="0">メモ</option>
                            <option value="1">注意</option>
                            <option value="2">アンケート</option>
                            <option value="3">確認</option>
                        </select>
                    </label>
                </form><br/>
                {!category && <p class="kame_font_error">※練習内容を選択してください</p>}
                <label><textarea class="kame_textarea_small" onChange={handleSelectChange2} placeholder="タイトル" minLength={"0"} maxLength={"20"} value={title} /></label>
                <label><textarea class="kame_textarea" onChange={handleSelectChange3} placeholder="内容" value={content} /></label>
                <label><textarea class="kame_textarea" style={{fontSize:"2.0em"}} onChange={handleSelectChange4} placeholder="リンク" minLength={"0"} value={link} /></label>
                <br /><br /><br />
                {title && content && category && !isalreadyuploaded &&
                    <button class="kame_button_black" onClick={handleUploadClick}><p class="kame_font_002">送信</p></button>
                }
                {isalreadyuploaded &&
                    <Link to="/notification" class="kame_button_black"><p class="kame_font_002">完了</p></Link>
                }
            </center>
            <Footer />
        </div>
    )
}

export default AdminEventPost