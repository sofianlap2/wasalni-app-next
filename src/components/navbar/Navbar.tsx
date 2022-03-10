import Image from 'next/image';
import React, { useState } from 'react';
import styles from './navbar.module.scss';
import BurgerMenu from '../burger/BurgerMenu';
import Link from 'next/link';

const Navbar = () => {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <Image
            src="v1643303041/Logo_pp9xei.png"
            alt='logowasalni'
            layout='fill'
          />
        </Link>
      </div>


      { !open &&  <div className={styles.burger}>
        <Image
          onClick={() => setOpen(!open)}
          src="v1643303025/BurgerMenu_wjn2ig.png"
          alt='burger'
          layout='fill'
        />
      </div>}

      {open && <BurgerMenu setOpen={setOpen} />}
    </div>
  );
};

export default Navbar;
