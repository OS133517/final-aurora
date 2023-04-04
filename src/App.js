import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddBookLayout from "./layouts/AddBookLayout";
import Login from "./pages/Login";
import Addresses from "./pages/addBook/Addresses";
import HrmLayout from "./layouts/HrmLayout";
import Hrm from "./pages/hrm/Hrm";
import Main from "./pages/Main";
import HrmDetail from './pages/hrm/HrmDetail';
import HrmModify from './pages/hrm/HrmModify';
import AttendanceLayout from './layouts/AttnedanceLayout';
import HrmSignup from './pages/hrm/HrmSignup';
import Attendance from './pages/attendance/Attendance';
import "./App.css";


function App() {
  return (
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
          <Route path="hrm" element={<HrmLayout/>}>
            <Route index element={<Hrm/>}/>
            <Route path="list" element={<Hrm category='인사 목록'/>}/>
            <Route path="hrm-detail/:memberCode" element={<HrmDetail category='인사 정보'/>}/>
            <Route path="hrm-modify" element={<Hrm category='인사 수정'/>}/>
            <Route path="hrm-modify/:memberCode" element={<HrmModify category='인사 수정'/>}/>
            <Route path="hrm-regist" element={<HrmSignup category='인사 등록'/>}/>
          </Route>
          
          <Route path="attendance" element={<AttendanceLayout/>}>
            <Route index element={<Attendance/>}/>
            {/* <Route path="list" element={<Attendance category='인사 목록'/>}/> */}
            <Route path="attnedance-detail/:memberCode" element={<Attendance category='근태 현황'/>}/>
            <Route path="vacation-detail/:memberCode" element={<Attendance category='휴가 현황'/>}/>
          </Route>
        </Route>
      
      </Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
