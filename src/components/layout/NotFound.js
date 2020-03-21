import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Fragment>
            <h1>Page not found</h1>
            <Link to='/' >Go home</Link>
        </Fragment>
    )
}

NotFound.propTypes = {

}

export default NotFound
