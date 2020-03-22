import React, { useState } from "react"

const Sidebar = ({ sidebar, close }) => {

    const [sidebarClass, setSidebarClass] = useState(sidebar)

    let closeHandler = (e) => {
        e.preventDefault();
        setSidebarClass('sidebar close');
        setTimeout(() => {
            close();
        }, 1000)
    }

    return (
        <div className={sidebarClass}>
            <button className="close" style={{ color: 'red', fontSize: '30px' }} onClick={closeHandler}>
                <i className="fa fa-times"></i>
            </button>
            <div className="container">
                <div className="about">
                    <h2>About<div className="lead">This Project was built to provide information. All data sources come from a 3rd party API </div></h2>
                    <div>
                        <a href='https://github.com/mathdroid/covid-19-api' target='_blank' rel='noopener noreferrer'>
                            <i style={{ color: '#211F1F' }} className='fab fa-github fa-1x' />
                        </a>
                        Data source: mathdriod - covid-19-api
                        <a href='https://github.com/mathdroid/covid-19-api' target='_blank' rel='noopener noreferrer'>
                            link
                        </a>
                    </div>
                    <div>
                        <a href='https://github.com/pomber/covid19' target='_blank' rel='noopener noreferrer'>
                            <i style={{ color: '#211F1F' }} className='fab fa-github fa-1x' />
                        </a>
                        Data source: pomber - covid19
                        <a href='https://github.com/pomber/covid19' target='_blank' rel='noopener noreferrer'>
                            link
                        </a>
                    </div>
                    <div>
                        REST Countries - Additional country information
                    <a href='https://restcountries.eu/' target='_blank' rel='noopener noreferrer'>
                            link
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar