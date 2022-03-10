import React, { useEffect, useState } from 'react'
import styles from './modal.module.scss';
import ReactDOM from "react-dom";

type modalProps = {
    show: any;
    onClose: any;
    children: any;
};


const Modal = ({ show, onClose, children }: modalProps) => {
    const [isBrowser, setIsBrowser] = useState<boolean>(false);

    const [modalRootstate, setModalRootstate] = useState<any>();

    useEffect(() => {
        setIsBrowser(true);
        setModalRootstate(document.getElementById("modal-root") as HTMLElement);
    }, [])

    const handleClose = (e: any) => {
        e.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href="#" onClick={handleClose}>
                        <button className={styles.btn}>X</button>
                    </a>
                </div>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    ) : null

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            modalRootstate
        )
    } else {
        return null;
    }
}

export default Modal