import type { NextPage } from 'next';
import HomePage from '../components/home/Home';
import Layout from '../layout/Layout';
import { GetServerSideProps } from 'next';
import { requireAuthentification } from '../../contexts/requireAuthentification';

const Home : NextPage = () => {
  return (
    <Layout title='Passenger'>
      <HomePage />
    </Layout>
  )
}

export const getServerSideProps : GetServerSideProps = requireAuthentification(
  async() => {
    {
      return {
        props: {
        },
      }
    }
  }
)
export default Home;