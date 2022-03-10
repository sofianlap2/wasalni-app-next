import React from 'react'
import ForgotPassword from '../../../components/login/forgot-password/ForgotPassword';
import Layout from '../../../layout/Layout';


const title = "forgot password";

const index = () => {
  return (
    <Layout title={title}>
        <ForgotPassword />
    </Layout>
  )
}

export default index