import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);



const AttendanceDoughnut = ({ attendanceStatus }) => {
    const data = {
      labels: ['지각', '결근', '조퇴', '무단결근'],
      datasets: [
        {
          data: [
            attendanceStatus?.TARDY || 0,
            attendanceStatus?.ABSENCE || 0,
            attendanceStatus?.EARLY_OFF || 0,
            attendanceStatus?.TRUANCY || 0,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A'],
        },
      ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right',
        },
      };
  
    return <Doughnut data={data} options={options} />;
  };
  
  export default AttendanceDoughnut;