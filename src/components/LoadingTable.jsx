import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function LoadingTable({ size }) {
    return (
        <>
            {size === 'small'
                ? <div className='wrapper__table'>
                    <div className='column__table'>
                        <Skeleton
                            height={20}
                            width={50}
                            borderRadius={5}
                            count={1}
                            style={{ marginRight: '5rem' }}
                        />

                        <Skeleton
                            height={20}
                            width={30}
                            borderRadius={5}
                            count={1}
                            style={{ marginRight: '3rem' }}
                        />

                        <Skeleton
                            height={20}
                            width={80}
                            borderRadius={5}
                            count={1}
                            style={{ marginRight: '9rem' }}
                        />

                        <Skeleton
                            height={20}
                            width={50}
                            borderRadius={5}
                            count={1}
                            style={{ marginRight: '2rem' }}
                        />

                        <Skeleton
                            height={20}
                            width={50}
                            borderRadius={5}
                            count={1}
                            style={{ marginRight: '2rem' }}
                        />
                    </div>


                    {Array.from({ length: 10 }, (_, index) => (
                        <div className='row__table' key={index}>
                            <Skeleton
                                height={35}
                                width={35}
                                borderRadius={'50%'}
                                circle={true}
                                count={1}
                                style={{ marginRight: '0.5rem' }}
                            />

                            <Skeleton
                                height={20}
                                width={100}
                                borderRadius={5}
                                count={1}
                                style={{ marginRight: '1.25rem' }}
                            />

                            <Skeleton
                                height={20}
                                width={50}
                                borderRadius={5}
                                count={1}
                                style={{ marginRight: '3.5rem' }}
                            />


                            <Skeleton
                                height={20}
                                width={100}
                                borderRadius={5}
                                count={1}
                                style={{ marginRight: '9.75rem' }}
                            />

                            <Skeleton
                                height={20}
                                width={70}
                                borderRadius={5}
                                count={1}
                                style={{ marginRight: '3rem' }}
                            />

                            <Skeleton
                                height={20}
                                width={70}
                                borderRadius={5}
                                count={1}
                                style={{ marginRight: '5rem' }}
                            />
                        </div>
                    ))}
                </div>

                : <div className='wrapper__table'>
                    <div className='column__table'>
                        <Skeleton
                            height={20}
                            width={50}
                            borderRadius={5}
                            count={1}
                            style={{ marginRight: '4rem' }}
                        />

                        <Skeleton
                            height={20}
                            width={75}
                            borderRadius={5}
                            count={1}
                            style={{ marginRight: '9.75rem' }}
                        />

                        <Skeleton
                            height={20}
                            width={100}
                            borderRadius={5}
                            count={1}
                            style={{ marginRight: '5.5rem' }}
                        />

                        <Skeleton
                            height={20}
                            width={100}
                            borderRadius={5}
                            count={1}
                            style={{ marginRight: '2rem' }}
                        />

                        <Skeleton
                            height={20}
                            width={100}
                            borderRadius={5}
                            count={1}
                            style={{ marginRight: '2rem' }}
                        />
                    </div>


                    {Array.from({ length: 10 }, (_, index) => (
                        <div className='row__table' key={index}>
                            <Skeleton
                                height={20}
                                width={100}
                                borderRadius={5}
                                count={1}
                                style={{ marginRight: '3rem' }}
                            />

                            <Skeleton
                                height={35}
                                width={35}
                                borderRadius={'50%'}
                                circle={true}
                                count={1}
                                style={{ marginRight: '0.5rem' }}
                            />

                            <Skeleton
                                height={20}
                                width={100}
                                borderRadius={5}
                                count={1}
                                style={{ marginRight: '7.25rem' }}
                            />

                            <Skeleton
                                height={20}
                                width={100}
                                borderRadius={5}
                                count={1}
                                style={{ marginRight: '7.5rem' }}
                            />

                            <Skeleton
                                height={20}
                                width={100}
                                borderRadius={5}
                                count={1}
                                style={{ marginRight: '4rem' }}
                            />

                            <Skeleton
                                height={20}
                                width={100}
                                borderRadius={5}
                                count={1}
                                style={{ marginRight: '5rem' }}
                            />

                            <Skeleton
                                height={20}
                                width={100}
                                borderRadius={5}
                                count={1}
                            />
                        </div>
                    ))}
                </div>
            }
        </>

    )
}

export default LoadingTable