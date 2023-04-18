import { useState } from 'react';
import approvalDraftCSS from './Approvals.module.css'
import Resignation from '../../components/form/approval/Resignation'
import WorkRequest from '../../components/form/approval/WorkRequest'
import SickLeave from '../../components/form/approval/SickLeave';
import ParentalLeave from '../../components/form/approval/ParentalLeave';
import MeetingReports from '../../components/form/approval/MeetingReports';
import EarlyWithdrawal from '../../components/form/approval/EarlyWithdrawal';
import LetterOfApproval from '../../components/form/approval/LetterOfApproval';
import LeaveApplication from '../../components/form/approval/LeaveApplication';
import { useNavigate } from 'react-router-dom';

function ApprovalDraft() {

    // 결재서류 종류
    const document = ["업무협조요청서", "사직서", "병가휴직서", "육아휴직서", "회의보고서", "조퇴신청서", "품의서", "휴가신청서"];
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [draftComponent, setDraftComponent] = useState(null);
    const navigate = useNavigate();

    // 뒤로가는 버튼
    const backEvent = () => {
        window.history.back();
    }

    // 버튼클릭시 div - show documentForm 클래스 변경, draftList 옆에 버튼 생성
    const EventHandler = (i) => {
        setSelectedIndex(i);
        // setIsClick(true);
        switch (i) {
            // 각 화면하다 뿌려지는 컴포넌트를 변경
            case 0: return setDraftComponent(<WorkRequest />);
            case 1: return setDraftComponent(<Resignation />);
            case 2: return setDraftComponent(<SickLeave />);
            case 3: return setDraftComponent(<ParentalLeave />);
            case 4: return setDraftComponent(<MeetingReports />);
            case 5: return setDraftComponent(<EarlyWithdrawal />);
            case 6: return setDraftComponent(<LetterOfApproval />);
            case 7: return setDraftComponent(<LeaveApplication />);
            default: return draftComponent;
        }
    }
    // 이동
    const draftApproval = () => {
        const docCode = selectedIndex;
        console.log('num', docCode)
        if (docCode !== null) {
            navigate(`/aurora/approval/form/${docCode}`);
        }
    }



    return (
        <div className={approvalDraftCSS.draftBox}>
            <div className={approvalDraftCSS.buttonBox}>
                <button onClick={backEvent}>목록</button>
                <h2>결재서류 작성</h2>
            </div>
            <div className={approvalDraftCSS.draftView}>
                <ul className={approvalDraftCSS.draftUi}>
                    {
                        document.map((doc, i) => (
                            <li key={i} className={selectedIndex === i ? approvalDraftCSS.draftClickList : approvalDraftCSS.draftList} onClick={() => EventHandler(i)}>
                                {doc}
                            </li>
                        ))
                    }
                </ul>
                <div className={approvalDraftCSS.preview}>
                    <div className={approvalDraftCSS.draftInput}>
                        <button onClick={draftApproval}> 작성하기 </button>
                    </div>
                    <div className={approvalDraftCSS.draftPreview}>
                        {
                            draftComponent
                        }
                    </div>
                </div>
            </div>
        </div>

    )

}

export default ApprovalDraft;