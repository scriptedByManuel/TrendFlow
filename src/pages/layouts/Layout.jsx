import React, { useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Breadcrumbs from '../../components/ui/Breadcrumbs'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './Layout.css'
import AuthPage from '../Auth'
import useAuth from '../../hooks/useAuth'
import { Toaster } from 'sonner'

const Layout = () => {
    const location = useLocation()
    const isHomePage = location.pathname === '/'
    const nodeRef = useRef(null)
    const { user } = useAuth()

    return (
        <>
            <Toaster richColors={true} position="top-right" reverseOrder={false} />
            {user ? (
                <div className="min-h-screen flex flex-col justify-between">
                    <NavBar />
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            timeout={200}
                            classNames="fade"
                            key={location.pathname}
                            nodeRef={nodeRef}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div ref={nodeRef} className={`${isHomePage ? '' : 'px-[80px]'}`}>
                                <Breadcrumbs />
                                <Outlet />
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                    <Footer />
                </div>
            ) : (
                <AuthPage />
            )}
        </>
    )
}

export default Layout
