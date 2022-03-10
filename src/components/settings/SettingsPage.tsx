import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./settingspage.module.scss";
import axios from "axios";
import Modal from "../modal/Modal";
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from "react-redux";
import { addUser, getAdress, getPrice, getUsers } from "../../redux/features/dashboard/dashboard";
import { RootState } from "../../redux/Store";
import UserCard from "./usercard/UserCard";
import EditPriceTraject from "./editPrice/EditPriceTraject";
import EditAdress from "./editAdress/EditAdress";

interface Props {
  title: string
  users: any
  price: any
}

type FormData = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const SettingsPage = ({ title, users, price }: Props) => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState(false);
  const [showModalPrice, setShowModalPrice] = useState(false);
  const [showModalAdress, setShowModalAdress] = useState(false);
  const [priceId, setPriceId] = useState(price[0]._id);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const dispatch = useDispatch();
  const usersList = useSelector((state: RootState) => state.dashboardReducer.usersList);
  const priceState = useSelector((state: RootState) => state.dashboardReducer.price);
  const adressState = useSelector((state: RootState) => state.dashboardReducer.adress);

  useEffect(() => {
    dispatch(getUsers(users))
    dispatch(getPrice(price[0].price))
    dispatch(getAdress(price[0].adress))
    setPriceId(price[0]._id)
  }, [])

  const onSubmit = handleSubmit(async (formData: any) => {
    closeSnackbar();
    const { name, email, password, role } = formData;
    try {
      const { data } = await axios.post('/api/users/add-user', { name, email, password, role });
      dispatch(addUser(data.newUser))
      enqueueSnackbar('User sucessfully added', {
        variant: 'success',
      })
      setShowModal(false)
    } catch (err: any) {
      enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {
        variant: 'error',
      })
    }
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.settings_layout}>
        <div className={styles.table_container}>
          <div className={styles.table_head}>
            <span>User</span>
            <span>Status</span>
            <span>Email</span>
          </div>
          <div className={styles.user_table_container}>
            {
              usersList?.map((user: any, id: number) => (
                <div key={id}>
                  <UserCard user={user} />
                </div>
              ))
            }
          </div>

          <div className={styles.btn_cont}>
            <button onClick={() => setShowModal(true)} className={styles.btn_add}>+ add a user</button>
          </div>

          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <form onSubmit={onSubmit} className={styles.form_modal}>

              <input placeholder="Name" className={styles.modal_inp} {...register("name", { required: true })} />
              {errors.name && <span>This field is required</span>}
              <input placeholder="Email" className={styles.modal_inp} {...register("email", { required: true })} />
              {errors.email && <span>This field is required</span>}
              <input placeholder="Password" type="password" className={styles.modal_inp} {...register("password", { required: true })} />
              {errors.password && <span>This field is required and must be at least 6 chars</span>}

              <select placeholder="Role" className={styles.modal_inp} {...register("role")}>
                <option value="Passenger">Passenger</option>
                <option value="Conductor">Conductor</option>
                <option value="Admin">Admin</option>
              </select>

              <input className={styles.modal_btn} type="submit" />
            </form>
          </Modal>

        </div>

        <div className={styles.layout_content}>

          <div className={styles.second_column}>
            <div className={styles.price_container}>
              <div className={styles.price_header}>Price By Km: </div>
              <div className={styles.price_content}>{priceState}d/km</div>
              <div className={styles.price_edit}>
                <Image
                  src="v1643303089/editing_bbuguz.png"
                  alt="edit"
                  layout="fill"
                  onClick={() => setShowModalPrice(true)}
                />
              </div>
            </div>

            <Modal show={showModalPrice} onClose={() => setShowModalPrice(false)}>
              <EditPriceTraject id={priceId} price={priceState} setShowModalPrice={setShowModalPrice} />
            </Modal>

            <div className={styles.price_container}>
              <div className={styles.price_header}>Adress Aleia: </div>
              <div className={styles.price_content}>
                {adressState}
              </div>
              <div className={styles.price_edit}>
                <Image
                  src="v1643303089/editing_bbuguz.png"
                  alt="edit"
                  layout="fill"
                  onClick={() => setShowModalAdress(true)}
                />
              </div>
            </div>

            <Modal show={showModalAdress} onClose={() => setShowModalAdress(false)}>
              <EditAdress id={priceId} adress={adressState} setShowModalAdress={setShowModalAdress} />
            </Modal>

            <button className={styles.btn_save}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
