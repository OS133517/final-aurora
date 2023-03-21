import AddBookLayoutCSS from "./AddBookLayout.module.css";
import AddBookSidebar from "../components/subSidebar/AddBookSidebar";

function AddBookLayout() {

    return (
        <div className={AddBookLayoutCSS.addBookLayout}>
            <AddBookSidebar/>
            <div>

            </div>
        </div>
    );
}

export default AddBookLayout;