'use client';

import SurveyPieChart from '@/components/survey-pie-chart';
import { useEffect, useState } from 'react';

interface SurveyResponse {
  id: number;
  answer: string; // Varsa diğer özellikleri de ekleyebilirsiniz
}
const surveyResponses = [
  { id: 1, answer: 'Evet' },
  { id: 2, answer: 'Hayır' },
  { id: 3, answer: 'Evet' },
  { id: 4, answer: 'Evet' },
  { id: 5, answer: 'Belki' },
  { id: 6, answer: 'Hayır' },
  { id: 7, answer: 'Evet' },
  // ... daha fazla cevap
];
// Veriyi işleyip sayımları yapacak bir fonksiyon
function processSurveyData(responses: Array<SurveyResponse>) {
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
    console.log("useEffect çalıştı: Anket verisi işleniyor.");
   
    const processedData = processSurveyData(surveyResponses);
   
    setChartData(processedData);

   
    return () => {
      console.log("useEffect cleanup çalıştı.");
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
