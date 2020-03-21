import React, { Fragment, useState, useEffect } from 'react'

const ProgressBar = ({ done, alertType }) => {
    const [style, setStyle] = useState({});

    useEffect(() => {
        setTimeout(() => {
            const newStyle = {
                opacity: 1,
                width: `${done}%`

            }
            setStyle(newStyle);
        }, 800);
    }, [done])


    return (
        <Fragment>
            <div className='progress'>
                <div className={`progress-complete progress-alert-${alertType}`} style={style}>
                </div>
            </div>
        </Fragment>
    )
}

ProgressBar.propTypes = {

}

export default ProgressBar
