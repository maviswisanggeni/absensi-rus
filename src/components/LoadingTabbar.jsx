import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function LoadingTabbar({ amount }) {
    return (
        <div className='wrapper__tabbar'>
            <div className='list__text__skeleton'>
                {Array.from({ length: amount }, (_, index) => (
                    <Skeleton
                        key={index}
                        width={75}
                        height={25}
                    />
                ))}
            </div>

            <div className='right__square'></div>
            <Skeleton
                width={100}
                height={25}
            />
        </div>
    )
}

export default LoadingTabbar