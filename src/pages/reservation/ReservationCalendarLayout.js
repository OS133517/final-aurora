import { Outlet, useParams } from "react-router-dom";
import ReservationCalendar from "./ReservationCalendar";

function ReservationCalendarLayout() {

   

    return (
        <>
            <ReservationCalendar assetCode={assetCode}/>
            <Outlet/>
        </>
    );
}

export default ReservationCalendarLayout;