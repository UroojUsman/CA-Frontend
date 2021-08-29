import React from 'react'
import {NavLink} from 'react-router-dom'

function Home() {
    return (
        <>
            <section id="header" className="">
                <div className="container-fluid nav_bg">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="heading">
                                <h1>
                                    Accounting Cycle Project
                                </h1>
                                <h2 className="">
                                    Group Project By Urooj Usman & Aimon Ejaz Ansari
                                </h2>
                                <div className="btn">
                                    <NavLink to="/addaccount">Get Started</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
