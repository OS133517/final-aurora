import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddBookLayout from "./layouts/AddBookLayout";
import ReservationLayout from "./layouts/ReservationLayout";
import Login from "./pages/Login";
import Addresses from "./pages/addBook/Addresses";
import Main from "./pages/Main";

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
          <Route path="reservation" element={<ReservationLayout/>}>
            {/* <Route index ele */}
          </Route>
        </Route>
      </Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
