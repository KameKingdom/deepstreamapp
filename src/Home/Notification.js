import React, { useEffect, useState } from 'react'
import { Footer, Header } from '../PageParts'
import { collection, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Notification() {
    const Month = ["4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", "1月", "2月", "3月"]
    //firestoreのPostsから情報を取得する
    const [FilePosts, setQuestionPosts] = useState([]);
    useEffect(() => {
        const FilePostsCollection = collection(db, 'NotificationPosts');
        const q = query(FilePostsCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const FilePostsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('Firestoreのデータ読み取り完了:', FilePostsData);
            setQuestionPosts(FilePostsData);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const PostCategory = ["kame_memo", "kame_exclamation", "kame_question", "kame_check"]
    const PostCategoryMark = ["📒", "⚠", "📝", "☑"]

    return (
        <>
            <Header />
            {FilePosts.slice().reverse().map((FilePost) => (
                <>
                    <div class={PostCategory[FilePost.Category]}>
                        <div class="box-title">{PostCategoryMark[FilePost.Category]}{FilePost.Title}</div>
                        {FilePost.Content}<br />
                        <a href={FilePost.Link} style={{ color: "green" }}>{FilePost.Link.slice(0, 30)}...</a>
                    </div>
                </>
            ))}

            <Footer />
        </>
    )
}

export default Notification
