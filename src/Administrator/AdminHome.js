import React from 'react'
import { Footer, Header } from '../PageParts'
import { Link } from 'react-router-dom'

function AdminHome() {
  return (
    <>
    <Header/>
    <p class="kame_font_003">管理者画面</p>
    <Link to="/admineventpost" class="kame_button_light_blue"><p class="kame_font_002">提出書類作成</p></Link><br/>
    <Link to="/adminschedulepost" class="kame_button_light_blue"><p class="kame_font_002">イベント作成</p></Link>
    <Footer/>
    </>
  )
}

export default AdminHome