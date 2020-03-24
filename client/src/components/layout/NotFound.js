import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='container'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 className="text-primary">Greetings! This page does not exist</h3>
                <div className="lead"></div>
                <video height="400px" className='VideoTag' autoPlay loop muted>
                    <source src={`/img/cyril.mp4`} type='video/mp4' />
                </video>
                <Link style={{ marginTop: '10px' }} className="btn btn-light my-1" to='/' >home</Link>
            </div>
        </div>
    )
}

NotFound.propTypes = {

}

export default NotFound
