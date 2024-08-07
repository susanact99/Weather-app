import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SunCurveChart = ({ sunrise, sunset, currentTime }) => {
  const formatTime = (time) => {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const createNormalDistribution = (sunrise, sunset) => {
    const data = [];
    const mean = (sunrise + sunset) / 2;
    const variance = Math.pow((sunset - sunrise) / 6, 2);

    for (let time = sunrise; time <= sunset; time += 3600) {
      const y = (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(time - mean, 2) / (2 * variance));
      data.push({ x: formatTime(time), y });
    }

    return data;
  };

  const sunData = createNormalDistribution(sunrise, sunset);

  const data = {
    labels: sunData.map((point) => point.x),
    datasets: [
      {
        label: 'Sun Path',
        data: sunData.map((point) => point.y),
        fill: false,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        tension: 0.1,
      },
      {
        label: 'Current Time',
        data: sunData.map((point) => {
          const time = new Date(`1970-01-01T${point.x}:00Z`).getTime() / 1000;
          if (currentTime >= time && currentTime < time + 3600) {
            return point.y;
          }
          return null;
        }),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white', // Set legend text color to white
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Set X-axis tick color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Set X-axis grid color to white with transparency
        },
      },
      y: {
        ticks: {
          color: 'white', // Set Y-axis tick color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Set Y-axis grid color to white with transparency
        },
      },
    },
  };

  return (
    <div>
      <h2>Sunrise and Sunset Curve</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SunCurveChart;
