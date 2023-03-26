import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddBookLayout from "./layouts/AddBookLayout";
import Main from "./pages/Main";
import Approvals from "./pages/Approvals";
import ApprovalLayout from "./layouts/ApprovalLayout";
import Pending from "./pages/Pending";
import Addresses from "./pages/addBook/Addresses";


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path="address-book" element={<AddBookLayout/>}>
          <Route index path="addresses" element={<Addresses category='전체 주소록'/>}/>
          <Route index path="personal-groups/:groupCode" element={<Addresses category='개인 주소록'/>}/>
          <Route index path="team-groups/:groupCode" element={<Addresses category='공용 주소록'/>}/>
        </Route>
        <Route path="approval" element={<ApprovalLayout/>}>
          <Route index="approvals" element={<Approvals/>}/>
          <Route index path="pending" element={<Pending/>}/>
        </Route>
      </Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
