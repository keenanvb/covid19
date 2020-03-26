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
                    <h2>About<div className="lead">All data sources come from a 3rd party API </div></h2>
                    <div>
                        <a href='https://github.com/mathdroid/covid-19-api' target='_blank' rel='noopener noreferrer'>
                            <i style={{ color: '#211F1F' }} className='fab fa-github fa-1x' />
                        </a>
                        Data source: mathdriod - covid-19-api
                        <a style={{ textDecoration: 'underline' }} href='https://github.com/mathdroid/covid-19-api' target='_blank' rel='noopener noreferrer'>
                            - LINK
                        </a>
                    </div>
                    {/* <div>
                        <a href='https://github.com/pomber/covid19' target='_blank' rel='noopener noreferrer'>
                            <i style={{ color: '#211F1F' }} className='fab fa-github fa-1x' />
                        </a>
                        Data source: pomber - covid19
                        <a href='https://github.com/pomber/covid19' target='_blank' rel='noopener noreferrer'>
                            link
                        </a>
                    </div> */}
                    <div>
                        <a href='https://github.com/dsfsi/covid19za' target='_blank' rel='noopener noreferrer'>
                            <i style={{ color: '#211F1F' }} className='fab fa-github fa-1x' />
                        </a>
                        Data source: Coronavirus COVID-19 (2019-nCoV) Data Repository for South Africa - maintained and hosted by
                        <a style={{ textDecoration: 'underline' }} href='https://github.com/dsfsi/covid19za' target='_blank' rel='noopener noreferrer'>
                            DSFSI
                        </a> research group at the University of Pretoria
                        <a style={{ textDecoration: 'underline' }} href='https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_timeline_confirmed.csv' target='_blank' rel='noopener noreferrer'>
                            - DATA SOURCE
                        </a>
                        <a style={{ textDecoration: 'underline' }} href='https://github.com/dsfsi/covid19za' target='_blank' rel='noopener noreferrer'>
                            - REPO
                        </a>
                    </div>
                    <div>
                        REST Countries - Additional country information
                    <a style={{ textDecoration: 'underline' }} href='https://restcountries.eu/' target='_blank' rel='noopener noreferrer'>
                            - LINK
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar