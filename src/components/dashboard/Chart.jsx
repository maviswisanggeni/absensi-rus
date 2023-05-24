import dayjs from 'dayjs';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useApiDashboardStatistik } from '../../contexts/api/dashboard/ApiDashboardStatistik';
import { useSelector } from 'react-redux';

function Chart({ data }) {
  const context = useApiDashboardStatistik()

  const { loading } = useSelector(state => state.statistik)

  var lowest = Number.POSITIVE_INFINITY;
  var highest = Number.NEGATIVE_INFINITY;
  var tmp;
  for (var i = data?.length - 1; i >= 0; i--) {
    tmp = data[i]?.count;
    if (tmp < lowest) lowest = tmp;
    if (tmp > highest) highest = tmp;
  }

  const updatedData = data?.map((item) => {
    return {
      ...item,
      date: dayjs(item.date).format('dddd')
    }
  })

  const loadingChart = [
    {
      loading: 'loading'
    }
  ]

  return (
    <LineChart
      data={loading ? updatedData : loadingChart}
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
      <XAxis
        dataKey={loading ? 'date' : 'loading'}
        style={{ fontSize: 10, fill: '#9B9B9B' }}
        stroke='#F0F0F0'
      />
      <YAxis domain={[lowest, highest]}
        dataKey="count"
        tickCount={data?.length < 8 ? data?.length : 8}
        tickFormatter={(tick) => tick.toFixed(0)}
        padding={{ top: 10 }}
        tickSize={12}
        style={{ fontSize: 10, fill: '#9B9B9B' }}
        stroke='#F0F0F0'
      />
      <Tooltip />
      <Line type="monotone" dataKey="count" stroke="#C2D2FF" dot={{ strokeWidth: 2, fill: '#C2D2FF', stroke: '#C2D2FF' }} />
      {/* <Line type="monotone" dataKey="karyawan" stroke="#C2D2FF" strokeWidth={2} dot={{ strokeWidth: 2, fill: '#C2D2FF', stroke: '#C2D2FF' }} /> */}
      {/* <Line type="monotone" dataKey="Staff" stroke="#3661EB" strokeWidth={2} dot={{ strokeWidth: 2, fill: '#3661EB', stroke: '#3661EB' }} /> */}
    </LineChart>
  )
}

export default Chart