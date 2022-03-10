import React, { useEffect, useState } from 'react';
import styles from "./request-status.module.scss";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
//import { requestProp, userObjectProp } from "../../../interfaces/index"

import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../../redux/features/auth/auth';
import { registerRequestInfo, requestInfo } from "../../redux/features/request/request"
import StatusInfoCard from './status-info-card/StatusInfoCard';
import ButtonsInfoCard from './status-info-card/ButtonsInfoCard';
import axios from "axios"
import { useRouter } from 'next/router';
//import useSWR from 'swr';

//const fetcher = (url: any) => fetch(url).then((res) => res.json());

const RequestStatusPage = () => {

    const [userData, setUserData] = useState<any>({})
    const userLogged = useSelector(userInfo);
    const requestDataRedux = useSelector(requestInfo);
    const phoneLink = userLogged.role === 'Conductor' ? `tel:${userData.phoneNumber}` : `tel:conductor phone`;
    const dispatch = useDispatch();
    const router = useRouter();
    const { reqstatus } = router.query;
    //const { data, error } = useSWR(`/api/request-status/${reqstatus}`, fetcher)
    

    const changeToPastIfTimePassed = async() => {
        let MyDate = new Date();
        let year = MyDate.getFullYear()
        let month = MyDate.getMonth()+1
        let day = MyDate.getDate()
        let hours = MyDate.getHours()
        //let minutes = MyDate.getMinutes()

        let requestYear = parseInt(requestDataRedux.date.split('-')[0])
        let requestMonth = parseInt(requestDataRedux.date.split('-')[1])
        let requestDay = parseInt(requestDataRedux.date.split('-')[2])
        let requestHour = parseInt(requestDataRedux.time.split(':')[0]);
        //let requestMinute = parseInt(requestDataRedux.time.split(':')[1]);

        if (requestDataRedux.road === "Departure" && year <= requestYear && month <= requestMonth && day<= requestDay ) {
            if (day == requestDay && hours > (requestHour + 1) ) {
                await axios({
                    method: 'patch',
                    url: `/api/request-status/${requestDataRedux._id}`,
                    data: {
                        status: 'Past'
                    }
                });
            }
        } else if(requestDataRedux.road === "Departure" && year > requestYear || month > requestMonth || day > requestDay) {
            await axios({
                method: 'patch',
                url: `/api/request-status/${requestDataRedux._id}`,
                data: {
                    status: 'Past'
                }
            });
        }

        if (requestDataRedux.road === "Return" && year <= requestYear && month <= requestMonth && day<= requestDay ) {
            if (day == requestDay && hours > (requestHour + 1) ) {
                await axios({
                    method: 'patch',
                    url: `/api/request-status/${requestDataRedux._id}`,
                    data: {
                        status: 'Past'
                    }
                });
            }
        } else if(requestDataRedux.road === "Return" && year > requestYear || month > requestMonth || day > requestDay) {
            await axios({
                method: 'patch',
                url: `/api/request-status/${requestDataRedux._id}`,
                data: {
                    status: 'Past'
                }
            });
        }

    }

    changeToPastIfTimePassed()

    useEffect(() => {
        axios.get(`/api/request-status/${reqstatus}`)
        .then((res) => dispatch(registerRequestInfo(res.data)) )
        .then((res) => axios.get(`/api/users/${res.payload.user_id}`))
        .then((res) => setUserData(res.data))
        
    }, [])

    return (
        <div className={styles.container}>

            <StatusInfoCard requestDataRedux={requestDataRedux} userLogged={userLogged} userData={userData} />

            <div className={styles.wrapper}>
                <div className={styles.user_cards_container}>
                    <div className={styles.user_card}>
                        <div>{userData.name}</div>
                        <div>{userData.phoneNumber ? userData.phoneNumber : '+216 55 555 555'}</div>
                    </div>
                    <div className={styles.user_card}>
                        <div>Pick Up</div>
                        <div className={styles.pickup_data}>{requestDataRedux.from}</div>
                    </div>
                    <div className={styles.user_card}>
                        <div>Destination</div>
                        <div className={styles.pickup_data}>{requestDataRedux.to}</div>
                    </div>
                </div>

                <div className={styles.request_infos_container}>
                    <div className={styles.info_card}>
                        <div className={styles.time_container}>
                            <div className={styles.icon_cont}><AccessTimeIcon /></div>
                            <div>{requestDataRedux.time}</div>
                        </div>
                        <div>|</div>
                        <div>{requestDataRedux.date}</div>
                        {/* <div>|</div>
                    <div>Morning</div> */}
                    </div>
                    <div className={styles.info_card}>
                        PriceTag : {requestDataRedux.priceTag} dt
                    </div>
                    <div className={styles.info_card}>
                        <ButtonsInfoCard requestDataRedux={requestDataRedux} phoneLink={phoneLink} userLogged={userLogged} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestStatusPage