import { GetServerSideProps } from 'next';
import React from 'react';
import { requireAuthentification } from '../../../contexts/requireAuthentification';
import DestinationPage from '../../components/destination/DestinationPage';
import Layout from '../../layout/Layout';

const Destination = () => {
  return (
    <Layout title='Destination'>
      <DestinationPage />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = requireAuthentification(
  async () => {

    return {
      props: {

      }
    }
  }
)

export default Destination;