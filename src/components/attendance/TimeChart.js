import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import { Chart, BarController, LinearScale, CategoryScale, BarElement, Tooltip, Legend } from "chart.js";

Chart.register(BarController, LinearScale, CategoryScale, BarElement, Tooltip, Legend);


export default function TimeChart({ hours, hours2}) {

    const getCurrnetHour = () => {
        return new Date().getHours();
    };

    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
      const updateGraphData = () => {
        const newGraphData = Array.from({ length: 1 }, (_, i) => {
            const currentHour = getCurrnetHour();

            

            if (hours && hours2) {
                return (parseInt(hours2) - parseInt(hours) )+parseInt(hours);
              } else if (hours) {

                console.log("hours", hours);
                console.log("currentHour", currentHour);
                return currentHour - parseInt(hours)+parseInt(hours);
                
              } else {
                return 0;
              }
            });

        setGraphData(newGraphData);
      }; 

      updateGraphData();

      const intervalld = setInterval(updateGraphData, 60 * 10000);

      return () => {
        clearInterval(intervalld);    
      };
    }, [hours, hours2]);

    const data = {
        labels: ["근무 시간"],
        datasets: [
          {
            label: "시간",
            data: graphData,
            backgroundColor: "rgba(0,163,124,1)",
            borderColor: "rgba(0,163,124,1)",
            borderWidth: 0.1,
            barThickness: 50, // 여기에 원하는 너비를 설정하세요.
           
          },
        ],
      };

    const options = {
        indexAxis: 'y', // 그래프 수평 막대
        scales: {
            y: {
              type: "category",
              barPercentage: 0.2,
              
            },
            x: {
                type: "linear",
                beginAtZero: false, // x축 시작점을 출근 시간으로 변경합니다.
                min:  parseInt(hours),
                max: hours2 ? parseInt(hours2) + 1 : parseInt(hours) + 8,
                ticks: {
                  stepSize: 1,
                  callback: (value) => `${value}:00`,
              },
            },
          },
        };
   

      return <Bar data={data} options={options} />;
    };
