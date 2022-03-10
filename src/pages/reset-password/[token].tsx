import React from 'react'
import Layout from '../../layout/Layout';
import styles from './resetPassword.module.scss';
import { useRouter } from 'next/router';
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSnackbar } from 'notistack';

const schema = yup.object({
    password: yup.string().required(),
}).required();

const ChangePassword = () => {
    const router = useRouter();
    const query = router.query.token;

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema)
    });
    const { errors } = formState;

    const changePasswordHandler = async({password} : any) => {
        closeSnackbar();
        try {
            await axios.post('/api/users/reset-password', { newPass : password, resetLink : query });
            enqueueSnackbar( "Your password has succesfully changed", { 
                variant: 'success',
            })
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (err : any) {
            enqueueSnackbar(err.response.data ? err.response.data.message : err.message, { 
                variant: 'error',
            })
        }
    }

  return (
    <Layout title='change password'>
        <div className={styles.container}>
            <form className={styles.form_login}  onSubmit = { handleSubmit ( changePasswordHandler ) }>
                <input 
                    type='password' 
                    placeholder='new password' 
                    {...register("password")}
                    className={styles.form_inp}
                />
                {errors.password?.message}
                <button className={styles.submit_btn} type="submit">Submit</button>
            </form>
        </div>
    </Layout>
  )
}

export default ChangePassword;