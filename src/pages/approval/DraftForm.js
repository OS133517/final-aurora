import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EarlyWithdrawal from "../../components/form/approval/EarlyWithdrawal";
import LeaveApplication from "../../components/form/approval/LeaveApplication";
import LetterOfApproval from "../../components/form/approval/LetterOfApproval";
import MeetingReports from "../../components/form/approval/MeetingReports";
import ParentalLeave from "../../components/form/approval/ParentalLeave";
import Resignation from "../../components/form/approval/Resignation";
import SickLeave from "../../components/form/approval/SickLeave";
import WorkRequest from "../../components/form/approval/WorkRequest";

function DraftForm() {

    const param = useParams();
    const [draftComponent, setDraftComponent] = useState(null);

    useEffect(() => {
        const num = Number(param.docCode);
        console.log('num', typeof num);
        switch (param.docCode) {
            case 0:
                setDraftComponent(<WorkRequest />);
                break;
            case 1: setDraftComponent(<Resignation />);
                break;
            case 2: setDraftComponent(<SickLeave />);
                break;
            case 3: setDraftComponent(<ParentalLeave />);
                break;
            case 4: setDraftComponent(<MeetingReports />);
                break;
            case 5: setDraftComponent(<EarlyWithdrawal />);
                break;
            case 6: setDraftComponent(<LetterOfApproval />);
                break;
            case 7: setDraftComponent(<LeaveApplication />);
                break;
            default:
                break;

        }
        //eslint-disable-next-line
    }, []);

    return (
        <>
            {draftComponent}
        </>
    )
}

export default DraftForm;