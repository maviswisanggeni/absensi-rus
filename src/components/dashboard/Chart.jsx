import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Chart(props) {
  const data = [
    {
      name: 'Kamis',
      karyawan: 302,
      Staff: 298,
      amt: 298,
    },
    {
      name: 'Jumat',
      karyawan: 304,
      Staff: 302,
      amt: 302,
    },
    {
      name: 'Sabtu',
      karyawan: 299,
      Staff: 297,
      amt: 297,
    },
    {
      name: 'Senin',
      karyawan: 301,
      Staff: 294,
      amt: 294,
    },
    {
      name: 'Selasa',
      karyawan: 304,
      Staff: 293,
      amt: 293,
    },
    {
      name: 'Rabu',
      karyawan: 294,
      Staff: 299,
      amt: 294,
    },
  ];

  var lowest = Number.POSITIVE_INFINITY;
  var highest = Number.NEGATIVE_INFINITY;
  var tmp;
  for (var i = props.data?.length - 1; i >= 0; i--) {
    tmp = props.data[i]?.count;
    if (tmp < lowest) lowest = tmp;
    if (tmp > highest) highest = tmp;
  }

  return (
    <LineChart
      data={props.data}
      width={500}
      height={300}
      margin={{
        top: 5,
        right: 30,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="1" />
      {/* <XAxis dataKey="name" style={{fontSize: 12}}/> */}
      <XAxis dataKey="date" style={{ fontSize: 12 }} />
      <YAxis domain={[lowest, highest]} tickCount={8} padding={{ top: 10 }} tickSize={12} style={{ fontSize: 12 }} />
      <Tooltip />
      {/* <Legend /> */}
      <Line type="monotone" dataKey="karyawan" stroke="#C2D2FF" dot={{ strokeWidth: 2, fill: '#C2D2FF', stroke: '#C2D2FF' }} />
      {/* <Line type="monotone" dataKey="Staff" stroke="#3661EB" strokeWidth={2} dot={{ strokeWidth: 2, fill: '#3661EB' }}/> */}
    </LineChart>
  )
}

export default Chart