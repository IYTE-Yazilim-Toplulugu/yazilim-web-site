'use client';
import { useEffect, useState } from 'react';

import SurveyPieChart from '@/components/survey-pie-chart';
import { StatsResponse } from '@/types/types';
import { StatsPOSTData } from '@/lib/pseudo';


function processSurveyData(responses: Array<StatsResponse>) {
  const counts: Record<string, number> = {};
  responses.forEach((response) => {
    counts[response.answer] = (counts[response.answer] || 0) + 1;
  });

  const labels = Object.keys(counts);
  const data = Object.values(counts);

  return { labels, data };
}

export default function Stats() {
  const [chartData, setChartData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
  useEffect(() => {
    console.log("Processing survey data...");
   
    const processedData = processSurveyData(StatsPOSTData);
   
    setChartData(processedData);

   
    return () => {
    };

  }, []);

  return (
    <div>
      <h1>Anket İstatistikleri</h1>
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        {chartData && chartData.data.length > 0 ? (
          <SurveyPieChart chartData={chartData} />
          
        ) : (
          <p>Gösterilecek anket verisi bulunamadı.</p>
        )}
      </div>
    </div>
  );
}
