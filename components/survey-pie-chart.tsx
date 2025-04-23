// components/SurveyPieChart.js (veya ilgili dosyanız)
"use client";

import React from 'react';
// Gerekli türleri chart.js'den import edin
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem, // Tooltip context'i için tür
  ChartOptions  // options nesnesi için tür (önerilir)
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Önceki interface/type tanımlamaları (varsa)
interface ChartData {
  labels: string[];
  data: number[];
}

interface SurveyPieChartProps {
  chartData: ChartData;
}

// Chart.js elementlerini kaydet
ChartJS.register(ArcElement, Tooltip, Legend);

function SurveyPieChart({ chartData }: SurveyPieChartProps) {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: '# of Votes',
        data: chartData.data,
        backgroundColor: [ /* ... renkler ... */ ],
        borderColor: [ /* ... kenarlık renkleri ... */ ],
        borderWidth: 1,
      },
    ],
  };

  // options nesnesinin türünü belirtmek daha güvenlidir
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Anket Cevap Dağılımı',
      },
      tooltip: {
        callbacks: {
          // context parametresine TooltipItem<'pie'> türünü atayın
          label: function(context: TooltipItem<'pie'>) {
            // context.label artık güvenli bir şekilde string | undefined türündedir
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            // context.parsed artık güvenli bir şekilde number | null türündedir
            // (veya kullandığınız Chart.js sürümüne göre number | undefined)
            if (context.parsed !== null && context.parsed !== undefined) {
              // Yüzde hesaplama örneği (daha güvenli hale getirildi)
              // const dataset = context.chart.data.datasets[context.datasetIndex];
              // if (dataset && dataset.data) {
              //   const total = dataset.data.reduce((acc: number, val) => {
              //     // null/undefined kontrolü ekleyerek daha sağlam hale getirin
              //     const numVal = typeof val === 'number' ? val : 0;
              //     return acc + numVal;
              //   }, 0);
              //   if (total > 0) {
              //      const percentage = ((context.parsed / total) * 100).toFixed(1) + '%';
              //      label += context.parsed + ' (' + percentage + ')';
              //   } else {
              //      label += context.parsed + ' oy';
              //   }
              // } else {
              //    label += context.parsed + ' oy';
              // }
               label += context.parsed + ' oy'; // Basit hali
            }
            return label;
          }
        }
      }
    },
    // Diğer options ayarları...
  };

  return <Pie data={data} options={options} />;
}

export default SurveyPieChart;