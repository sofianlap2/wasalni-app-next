import React from 'react';
import Image from "next/image";
import styles from "./requests.module.scss";
import { requestProp, userObjectProp } from "../../../interfaces/index"
import { useRouter } from 'next/router';


const RequestCard = ( {request, userInfo} : { request: requestProp, userInfo: userObjectProp }) => {

    const router = useRouter();

    const handleRequestInfo = () => {
        router.push(`/request-status/${request._id}`)
    }

    return (
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
            <div>{userInfo.name}</div>
            <div>{request.road}</div>
            <div>{request.date}</div>
            <div>{request.priceTag}dt</div>
        </div>
    )
}

export default RequestCard