import { GetServerSideProps } from 'next';
import React from 'react';
import { requireAuthentification } from '../../../contexts/requireAuthentification';
import MyRequests from '../../components/requests/MyRequests';
import Layout from '../../layout/Layout';

const title = "My requests";

const Requests = () => {
  
  return (
    <Layout title='Requests'>
      <MyRequests title={title} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = requireAuthentification(
  async () => {
    // const requestsById = await axios.get(`${process.env.PROD_LOCAL_URL}/api/requests-byid/${userId._id}`);
    // const requestsData = requestsById.data;

    return {
      props: {
        //requestsData: requestsData || null,
      }
    }
  }
)

export default Requests;