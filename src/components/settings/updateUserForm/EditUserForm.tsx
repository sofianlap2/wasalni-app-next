import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { userObjectProp } from "../../../../interfaces/index"

const EditUserForm = ({ user, setShowModalUser }: { user: userObjectProp, setShowModalUser: (arg: boolean) => void }) => {

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    await axios.patch(`/api/users/${user._id}`, data);
    setShowModalUser(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={user.name} {...register("name")} />

      <select defaultValue={user.role} {...register("role")}>
        <option value="Passenger">Passenger</option>
        <option value="Conductor">Conductor</option>
        <option value="Admin">Admin</option>
      </select>

      <input defaultValue={user.email} {...register("email")} />

      <input type="submit" />
    </form>
  )
}

export default EditUserForm