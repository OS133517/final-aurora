import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddBookLayout from "./layouts/AddBookLayout";
import Main from "./pages/Main";
import Addresses from "./pages/addBook/Addresses";
import WorklogLayout from "./layouts/WorklogLayout";
import DayWorklogs from "./pages/worklog/DayWorklogs";
import DayWorklogDetail from "./pages/worklog/DayWorklogDetail";
import DayWorklogInsert from "./pages/worklog/DayWorklogInsert";


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
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
      </Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
