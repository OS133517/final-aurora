import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddBookLayout from "./layouts/AddBookLayout";
import ReservationLayout from "./layouts/ReservationLayout";
import Login from "./pages/Login";
import Addresses from "./pages/addBook/Addresses";
import Main from "./pages/Main";
import MyReservation from "./pages/reservation/MyReservation";
import ReservationCalendar from "./pages/reservation/ReservationCalendar";
import "./App.css";
import ReservationAssetManagement from "./pages/reservation/ReservationAssetManagement";
import SurveyLayout from "./layouts/SurveyLayout";
import Surveys from "./pages/survey/Surveys";

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
            <Route path="reservation" element={<ReservationLayout/>}>
              <Route index element={<MyReservation/>}/>
              <Route path="my-reservation" element={<MyReservation/>}/>
              <Route path="assets/:assetCode" element={<ReservationCalendar/>}/>
              <Route path="asset-management" element={<ReservationAssetManagement/>}/>
            </Route>

            <Route path="survey" element={<SurveyLayout/>}>
              <Route path="list" element={<Surveys/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
