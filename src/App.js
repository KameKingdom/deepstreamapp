import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Login from "./Register/Login";
import Register from "./Register/Register";
import TermsOfService from "./Document/TermsOfService";
import RegisterInfo001 from "./Register/RegisterInfo001";
import RegisterInfo002 from "./Register/RegisterInfo002";
import Contact from "./Home/Contact";
import Calendar from "./Home/Calendar";
import Reservation from "./Home/Reservation";
import Notification from "./Home/Notification";
import Tool from "./Home/Tool";
import AddReservation from "./Reservation/AddReservation";
import { createContext } from "react";
import ReservationDetail from "./Reservation/ReservationDetail";
import AdminEventPost from "./Administrator/AdminEventPost";
import AdminHome from "./Administrator/AdminHome";
import AdminLogin from "./Administrator/AdminLogin";
import AlertReservation from "./Reservation/AlertReservation";
import AdminSchedule from "./Administrator/AdminSchedulePost";
import AdminSchedulePost from "./Administrator/AdminSchedulePost";
import ScheduleDetail from "./Schedule/ScheduleDetail";

const Info = {
  WeekDay: "",
  TimeSlot: "",
  Time: "",
  EventMonth: "",
  Eventday: "",
};

const ScheduleInfo = {

}
export const InfoContext = createContext(Info);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/reservation" element={<Reservation />}></Route>
          <Route exact path="/addreservation" element={<AddReservation />}></Route>
          <Route exact path="/reservationdetail" element={<ReservationDetail />}></Route>
          <Route exact path="/alertreservation" element={<AlertReservation />}></Route>

          <Route exact path="/admineventpost" element={<AdminEventPost />}></Route>
          <Route exact path="/adminschedulepost" element={<AdminSchedulePost />}></Route>
          <Route exact path="/adminhome" element={<AdminHome />}></Route>
          <Route exact path="/adminlogin" element={<AdminLogin />}></Route>

          <Route exact path="/calendar" element={<Calendar />}></Route>
          <Route exact path="/scheduleDetail" element={<ScheduleDetail />}></Route>
          <Route exact path="/notification" element={<Notification />}></Route>
          <Route exact path="/tool" element={<Tool />}></Route>

          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/login" element={<Login />}></Route>

          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/register001" element={<RegisterInfo001 />}></Route>
          <Route exact path="/register002" element={<RegisterInfo002 />}></Route>
          <Route exact path="/termsofservice" element={<TermsOfService />}></Route>

        </Routes>
      </Router>
    </>
  );
}

export { App };