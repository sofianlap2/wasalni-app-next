import * as React from 'react'
import Head from 'next/head'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar';
import { LayoutProps } from "../../interfaces/index"

const Layout = ({ children, title } : LayoutProps) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Navbar />
    
    <main>{children}</main>

    <Footer />
  </div>
)
export default Layout