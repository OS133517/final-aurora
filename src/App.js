import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddBookLayout from "./layouts/AddBookLayout";
import Main from "./pages/Main";
import Addresses from "./pages/Addresses";
import Approvals from "./pages/Approvals";
import ApprovalLayout from "./layouts/ApprovalLayout";
import Pending from "./pages/Pending";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path="address-book" element={<AddBookLayout/>}>
          <Route index="/addresses" element={<Addresses/>}/>
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
