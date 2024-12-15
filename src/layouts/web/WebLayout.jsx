import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Header/Navbar'
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
