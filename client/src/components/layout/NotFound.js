import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='container'>
            <h1>Page not found</h1>
            <Link to='/' >home</Link>
        </div>
    )
}

NotFound.propTypes = {

}

export default NotFound
