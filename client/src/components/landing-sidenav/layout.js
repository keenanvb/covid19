import React, { Fragment, useState } from "react"
import Toggle from "./toggle"
import Sidebar from "./sidebar";

const Layout = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);


    const openHandler = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true)
        } else {
            setSidebarOpen(false)
        }
    }

    const sidebarCloseHandler = () => {
        setSidebarOpen(false)
    }

    let sidebar;

    if (sidebarOpen) {
        sidebar = <Sidebar sidebar={'sidebar'} close={sidebarCloseHandler} />
    }

    return (
        <Fragment>
            <Toggle click={openHandler} />
            {sidebar}
            {/* <p>{children}</p> */}
        </Fragment>
    )
}

export default Layout