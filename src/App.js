import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Login from "./pages/Login";

import ApprovalLayout from "./layouts/ApprovalLayout";
import Approvals from "./pages/approval/Approvals";
import ApprovalDetail from "./pages/approval/ApprovalDetail";
import Pending from "./pages/approval/Pending";
import ApprovalDraft from "./pages/approval/ApprovalDraft";
import DraftForm from "./pages/approval/DraftForm";
import ApprovalWait from "./pages/approval/ApprovalWait";

import AddBookLayout from "./layouts/AddBookLayout";
import Addresses from "./pages/addBook/Addresses";

import ScheduleLayout from "./layouts/ScheduleLayout";
import Schedules from "./pages/schedule/Schedules";

import ReservationLayout from "./layouts/ReservationLayout";
import MyReservation from "./pages/reservation/MyReservation";
import ReservationCalendar from "./pages/reservation/ReservationCalendar";
import ReservationAssetManagement from "./pages/reservation/ReservationAssetManagement";

import SurveyLayout from "./layouts/SurveyLayout";
import Surveys from "./pages/survey/Surveys";
import SurveyManagement from "./pages/survey/SurveyManagement";
import SurveyRegist from "./pages/survey/SurveyRegist";
import SurveyUpdate from "./pages/survey/SurveyUpdate";

import HrmLayout from "./layouts/HrmLayout";
import Hrm from "./pages/hrm/Hrm";
import HrmDetail from './pages/hrm/HrmDetail';
import HrmModify from './pages/hrm/HrmModify';
import HrmSignup from './pages/hrm/HrmSignup';

import AttendanceLayout from './layouts/AttnedanceLayout';
import Attendance from './pages/attendance/Attendance';
import AttendanceModify from './pages/attendance/AttnedanceModify';
import AttendanceDetail from './pages/attendance/AttendanceDetail';
import VacationDetail from './pages/attendance/VacationDetail';

import MailLayout from "./layouts/MailLayout";
import Inbox from './pages/mail/Inbox';
import Sent from './pages/mail/Sent';
import Spam from './pages/mail/Spam';
import Trash from './pages/mail/Trash';
// import Statistics from './pages/mail/Statistics';
import Compose from './pages/mail/Compose';
import MailDetail from './pages/mail/MailDetail';

import ReportLayout from "./layouts/ReportLayout";
import ReportsSummary from "./pages/report/ReportSummary";
import ReportCreate from "./pages/report/ReportCreate";
import RoutineReports from "./pages/report/RoutineReports";
import CasualReports from "./pages/report/CasualReports";
import CasualReportDetail from "./pages/report/CasualReportDetail";
import ReportRounds from "./pages/report/ReportRounds";
import ReportRoundDetail from "./pages/report/ReportRoundDetail";

import WorklogLayout from "./layouts/WorklogLayout";
import DayWorklogs from "./pages/worklog/DayWorklogs";
import DayWorklogDetail from "./pages/worklog/DayWorklogDetail";
import DayWorklogInsert from "./pages/worklog/DayWorklogInsert";
import WeekWorklogs from "./pages/worklog/WeekWorklogs";
import WeekWorklogDetail from "./pages/worklog/WeekWorklogDetail";
import WeekWorklogInsert from "./pages/worklog/WeekWorklogInsert";

import MessengerList from "./pages/messenger/MessengerList";
import MessengerLayout from "./layouts/MessengerLayout";
import ChatRoom from "./components/form/messenger/ChatRoom";


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
              <Route path="mails" element={<MailLayout />}>
                <Route index element={<Inbox />} />
                <Route path="sent" element={<Sent />} />
                <Route path="spam" element={<Spam />} />
                <Route path="trash" element={<Trash />} />
                {/* <Route path="statistics" element={<Statistics />} /> */}
                <Route path="compose" element={<Compose />} />
                <Route path=":folder/:id" element={<MailDetail />} />
              </Route>
              <Route path="reports" element={<ReportLayout/>}>
                <Route path="routines" element={<RoutineReports/>}/>
                <Route path=":reportCode/rounds" element={<ReportRounds/>}/>
                <Route path="casuals" element={<CasualReports/>}/>
                <Route path="summary" index element={<ReportsSummary/>}/>
                <Route path="edit" element={<ReportCreate/>}/>
                <Route path="casuals/:reportCode" element={<CasualReportDetail/>}/>
                <Route path="edit" element={<ReportCreate/>}/>
                <Route path=":reportCode/rounds/:roundCode" element={<ReportRoundDetail/>}/>
              </Route>
              <Route path="reservation" element={<ReservationLayout />}>
                <Route index element={<MyReservation/>}/>
                <Route index element={<MyReservation/>}/>
                <Route path="my-reservation" element={<MyReservation />} />
                <Route path="assets/:assetCode" element={<ReservationCalendar />} />
                <Route path="asset-management" element={<ReservationAssetManagement/>}/>
                <Route path="assets/:assetCode" element={<ReservationCalendar />} />
              </Route>
              <Route path="approval" element={<ApprovalLayout />}>
                <Route index="approvals" element={<Approvals />} />
                <Route index path="pending" element={<Pending />} />
                <Route index path="waiting" element={<ApprovalWait />} />
                <Route index path="waiting" element={<ApprovalWait />} />
                <Route index path="draft" element={<ApprovalDraft />} />
                <Route index path="detail/:appCode" element={<ApprovalDetail />} />
                <Route index path="form/:docCode" element={<DraftForm />} />
              </Route>
              <Route path="hrm" element={<HrmLayout/>}>
                <Route index element={<Hrm/>}/>
                <Route path="list" element={<Hrm category='인사 목록'/>}/>
                <Route path="hrm-detail/:memberCode" element={<HrmDetail category='인사 정보'/>}/>
                <Route path="hrm-modify" element={<Hrm category='인사 수정'/>}/>
                <Route path="hrm-modify/:memberCode" element={<HrmModify category='인사 수정'/>}/>
                <Route path="hrm-regist" element={<HrmSignup category='인사 등록'/>}/>
              </Route>
              <Route path="worklog" element={<WorklogLayout/>}>
                <Route path="day" element={<DayWorklogs/>}/>
                <Route path="day/:dayWorklogCode" element={<DayWorklogDetail/>}/>
                <Route path="day/insert" element={<DayWorklogInsert/>}/>
                <Route path="week" element={<WeekWorklogs/>}/>
                <Route path="week/:weekWorklogCode" element={<WeekWorklogDetail/>}/>
                <Route path="week/insert" element={<WeekWorklogInsert/>}/>
              </Route>
              <Route path="attendance" element={<AttendanceLayout/>}>
                <Route index element={<Attendance/>}/>
                {/* <Route path="list" element={<Attendance category='인사 목록'/>}/> */}
                <Route path="attendance-detail/:memberCode" element={<AttendanceDetail category='근태 현황'/>}/>
                <Route path="attendance-modify" element={<AttendanceModify category='근태 수정'/>}/>
             {/* <Route path="attendance-modify/:memberCode" element={<AttendanceModify category='근태 수정'/>}/> */}
                <Route path="vacation-detail/:memberCode" element={<VacationDetail category='휴가 현황'/>}/>
              </Route>
              <Route path="survey" element={<SurveyLayout/>}>
                <Route path="list" element={<Surveys/>}/>
                <Route path="survey-management" element={<SurveyManagement/>}/>
                <Route path="survey-management/regist" element={<SurveyRegist/>}/>
                <Route path="survey-management/update/:surveyCode" element={<SurveyUpdate/>}/>
              </Route>
              <Route path="messenger" element={<MessengerLayout />}>
                <Route index="messengers" element={<MessengerList />} />
                <Route index path="detail/:roomNum" element={<ChatRoom />} />
              </Route>
              <Route path="calendar" element={<ScheduleLayout/>}>
                <Route path="month" element={<Schedules/>}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
