import React, { useContext } from 'react'
import { Footer, Header } from '../PageParts'
import { InfoContext } from '../App';

function AlertReservation() {
    const ReservationInfo = useContext(InfoContext);

    return (
        <div>
            <Header />
            <div class="kame_header_003"><p class="kame_font_004">{ReservationInfo.WeekDay}曜日</p></div>
            <p class="kame_font_003">{ReservationInfo.TimeSlot}({ReservationInfo.Time})</p>
            <p class="kame_font_003" style={{color:"red"}}>過去の投稿は編集できません</p>
            <Footer />
        </div>
    )
}

export default AlertReservation