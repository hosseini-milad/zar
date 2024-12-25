import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../containers/Header/Header'
import Footer from '../../containers/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
export default function WebLayout() {
  return (
    <>
      <Navbar />
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
