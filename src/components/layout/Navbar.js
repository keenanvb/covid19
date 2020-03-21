import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LandingSidenav from '../landing-sidenav/'

const Navbar = () => {

    const guesLinks = (
        <ul>
            <li ><Link to="/world-map"><span role="img" aria-label="">🌍</span></Link></li>
            <li ><Link to="/timeseries"><span role="img" aria-label="">📈 </span></Link></li>
            <li ><Link to="/ohwow"><span role="img" aria-label="">🧴</span></Link></li>
        </ul>
    );

    return (
        <nav className="navbar">
            <h1>
                <LandingSidenav />
                <Link className="App-logo" to="/"><span role="img" aria-label="">🦠</span> </Link>
            </h1>
            <Fragment> {guesLinks}</Fragment>
        </nav>
    )
}

Navbar.propTypes = {

}

export default connect(null, {})(Navbar)
