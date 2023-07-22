import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import 'dayjs/locale/id';

function Chart() {
  const [updatedData, setUpdatedData] = useState([])
  const { loading, kategori, statistikData } = useSelector(state => state.statistik)
  var lowest = Number.POSITIVE_INFINITY;
  var highest = Number.NEGATIVE_INFINITY;

  useEffect(() => {
    dayjs.locale('id');

    const monthOrder = Array.from({ length: 12 }, (_, monthIndex) =>
      dayjs().month(monthIndex).format('MMMM')
    );

    const filteredBulanan = Object?.values(statistikData.bulanan || {})
      .reduce((acc, entry) => {
        const dateParts = entry.date.split("-");
        const month = parseInt(dateParts[1], 10);
        const monthName = dayjs().month(month - 1).format('MMMM');

        if (acc[monthName]) {
          acc[monthName].count += entry.count;
        } else {
          acc[monthName] = { date: monthName, count: entry.count };
        }
        return acc;
      }, {});

    const sortedBulanan = monthOrder.map((monthName) => {
      const count = filteredBulanan[monthName] ? filteredBulanan[monthName].count : 0;
      return { date: monthName, count };
    });

    let currentStatistik = [];

    if (kategori === 'Minggu') {
      let weekTemplate = [
        { date: "Senin", count: 0 },
        { date: "Selasa", count: 0 },
        { date: "Rabu", count: 0 },
        { date: "Kamis", count: 0 },
        { date: "Jumat", count: 0 },
        { date: "Sabtu", count: 0 },
        { date: "Minggu", count: 0 },
      ]

      currentStatistik = weekTemplate.map((item) => {
        const count = statistikData.mingguan?.find((data) => dayjs(data.date).format('dddd') === item.date)?.count || 0
        return {
          date: item.date,
          count
        }
      })

    } else {
      currentStatistik = sortedBulanan
    }

    setUpdatedData(currentStatistik?.map((item) => {
      return {
        jumlah: item.count,
        date: item.date,
      }
    }))
  }, [kategori, statistikData])

  useEffect(() => {
    var tmp;

    for (var i = updatedData?.length - 1; i >= 0; i--) {
      tmp = updatedData[i]?.count;
      if (tmp < lowest) lowest = tmp;
      if (tmp > highest) highest = tmp;
    }
  }, [updatedData])

  return (
    <>
      {loading ? <div className='empty__container skeleton__loading'></div>
        : updatedData?.length < 1 || updatedData == undefined ? <div className='empty__container'>Data tidak ada</div>
          : <ResponsiveContainer width={775} height={300}>
            <LineChart
              data={updatedData}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="1" />
              <XAxis
                dataKey={'date'}
                style={{ fontSize: 10, fill: '#9B9B9B' }}
                stroke='#F0F0F0'
              />

              <YAxis domain={[lowest, highest]}
                dataKey="jumlah"
                tickCount={
                  Math.max(...updatedData.map((item) => (item.jumlah < 7 ? item.jumlah : 8)))
                }
                tickFormatter={(tick) => tick.toFixed(0)}
                padding={{ top: 10 }}
                tickSize={12}
                style={{ fontSize: 10, fill: '#9B9B9B' }}
                stroke='#F0F0F0'
              />

              <Tooltip />
              <Line type="monotone" dataKey="jumlah" stroke="#3661EB" strokeWidth='2px' dot={{ strokeWidth: 2, fill: '#3661EB', stroke: '#3661EB' }} />
            </LineChart>
          </ResponsiveContainer>
      }
    </>
  )
}

export default Chart