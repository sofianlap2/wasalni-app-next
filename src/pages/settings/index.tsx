import { GetServerSideProps } from 'next';
import React from 'react';
import { requireAdmin } from '../../../contexts/requireAdmin';
import Price from '../../../models/Price';
import User from '../../../models/User';
import db from '../../../utils/db';
import SettingsPage from '../../components/settings/SettingsPage';
import Layout from '../../layout/Layout';

const title = "My settings";

const Settings = ({ users, price }: any) => {
  return (
    <Layout title='Dashboard'>
      <SettingsPage title={title} users={users} price={price} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = requireAdmin(
  async () => {
    await db.connect();
    const users = await User.find({}, { password: 0 }).lean();
    const price = await Price.find().lean();
    await db.disconnect();

    return {
      props: {
        users: users.map(db.convertDocToObj),
        price: price.map(db.convertDocToObj),
      }
    }
  }
)


export default Settings;