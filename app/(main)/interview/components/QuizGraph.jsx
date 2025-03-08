'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function QuizGraph({ assessments }) {
  return (
    <div className="w-full h-fit space-y-2">
        <h1 className='text-3xl md:text-5xl text-center w-full '>Performance<span className='text-purple-500'>Trends</span></h1>
        <p className='text-center text-sm text-muted-foreground'>Your quiz score over time</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={assessments}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="quizScore" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default QuizGraph;
