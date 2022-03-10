import React, { useRef } from "react";
import styles from "./destination.module.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import { useRouter } from "next/router";
import MapWrapper from "./MapWrapper";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const DestinationPage = () => {

  const userInfos = useSelector((state: RootState) => state.authReducer.userInfo);
  const requestData = useSelector((state: RootState) => state.requestReducer.requestInfo);
  const roadType = requestData.road;
  const userId = userInfos._id;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const timeValue = roadType === 'Departure' ? '08:30' : '18:10';


  const { register, handleSubmit, formState: { errors } } = useForm();

  const getCurrentDate = () => {
    var MyDate = new Date();
    var MyDateString;

    MyDateString = MyDate.getFullYear() + '-'
      + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
      + ('0' + MyDate.getDate()).slice(-2);
    return MyDateString;
  }

  const getMaxDate = () => {
    var MyDate = new Date();
    var MyDateString;

    MyDate.setDate(MyDate.getDate() + 30);

    MyDateString = MyDate.getFullYear() + '-'
      + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
      + ('0' + MyDate.getDate()).slice(-2);
    return MyDateString;
  }

  const onSubmit = async (requestData: any) => {
    closeSnackbar();
    try {
      if (userId && requestData) {
        const { data } = await axios.post(`/api/destination/${userId}`, requestData);
        if (data) {
          router.push(`/request-status/${data.newRequest._id}`);
          enqueueSnackbar(data.message, {
            variant: 'success',
          })
        }
      }
    } catch (error: any) {
      enqueueSnackbar(error, {
        variant: 'error',
      })
      console.warn(error);
    }

  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form_wrapper} onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.calendar_wrapper}>
            <label className={styles.select_date_label}>Select date : </label>
            <input type="date" min={getCurrentDate()} max={getMaxDate()} {...register("date", { required: true })} />
            {errors.date && <span>This field is required</span>}
          </div>


          <div className={styles.time_wrapper}>
            <label className={styles.time_label} >Time :</label>
            <input type="time" value={timeValue} className={styles.input_time} readOnly {...register("time", { required: true })} />
            {errors.time && <span>This field is required</span>}
          </div>


          <div>
            <label>From</label>
            <input type="text" {...register("from", { required: true })} />
            {errors.from && <span>This field is required</span>}
          </div>

          <div>
            <label>To</label>
            <input type="text" {...register("to", { required: true })} />
            {errors.to && <span>This field is required</span>}
          </div>

          <input type="hidden" value={roadType} {...register("road")} />

          <div className={styles.price_submit_wrapper}>
            <div>
              <label className={styles.price_label}>PriceTag:</label>
              <input type="number" value="10" className={styles.input_price} {...register("priceTag", { required: true })} />
              {errors.priceTag && <span>This field is required</span>}
            </div>

            <input type="submit" className={styles.btn_save} />
          </div>
        </form>

        <div className={styles.map_wrapper} >
          <MapWrapper />
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;