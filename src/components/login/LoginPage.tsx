import Image from 'next/image';
import React from 'react';
import Footer from '../footer/Footer';
import styles from './loginpage.module.scss';
import { useForm, SubmitHandler} from "react-hook-form";
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/features/auth/auth';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { LoginProps } from '../../../interfaces/index';

type FormValues = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
}).required();

const LoginPage = ({ title }: LoginProps) => {

    const dispatch= useDispatch();
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { register, handleSubmit, formState } = useForm<FormValues>({
        mode: 'onTouched',
        resolver: yupResolver(schema)
    });
    const { errors, isSubmitting } = formState;
    
    const loginSubmit : SubmitHandler<FormValues> = async ( { email, password } : { email: string, password:string } ) =>  {
        closeSnackbar();
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            Cookies.set( 'userInfo', ( JSON.stringify(data) ) );
            dispatch(userLogin(data));
            if (data.role === 'Admin') {
                router.push('/settings');
            } else if (data.role === 'Conductor') {
                router.push('/conductor');
            } else {
                router.push('/');
            }

        } catch (err: any) {
            enqueueSnackbar(err.response.data ? err.response.data.message : err.message, { 
                variant: 'error',
            })
        }
    }

  return (
    <div className={styles.container}>
            <div className={styles.logo_wassalni}>
                <Image
                    src="v1643303041/Logo_pp9xei.png"
                    alt='logo'
                    width={250}
                    height={48}
                />
            </div>

            <h1 className={styles.welcome_text}>{title}</h1>

            <form className={styles.form_login} onSubmit={handleSubmit(loginSubmit)}>

                <input 
                    placeholder='Enter your email:*'  
                    {...register("email")} 
                    className={styles.form_inp}    
                />
                {errors.email && <span className={styles.error_msg}> {errors.email.message} </span>}
                <input 
                    className={styles.form_inp}
                    placeholder='Enter your password:*'  
                    {...register("password")}
                    type="password"
                />
                {errors.password && <span className={styles.error_msg}> {errors.password.message} </span>}

                <div className={styles.button_container} >
                    <Link href="/login/forgot-password" passHref>
                        <a className={styles.forget_link}>
                            Forgot your password
                        </a>
                    </Link>
                    <button disabled={isSubmitting} type='submit' className={styles.submit_btn}>
                        <span className={styles.submit_span}>Submit</span>
                        <Image
                            src="v1643303024/Vector_v6rgte.png"
                            alt='arrow'
                            width={19}
                            height={15}
                        />
                    </button>
                </div>
            </form>

            <div className={styles.image_container_desktop}>
                <Image
                    src="v1643303042/LoginImage_xirgou.png"
                    alt='login image'
                    layout='fill'
                />
            </div>

            <div className={styles.image_container_mobile}>
                <Image
                    src="v1643303042/LoginImageMobile_gwhmpl.png"
                    alt='login image'
                    layout='fill'
                />
            </div>

            <Footer />

        </div>
  )
}

export default LoginPage