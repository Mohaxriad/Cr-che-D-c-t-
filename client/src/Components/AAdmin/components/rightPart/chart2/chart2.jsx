import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import InvestmentsDB from '../../leftPart/utils/InvestmentsDB';

const Graph4 = () => {
  const chartRef = useRef(null);
  const { TopCreches } = InvestmentsDB();
  const nomCreches = TopCreches.map((item) => item.name);
  const noteEvaluation = TopCreches.map((item) => item.noteEvaluation);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const data = {
      labels: nomCreches,
      datasets: [
        {
          label: 'Note d\'évaluation',
          data: noteEvaluation,
          backgroundColor: 'rgba(251, 98, 79, 0.3)',
          borderColor: 'rgba(251, 98, 79, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    return () => chart.destroy();
  }, [nomCreches, noteEvaluation]);

  return <canvas ref={chartRef} id="graph4"></canvas>;
};

export default Graph4;
