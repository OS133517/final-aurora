import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddBookLayout from "./layouts/AddBookLayout";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index="home"/>
        <Route path="address-book" element={<AddBookLayout/>}/>
      </Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
