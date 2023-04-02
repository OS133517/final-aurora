import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddBookLayout from "./layouts/AddBookLayout";

import Main from "./pages/Main";
import Approvals from "./pages/approval/Approvals";
import ApprovalLayout from "./layouts/ApprovalLayout";
import Pending from "./pages/approval/Pending";
import Addresses from "./pages/addBook/Addresses";
import ApprovalDetail from "./pages/approval/ApprovalDetail";
import ReservationLayout from "./layouts/ReservationLayout";
import Login from "./pages/Login";
import Addresses from "./pages/addBook/Addresses";
import Main from "./pages/Main";
import ReportLayout from "./layouts/ReportLayout";
import ReportsSummary from "./pages/report/ReportSummary";
import ReportCreate from "./pages/report/ReportCreate";
import Reports from "./pages/report/Reports";
import ReportRounds from "./pages/report/ReportRounds";
import ReportRoundDetail from "./pages/report/ReportRoundDetail";
import MyReservation from "./pages/reservation/MyReservation";
import ReservationCalendar from "./pages/reservation/ReservationCalendar";
import "./App.css";
import ApprovalDraft from "./pages/approval/ApprovalDraft";
import DraftForm from "./pages/approval/DraftForm";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="aurora" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="address-book" element={<AddBookLayout />}>
                <Route index element={<Addresses />} />
                <Route path="addresses" element={<Addresses category='전체 주소록' />} />
                <Route path="personal-groups/:groupCode" element={<Addresses category='개인 주소록' />} />
                <Route path="team-groups/:groupCode" element={<Addresses category='공용 주소록' />} />
              </Route>
              <Route path="reservation" element={<ReservationLayout />}>
                <Route index element={<MyReservation/>}/>
                <Route path="my-reservation" element={<MyReservation />} />
                <Route path="assets/:assetCode" element={<ReservationCalendarLayout />} />
              </Route>
              <Route path="approval" element={<ApprovalLayout />}>
                <Route index="approvals" element={<Approvals />} />
                <Route index path="pending" element={<Pending />} />
                <Route index path="draft" element={<ApprovalDraft />} />
                <Route index path="detail/:appCode" element={<ApprovalDetail />} />
                <Route index path="form/:docCode" element={<DraftForm />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
