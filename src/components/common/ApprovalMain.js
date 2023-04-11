import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Approvals from '../../pages/approval/Approvals';
import Completed from '../../pages/approval/Completed';
import Pending from '../../pages/approval/Pending';
import ApprovalMainCSS from './ApprovalMain.module.css'

function ApprovalMain() {
    /** useNavigate */
    const navigate = useNavigate();
    /** useState */
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [draftComponent, setDraftComponent] = useState(null);

    /** 사용자 지정 변수 */
    const approval = ["전체", "결재 진행", "결재 완료"];

    /** useEffect */
    useEffect(() => {
        const storedIndex = localStorage.getItem('selectedIndex');
        if (storedIndex !== null) {
            const index = parseInt(storedIndex, 10);
            EventHandler(index);
        }
        //eslint-disable-next-line
    }, [])

    /** 이벤트 핸들러 */
    const EventHandler = (i) => {
        setSelectedIndex(i);
        // 클릭 유무를 저장하기 위해 localStorage에 저장
        localStorage.setItem('selectedIndex', i);
        switch (i) {
            // 각 화면하다 뿌려지는 컴포넌트를 변경
            case 0: return setDraftComponent(<Approvals />);
            case 1: return setDraftComponent(<Pending />);
            case 2: return setDraftComponent(<Completed />);
            default: return draftComponent;
        }
    }
    return (
        <div className={ApprovalMainCSS.boxWrapper2}>
            <div className={ApprovalMainCSS.Box2}>
                <div className={ApprovalMainCSS.header}>
                    <div onClick={() => navigate("/aurora/approval")} style={{ cursor: "pointer" }}>
                        결재
                    </div>
                </div>
                <div className={ApprovalMainCSS.ulBox}>
                    <ul>
                        {approval.map((app, i) => (
                            <li key={i} className={selectedIndex === i ? ApprovalMainCSS.draftClickList : ApprovalMainCSS.draftList}
                                onClick={() => EventHandler(i)}>
                                {app}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={ApprovalMainCSS.graphDiv}>
                    <div className={ApprovalMainCSS.viewDiv}>
                        {
                            draftComponent
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ApprovalMain;