import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss'
import { userInfo } from "../../redux/features/auth/auth"
import { registerRoad } from "../../redux/features/request/request"

const Home = () => {

  const user = useSelector(userInfo);
  const dispatch = useDispatch();
  const { name } = user;

  return (
    <div className={styles.container}>

      <div className={styles.welcome_title}>Hey {name}!</div>

      <p className={styles.description}>
        Dont be shy and ask for a drive
      </p>

      <div className={styles.buttons_container}>
        <Link href="/destination" >
          <a
            onClick={() => dispatch(registerRoad('Departure'))}
            className={styles.button_departure}>
            Departure
          </a>
        </Link>
        <Link href="/destination">
          <a
            className={styles.button_return}
            onClick={() => dispatch(registerRoad('Return'))}>
            Return
          </a>
        </Link>
      </div>
    </div>
  );
};


export default Home;