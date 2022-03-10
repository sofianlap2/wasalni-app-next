import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { getPrice } from '../../../redux/features/dashboard/dashboard';

const EditPriceTraject = ({id, price, setShowModalPrice} : { id:  string, price: number, setShowModalPrice: (arg: boolean) => void} ) => {

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async(formData : any) => { 
        await axios.patch(`/api/price/${id}`, formData);
        dispatch(getPrice(formData.price))
        setShowModalPrice(false);
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={price} {...register("price")} />

      <input type="submit" />
    </form>
  )
}

export default EditPriceTraject