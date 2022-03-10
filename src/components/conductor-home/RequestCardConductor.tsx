import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "./homeConductor.module.scss";
import { requestProp, userObjectProp } from "../../../interfaces/index"
import { useRouter } from 'next/router';
import axios from 'axios';

const RequestCardConductor = ({ request, userInfo }: { request: requestProp, userInfo: userObjectProp }) => {

    const router = useRouter();
    const [user, setUser] = useState<string>('');

    const handleeditRequest = async (e: any) => {
        e.preventDefault();

        await router.push(`/request-status/${request._id}`)
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
        <div onClick={handleeditRequest} className={styles.request_card}>
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

            <div>
                {request.status === 'Pending' ?
                    (
                        <div className={styles.edit_img}>
                            <Image
                                src="v1643303089/editing_bbuguz.png"
                                alt="edit"
                                layout="fill"
                            />
                        </div>
                    )
                    : null}
            </div>

        </div>
    )
}

export default RequestCardConductor