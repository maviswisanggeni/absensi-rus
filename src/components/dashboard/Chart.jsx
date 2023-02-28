import dayjs from 'dayjs';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useApiDashboardStatistik } from '../../contexts/api/dashboard/ApiDashboardStatistik';

function Chart(props) {
  const context = useApiDashboardStatistik()
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

  const updatedData = props.data?.map((item) => {
    return {
      ...item,
      date: dayjs(item.date).format('dddd')
    }
  })

  const loading = [
    {
      loading: 'loading'
    }
  ]

  return (
    <LineChart
      data={context.loading ? updatedData : loading}
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
      <XAxis dataKey={context.loading ? 'date' : 'loading'}
       style={{ fontSize: 12 }} />
      <YAxis domain={[lowest, highest]} 
      dataKey="count"
      tickCount={props.data?.length < 8 ? props.data?.length : 8} 
      tickFormatter={(tick) => tick.toFixed(0)}
      padding={{ top: 10 }} tickSize={12} style={{ fontSize: 12 }} />
      <Tooltip />
      <Line type="monotone" dataKey="count" stroke="#C2D2FF" dot={{ strokeWidth: 2, fill: '#C2D2FF', stroke: '#C2D2FF' }} />
    </LineChart>
  )
}

export default Chart