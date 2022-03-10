//import axios from 'axios';
import React from 'react'
import RequestStatusPage from '../../components/request-status-page/RequestStatusPage';
import Layout from '../../layout/Layout';
//import { requestProp, userObjectProp } from "../../../interfaces/index"


const RequestStatus = () => {

  return (
    <Layout title='Requests'>
      <RequestStatusPage  />
    </Layout>
  )
}

export default RequestStatus;

export async function getServerSideProps() {
  // const requestid = context.params.reqstatus;

  // const request = await axios.get(`${process.env.PROD_LOCAL_URL}/api/request-status/${requestid}`);
  // const requestData = request.data;
  // const user = await axios.get(`${process.env.PROD_LOCAL_URL}/api/users/${requestData.user_id}`);
  // const userData = user.data;

  // if (!requestData) return {
  //   redirect: {
  //     destination: "/request-status",
  //     permanent: false,
  //   }
  // }

  return {
    props: {
      // requestData: requestData || null,
      // userData: userData || null,
    },
  }
}