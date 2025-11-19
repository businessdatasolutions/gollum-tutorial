import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '../types';

interface Props {
  data: ChartData[];
}

const OptimizationChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <h3 className="font-bold text-slate-800 mb-4">Optimization Efficiency (Top 5% Coverage)</h3>
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
            label={{ value: '% Top Yields Found', angle: -90, position: 'insideLeft' }} 
            stroke="#64748b"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="top" height={36}/>
          <Line 
            type="monotone" 
            dataKey="staticLLM" 
            name="Static LLM (Baseline)" 
            stroke="#94a3b8" 
            strokeWidth={2} 
            dot={false} 
          />
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
  );
};

export default OptimizationChart;