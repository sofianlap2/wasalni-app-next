import React from 'react';
import axios from "axios";
import styles from './forgotPassword.module.scss';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSnackbar } from 'notistack';

const schema = yup.object({
    email: yup.string().email().required(),
  }).required();

const ForgotPassword = () => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { register, handleSubmit, formState } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });
    const { errors } = formState;

    const forgetPasswordHandler = async( {email} : any ) => {
        closeSnackbar();
        try {
            await axios.post('/api/users/forgot-password', { email });
            enqueueSnackbar( "Please check your email", { 
                variant: 'success',
            })
        } catch (err : any) {
            enqueueSnackbar(err.response.data ? err.response.data.message : err.message, { 
                variant: 'error',
            })
        }
    }

  return (
    <div className={styles.container}>
        <form className={styles.form_login} onSubmit={handleSubmit(forgetPasswordHandler)}>
            <input 
                type="email" 
                placeholder='enter your email' 
                {...register("email")}
                className={styles.form_inp}
            />
            { errors.email?.message }
            <button className={styles.submit_btn} type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default ForgotPassword