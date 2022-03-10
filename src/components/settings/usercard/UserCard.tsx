import React, { useState } from 'react';
import styles from "../settingspage.module.scss";
import Image from "next/image";
import EditUserForm from "../updateUserForm/EditUserForm";
import Modal from "../../modal/Modal";
import { userProp } from "../../../../interfaces/index"

const UserCard = ({user} : userProp) => {

    const [showModalUser, setShowModalUser] = useState(false);

    return (
        <div className={styles.user_container}>
            <div className={styles.avatar_name}>
                <div className={styles.avatar_img}>
                    <Image
                        src="v1643303089/user-avatar_uhwgwg.png"
                        alt="avatar"
                        layout="fill"
                    />
                </div>
                {user.name}
            </div>
            <div className={styles.status}>
                {user.role}
            </div>
            <div className={styles.email_icon}>
                {user.email}

                <div className={styles.edit_img}>
                    <Image
                        src="v1643303089/editing_bbuguz.png"
                        alt="edit"
                        layout="fill"
                        onClick={() => setShowModalUser(true)}
                    />
                </div>

                <Modal show={showModalUser} onClose={() => setShowModalUser(false)}>
                    <h5>Edit User</h5>
                    <EditUserForm user={user} setShowModalUser={setShowModalUser} />
                </Modal>
            </div>
        </div>
    )
}

export default UserCard