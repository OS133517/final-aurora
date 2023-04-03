import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddBookLayout from "./layouts/AddBookLayout";
import ReservationLayout from "./layouts/ReservationLayout";
import Login from "./pages/Login";
import Addresses from "./pages/addBook/Addresses";
import WorklogLayout from "./layouts/WorklogLayout";
import DayWorklogs from "./pages/worklog/DayWorklogs";
import DayWorklogDetail from "./pages/worklog/DayWorklogDetail";
import DayWorklogInsert from "./pages/worklog/DayWorklogInsert";

import Main from "./pages/Main";
import MyReservation from "./pages/reservation/MyReservation";
import ReservationCalendarLayout from "./layouts/ReservationCalendarLayout";
import "./App.css";

function App() {
  return (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login/>}/>
          <Route path="aurora" element={<Layout/>}>
            <Route index element={<Main/>}/>
            <Route path="address-book" element={<AddBookLayout/>}>
              <Route index element={<Addresses/>}/>
              <Route path="addresses" element={<Addresses category='전체 주소록'/>}/>
              <Route path="personal-groups/:groupCode" element={<Addresses category='개인 주소록'/>}/>
              <Route path="team-groups/:groupCode" element={<Addresses category='공용 주소록'/>}/>
            </Route>

            <Route path="worklog" element={<WorklogLayout/>}>
              <Route path="day" element={<DayWorklogs/>}/>
              <Route path="day/:dayWorklogCode" element={<DayWorklogDetail/>}/>
              <Route path="day/insert" element={<DayWorklogInsert/>}/>
            </Route>

            <Route path="reservation" element={<ReservationLayout/>}>
              <Route index element={<MyReservation/>}/>
              <Route path="my-reservation" element={<MyReservation/>}/>
              <Route path="assets/:assetCode" element={<ReservationCalendarLayout/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
