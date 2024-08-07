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
      const x = time;
      const y = (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
      data.push({ x: formatTime(x), y });
    }

    return data;
  };

  if (sunrise === null || sunset === null) {
    return <div>Loading...</div>;
  }

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
          const time = sunrise + sunData.indexOf(point) * 3600;
          if (currentTime >= time && currentTime < time + 3600) {
            const mean = (sunrise + sunset) / 2;
            const variance = Math.pow((sunset - sunrise) / 6, 2);
            return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(time - mean, 2) / (2 * variance));
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

  return (
    <div>
      <h2>Sunrise and Sunset Curve</h2>
      <Line data={data} />
      <div>
        <label>Enter current time (HH:mm): </label>
        <input
          type="time"
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(':');
            const now = new Date();
            now.setHours(hours);
            now.setMinutes(minutes);
            setCurrentTime(Math.floor(now.getTime() / 1000));
          }}
        />
      </div>
    </div>
  );
};

export default SunCurveChart;
