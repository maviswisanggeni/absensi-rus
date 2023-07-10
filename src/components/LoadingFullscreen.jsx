import React from 'react'

function LoadingFullscreen({ loading }) {
    return (
        <>
            {loading
                && <div className='loading-fullscreen'><div className='loading'></div></div>
            }
        </>
    )
}

export default LoadingFullscreen