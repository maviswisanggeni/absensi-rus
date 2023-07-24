import React from 'react'

function SkeletonLoading({ loading, width, height }) {
    return (
        <>
            {!loading
                ? <div
                    className='skeleton__loading'
                    style={{
                        width: width,
                        height: height
                    }}
                >
                </div>
                : null
            }
        </>
    )
}

export default SkeletonLoading