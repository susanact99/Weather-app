import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SunCurveChart = ({ sunrise, sunset, currentTime }) => {
  const formatTime = (time) => {
    const date = new Date(time * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const createNormalDistribution = (sunrise, sunset) => {
    const data = [];
    const mean = (sunrise + sunset) / 2;
    const variance = Math.pow((sunset - sunrise) / 6, 2);

    for (let time = sunrise; time <= sunset; time += 3600) {
      const y = (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(time - mean, 2) / (2 * variance));
      data.push({ x: formatTime(time), y, time });
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
          const timeDiff = Math.abs(currentTime - point.time);
          return timeDiff < 1800 ? point.y : null;  // Tolerancia de 30 minutos
        }),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 5,
        showLine: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      y: {
        ticks: {
          display: false, // Ocultar los valores del eje Y
        },
        grid: {
          display: false, // Ocultar las líneas de la cuadrícula del eje Y
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
