import { GetServerSideProps } from 'next';
import React from 'react';
import { requireConductor } from '../../../contexts/requireConductor';
import MyPickUps from '../../components/pickups/MyPickups';
import Layout from '../../layout/Layout';

const title = "My pickups";

const PickUps = () => {
    return (
      <Layout title='Pickups'>
        <MyPickUps title={title} />
      </Layout>
    )
}

export const getServerSideProps : GetServerSideProps = requireConductor (
  async() => {

    // const requests = await axios.get(`${process.env.PROD_LOCAL_URL}/api/requests`);
    // const requestsData = requests.data;

    return {
      props : {
        //requestsData: requestsData || null
      }
    }
  }
)

export default PickUps;