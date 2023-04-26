import React, { useState } from 'react';
import { Footer, Header } from '../PageParts';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

function AdminSchedulePost() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [month, setMonth] = useState("4");
  const [day, setDay] = useState("1");
  const [dayofweek, setDayofWeek] = useState("月");
  const [category, setCategory] = useState("");

  const [isalreadyuploaded, setIsAlreadyUploaded] = useState(false);

  const handleUploadClick = async (e) => {
    // Firestoreに投稿を追加
    const schedulesRef = doc(db, 'Schedules', '2023');
    const monthRef = collection(schedulesRef, month);
    const dayRef = doc(monthRef, day);
    await setDoc(dayRef,{
      title: title,
      link: link,
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      dayofweek: dayofweek,
      category: category
    });
    setIsAlreadyUploaded(true);
  };

  const handleSelectChange1 = (e) => { setCategory(e.target.value); }
  const handleSelectChange2 = (e) => { setTitle(e.target.value); }
  const handleSelectChange4 = (e) => { setLink(e.target.value); }
  const handleSelectChange5 = (e) => { setMonth(e.target.value); }
  const handleSelectChange6 = (e) => { setDay(e.target.value); }
  const handleSelectChange7 = (e) => { setDayofWeek(e.target.value); }

  return (
    <>
      <Header />
      <center>
      <p className="kame_font_003">イベント投稿画面</p>
        <form>
          <label class="kame_select_005">
            <select onChange={handleSelectChange5}>
              <option value="4">4月</option>
              <option value="5">5月</option>
              <option value="6">6月</option>
              <option value="7">7月</option>
              <option value="8">8月</option>
              <option value="9">9月</option>
              <option value="10">10月</option>
              <option value="11">11月</option>
              <option value="12">12月</option>
              <option value="1">1月</option>
              <option value="2">2月</option>
              <option value="3">3月</option>
            </select>
          </label>
        </form><br />
        <form>
          <label class="kame_select_005">
            <select onChange={handleSelectChange6}>
              <option value="1">1日</option>
              <option value="2">2日</option>
              <option value="3">3日</option>
              <option value="4">4日</option>
              <option value="5">5日</option>
              <option value="6">6日</option>
              <option value="7">7日</option>
              <option value="8">8日</option>
              <option value="9">9日</option>
              <option value="10">10日</option>
              <option value="11">11日</option>
              <option value="12">12日</option>
              <option value="13">13日</option>
              <option value="14">14日</option>
              <option value="15">15日</option>
              <option value="16">16日</option>
              <option value="17">17日</option>
              <option value="18">18日</option>
              <option value="19">19日</option>
              <option value="20">20日</option>
              <option value="21">21日</option>
              <option value="22">22日</option>
              <option value="23">23日</option>
              <option value="24">24日</option>
              <option value="25">25日</option>
              <option value="26">26日</option>
              <option value="27">27日</option>
              <option value="28">28日</option>
              <option value="29">29日</option>
              <option value="30">30日</option>
              <option value="31">31日</option>
            </select>
          </label>
        </form><br />
        <form>
          <label class="kame_select_005">
            <select onChange={handleSelectChange7}>
              <option value="月">月</option>
              <option value="火">火</option>
              <option value="水">水</option>
              <option value="木">木</option>
              <option value="金">金</option>
              <option value="土">土</option>
              <option value="日">日</option>
            </select>
          </label>
        </form><br />
        <form>
          <label class="kame_select_005">
            <select onChange={handleSelectChange1}>
              <option value="1">ライブ</option>
              <option value="2">イベント</option>
              <option value="3">メモ</option>
              <option value="0">その他</option>
            </select>
          </label>
        </form><br />
        <label><textarea class="kame_textarea_small" onChange={handleSelectChange2} placeholder="タイトル" minLength={"0"} maxLength={"20"} value={title} /></label>
        <label><textarea class="kame_textarea" style={{ fontSize: "2.0em" }} onChange={handleSelectChange4} placeholder="リンク" minLength={"0"} value={link} /></label>
        <br /><br /><br />
        {title && category && !isalreadyuploaded &&
          <button class="kame_button_black" onClick={handleUploadClick}><p class="kame_font_002">送信</p></button>
        }
        {isalreadyuploaded &&
          <Link to="/adminhome" class="kame_button_black"><p class="kame_font_002">完了</p></Link>
        }
      </center>
      <Footer />
    </>
  )
}

export default AdminSchedulePost