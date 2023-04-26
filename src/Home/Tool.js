import React from 'react'
import { Footer, Header } from '../PageParts'
import { Link } from 'react-router-dom'
import "../css/kame.css"

function Tool() {
    return (
        <>
            <Header />
            <p class="kame_font_003">ツール</p>
            <a href="https://forms.gle/Suc9yd9hvFqefcGM8" class="kame_button_light_blue"><p class="kame_font_002">お問い合わせ</p></a><br/>
            <Link to="/adminlogin" class="kame_button_light_blue"><p class="kame_font_002">コマンド</p></Link><br/>
            <Footer />
        </>
    )
}

export default Tool