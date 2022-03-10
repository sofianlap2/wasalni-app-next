import React from 'react';
import styles from './footer.module.scss';
import Image from 'next/image';

const Footer = () => {

  return (
    <div className={styles.container}>
      <p className={styles.copyright}>© Copyrights reserved - 2021</p>

      <div className={styles.logo_footer_mobile}>
        <Image
          src="v1643303041/LogoAleiaBlack_b8vycg.png"
          alt='logoaleia'
          layout='fill'
        />
      </div>

      <div className={styles.logo_footer_desktop}>
        <Image
          src="v1643303041/LogoAleiaBlack_b8vycg.png"
          alt='logoaleia'
          layout='fill'
        />
      </div>
    </div>
  );
};

export default Footer;
