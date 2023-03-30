import { Outlet, useParams } from "react-router-dom";
import ReservationCalendar from "../pages/reservation/ReservationCalendar";

function ReservationCalendarLayout() {

    const {assetCode} = useParams();

    return (
        <>
            <ReservationCalendar assetCode={assetCode}/>
            <Outlet/>
        </>
    );
}

export default ReservationCalendarLayout;