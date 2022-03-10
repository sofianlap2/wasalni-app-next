import { GetServerSideProps } from 'next';
import React from 'react';
import { requireConductor } from '../../../contexts/requireConductor';
import ConductorHome from '../../components/conductor-home/HomeConductor';
import Layout from '../../layout/Layout';

const title = "Hey Rassem";

const Conductor = () => {

  return (
    <Layout title='Conductor'>
      <ConductorHome title={title} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = requireConductor(
  async () => {
    // const requestsList = await axios.get(`${process.env.PROD_LOCAL_URL}/api/requests`);
    // const requestsListData = requestsList.data;

    return {
      props: {
        //requestsListData: requestsListData || null,
      }
    }
  }
)

export default Conductor;