import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

function CircularStatistic(props) {
  const percentage = 50;

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
        <img src={props.imgSrc} alt="" style={{width: 45, height: 45}}/>
        </CircularProgressbarWithChildren>
      </div>
      <div>
        <p>{props.name}</p>
        <p>{props.value}</p>
      </div>
    </div>
  )
}

export default CircularStatistic