import React, { useState } from 'react';
import Image from "next/image";
import styles from "./pickupss.module.scss";
import { userObjectProp, requestInfoState } from "../../../interfaces/index"
import { useRouter } from 'next/router';
import axios from "axios"

const PickUpCard = ({ request, userLoggedData }: { request: requestInfoState, userLoggedData: userObjectProp }) => {

    const router = useRouter();
    const userLoggedDataId = userLoggedData._id;
    const [user, setUser] = useState('');

    const handleRequestInfo = () => {
        router.push(`/request-status/${request._id}`)
    }

    function fetchUserName(): any {
        axios.get(`/api/users/${request.user_id}`)
            //.then(res => console.log(res.data.name))
            .then(res => {
                // here you can performance your task, save data, send 
                // response or anything else
                setUser(res.data.name)
                return res.data.name
            })
    };

    fetchUserName();

    return (
        <>
            {
                userLoggedDataId === request.acceptebby ?
                    (
                        <div className={styles.request_card} onClick={handleRequestInfo}>
                            <div>
                                <div className={styles.avatar_img}>
                                    <Image
                                        src="v1643303089/user-avatar_uhwgwg.png"
                                        alt="avatar"
                                        layout="fill"
                                    />
                                </div>
                            </div>
                            <div>{user}</div>
                            <div>{request.road}</div>
                            <div>{request.date}</div>
                            <div>{request.priceTag}dt</div>
                        </div>
                    )
                    :
                    null
            }
        </>
    )
}

export default PickUpCard