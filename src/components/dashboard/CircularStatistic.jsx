import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

function CircularStatistic({ name, firstValue, secondValue, uiValue, imgSrc, loading }) {
  const percentage = (firstValue / secondValue) * 100;

  return (
    <div className='card-circular-statistic'>
      <div style={{ width: 60, height: 60 }}>
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathColor: `#3661EB`,
            trailColor: `none`,
          })}
        >
          <img src={imgSrc} alt="" style={{ width: 45, height: 45 }} />
        </CircularProgressbarWithChildren>
      </div>
      <div className='wrapper-value'>
        <p className='p1'>{name}</p>
        {loading && firstValue !== undefined
          ? <p className='p2'>{uiValue}</p>
          : <div className='dots loading'></div>
        }
      </div>
    </div>
  )
}

export default CircularStatistic