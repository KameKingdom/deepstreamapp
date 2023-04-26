import { useState, useEffect, useContext } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Footer, Header } from "../PageParts";
import "../css/kame.css";
import { Link } from "react-router-dom";
import { InfoContext } from "../App";

const Calendar = (props) => {
    /* 
    const [FilePosts, setFilePosts] = useState([]);
    const ScheduleInfo = useContext(InfoContext);
    // 現在の月を取得する
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    // 12か月分の月のリストを作成する
    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i);
    }

    // 現在の月から1年分の月のリストに切り取る
    const slicedMonths = months.slice(currentMonth - 1).concat(months.slice(0, currentMonth - 1));


    useEffect(() => {
        const fetchFilePosts = async () => {
          const newPosts = [];
          slicedMonths.forEach(async (i) => {
            const month = `${i}`;
            const filePostsCollectionRef = collection(db, "Schedules", "2023", month);
            const q = query(filePostsCollectionRef, orderBy("day", "asc"), orderBy("__name__"));
            const filePostsSnapshot = await getDocs(q);
            const filePostsData = filePostsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            newPosts.push(...filePostsData);
          })
          setFilePosts((prevPosts) => {
            const newPostsIds = newPosts.map((post) => post.id);
            const filteredPrevPosts = prevPosts.filter((post) => !newPostsIds.includes(post.id));
            return [...newPosts, ...filteredPrevPosts];
          });
        };
        fetchFilePosts();
      }, [slicedMonths]);
      

    const postCategory = ["kame_memo", "kame_exclamation", "kame_question", "kame_check"];

    return (
        <>
            <Header />
            {FilePosts.map((filePost) => (
                <div className={postCategory[filePost.category]}>
                    <table key={filePost.id}>
                        <tr>
                            <div className="box-title">
                                <td>
                                    {filePost.month}/{filePost.day}({filePost.dayofweek})&emsp;
                                </td>
                                <td>
                                    <Link to="/scheduledetail" onClick={() => {
                                        ScheduleInfo.EventMonth = filePost.month; ScheduleInfo.Eventday = filePost.day;
                                    }} style={{ color: "green" }}>
                                        {filePost.title}
                                    </Link>
                                </td>
                            </div>
                        </tr>
                    </table>
                </div>
            ))}
            <Footer />
        </>
    );
    */
    return (
        <>
            <Header />
            <p class="kame_font_002">システム変更中</p>
            <Footer />
        </>
    )
};

export default Calendar;
