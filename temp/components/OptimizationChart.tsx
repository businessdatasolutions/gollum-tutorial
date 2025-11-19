
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '../types';

interface Props {
  data: ChartData[];
}

const OptimizationChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800">Optimization Efficiency (Top 5% Coverage)</h3>
      </div>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="iteration" 
              label={{ value: 'Experiments Ran', position: 'insideBottomRight', offset: -5 }} 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              scale="linear"
              domain={[0, 'auto']}
              label={{ value: 'Top 5% Coverage (%)', angle: -90, position: 'insideLeft' }} 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(val) => val.toFixed(0)}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Coverage']}
              labelFormatter={(label) => `Iteration ${label}`}
            />
            <Legend verticalAlign="top" height={36}/>
            {/* Baseline - Orange to match paper visuals roughly */}
            <Line 
              type="monotone" 
              dataKey="staticLLM" 
              name="Static LLM (Baseline)" 
              stroke="#f97316" 
              strokeWidth={2} 
              dot={false} 
              strokeDasharray="5 5"
            />
            {/* GOLLuM - Purple */}
            <Line 
              type="monotone" 
              dataKey="gollum" 
              name="GOLLuM (Ours)" 
              stroke="#7c3aed" 
              strokeWidth={3} 
              activeDot={{ r: 6 }} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[10px] text-slate-400 mt-2 text-right italic border-t border-slate-100 pt-2">
        Source: Ranković & Schwaller (2025), Figure 14 & Abstract (24% vs 43%).
      </p>
    </div>
  );
};

export default OptimizationChart;