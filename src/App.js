import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddBookLayout from "./layouts/AddBookLayout";
import Main from "./pages/Main";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path="address-book">
          <Route index element={<AddBookLayout/>}/>
        </Route>
      </Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
