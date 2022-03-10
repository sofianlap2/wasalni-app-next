import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { getAdress } from '../../../redux/features/dashboard/dashboard';

const EditAdress = ({id, adress, setShowModalAdress} : { id: string, adress: string, setShowModalAdress: (arg: boolean) => void } ) => {

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async(formData : any) => { 
        await axios.patch(`/api/adress/${id}`, formData);
        dispatch(getAdress(formData.adress))
        setShowModalAdress(false);
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={adress} {...register("adress")} />

      <input type="submit" />
    </form>
  )
}

export default EditAdress