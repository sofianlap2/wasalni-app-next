import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "../request-status.module.scss";
import axios from "axios";
import { acceptRequest, cancelRequest } from "../../../redux/features/request/request";
import { requestInfoState, userObjectProp } from "../../../../interfaces/index";

const ButtonsInfoCard = ({ requestDataRedux, phoneLink, userLogged }: { requestDataRedux: requestInfoState, phoneLink: string, userLogged: userObjectProp }) => {

    const dispatch = useDispatch();

    const handleAcceptRequest = async (e: any) => {
        e.preventDefault();
        await axios({
            method: 'patch',
            url: `/api/request-status/${requestDataRedux._id}`,
            data: {
                status: 'Ongoing',
                acceptebby: userLogged._id,
            }
        });

        dispatch(acceptRequest(userLogged._id));
    }

    const handleCancelRequest = async (role: string) => {

        if (role === 'Conductor') {
            await axios({
                method: 'patch',
                url: `/api/request-status/${requestDataRedux._id}`,
                data: {
                    status: 'Pending',
                    acceptebby: '111122223333444455556666',
                }
            });
        } else {
            await axios({
                method: 'patch',
                url: `/api/request-status/${requestDataRedux._id}`,
                data: {
                    status: 'Past',
                    acceptebby: '111122223333444455556666',
                }
            });
        }
        dispatch(cancelRequest());
    }

    return (
        <>
            {
                requestDataRedux.status === 'Past' ?
                (
                    <p>{requestDataRedux.acceptebby === "111122223333444455556666" ? 'Cancelled' : 'Done'}!</p>
                )
                :
                (
                    requestDataRedux.status === 'Pending' ?
                    (
                        userLogged.role == 'Conductor' ?
                            <button onClick={handleAcceptRequest} className={styles.btn_accept}>Accept</button>
                            :
                            <p>Pending!</p>
                    )
                    :
                    (
                        <div className={styles.ongoing_btns_container} >
                            <a href={phoneLink} className={styles.btn_accept}>Phone call</a>
                            <button onClick={() => {
                                userLogged.role === 'Conductor' ?
                                    handleCancelRequest('Conductor')
                                    :
                                    handleCancelRequest('Passenger')
                            }} className={styles.cancel_request}>Cancel request</button>
                        </div>
                    )
                )
            }


        </>
    )
}

export default ButtonsInfoCard
