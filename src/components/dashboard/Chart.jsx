import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApiDashboardStatistik } from '../../contexts/api/dashboard/ApiDashboardStatistik';
import { useSelector } from 'react-redux';
import { statistikDummyData } from '../../datas/statistikDummyData';

function Chart({ data }) {
  const context = useApiDashboardStatistik()
  const [updatedData, setUpdatedData] = useState(null)
  const { loading, kategori } = useSelector(state => state.statistik)

  const mingguanData = statistikDummyData.data.mingguan;
  const bulananData = statistikDummyData.data.bulanan;

  var lowest = Number.POSITIVE_INFINITY;
  var highest = Number.NEGATIVE_INFINITY;
  var tmp;

  useEffect(() => {
    let currentStatistik;
    if (kategori === 'Minggu') {
      currentStatistik = mingguanData
    } else {
      currentStatistik = bulananData
    }

    setUpdatedData(currentStatistik?.map((item) => {
      return {
        ...item,
        date: kategori === 'Minggu' ? dayjs(item.date).format('dddd') : item.date
      }
    }))
  }, [kategori])

  useEffect(() => {
    for (var i = updatedData?.length - 1; i >= 0; i--) {
      tmp = updatedData[i]?.count;
      if (tmp < lowest) lowest = tmp;
      if (tmp > highest) highest = tmp;
    }
  }, [updatedData])

  const loadingChart = [
    {
      loading: 'loading'
    }
  ]

  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart
        // data={loading ? updatedData : loadingChart}
        data={updatedData}
        // width={500}
        // height={300}
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
          // tickCount={data?.length < 8 ? data?.length : 8}
          tickCount={updatedData?.length < 8 ? updatedData?.length : 8}
          tickFormatter={(tick) => tick.toFixed(0)}
          padding={{ top: 10 }}
          tickSize={12}
          style={{ fontSize: 10, fill: '#9B9B9B' }}
          stroke='#F0F0F0'
        />

        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#3661EB" dot={{ strokeWidth: 3, fill: '#3661EB', stroke: '#3661EB' }} />
        {/* <Line type="monotone" dataKey="karyawan" stroke="#C2D2FF" strokeWidth={2} dot={{ strokeWidth: 2, fill: '#C2D2FF', stroke: '#C2D2FF' }} /> */}
        {/* <Line type="monotone" dataKey="Staff" stroke="#3661EB" strokeWidth={2} dot={{ strokeWidth: 2, fill: '#3661EB', stroke: '#3661EB' }} /> */}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart