// import { useNavigate } from "react-router-dom";
// import DayWorklogCSS from './DayWorklog.module.css';

// function DayWorklog({ dayWorklog : { dayWorklogCode, dayReportingDate }}) {

//     const navigate = useNavigate();

//     const onClickDayWorklogHandler = (dayWorklogCode) => {
//         navigate(`/worklog/day/${ dayWorklogCode }`, { replace : false });
//     }

//     return (
//         <div
//             className={ DayWorklogCSS.dayWorklogDiv } 
//             onClick={ () => onClickDayWorklogHandler(dayWorklogCode) }   
//         >
//             <table>
//                 <thead>
//                     <tr>
//                         <td>
//                             작성일
//                         </td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>
//                         { DayWorklog.dayReportingDate }
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
         
//             {/* { dayWorklogCode }
//             { dayReportingDate } */}
//             {/* 허전하면 뭘 더 추가할까 */}
//         </div>
//     );
// }

// export default DayWorklog;