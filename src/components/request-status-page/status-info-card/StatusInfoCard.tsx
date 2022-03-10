import React from 'react';
import Image from 'next/image';
import styles from "../request-status.module.scss";
import { requestInfoState, userObjectProp } from "../../../../interfaces/index";

const StatusInfoCard = ({ requestDataRedux, userLogged, userData }: { requestDataRedux: requestInfoState, userLogged: userObjectProp, userData: userObjectProp }) => {
    return (
        <>
            {
                requestDataRedux.status === 'Ongoing' ? (
                    <div className={styles.pickup_info_cont}>
                        {userLogged.role == 'Conductor' ? <h3>You have agreed to pick up :</h3> : <h3>Your request has been accepted by :</h3>}
                        <div className={styles.pickup_name_cont}>
                            <div className={styles.avatar_img}>
                                <Image
                                    src="v1643303089/user-avatar_uhwgwg.png"
                                    alt="avatar"
                                    layout="fill"
                                />
                            </div>

                            {userLogged.role == 'Conductor' ? userData.name : 'conductor name' }
                        </div>
                    </div>
                ) : <div></div>
            }
        </>
    )
}

export default StatusInfoCard