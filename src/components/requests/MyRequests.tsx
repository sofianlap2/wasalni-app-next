import React, { useEffect, useState } from "react";
import styles from "./requests.module.scss";
import RequestCard from "./RequestCard";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { requestProp } from "../../../interfaces/index";
import { userInfo } from "../../redux/features/auth/auth";
import axios from "axios";

const MyRequests = ({ title }: { title: string }) => {

  const user = useSelector((state: RootState) => state.authReducer.userInfo);
  const userId = useSelector(userInfo);
  const [requestsData, setRequestsData] = useState([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [showMore, setShowMore] = useState<boolean>(false);

  const filterData = (event: any) => {

    setFilteredData(requestsData.filter((request: any) => { return request.status === event.target.id }));

  }

  useEffect(() => {
    axios.get(`/api/requests-byid/${userId._id}`).then((res) => {
      setRequestsData(res.data)
      setFilteredData(res.data.slice(0, 4))
    });
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      <Link href='/'>
        <button className={styles.btn_request}>
          New request
        </button>
      </Link>

      <p className={styles.table_title}>Lists of requests</p>

      <div className={styles.filter} >
        <div id="Pending" onClick={filterData} className={styles.filter_card}>Pending</div>
        <div id="Ongoing" onClick={filterData} className={styles.filter_card}>On going</div>
        <div id="Past" onClick={filterData} className={styles.filter_card}>Past</div>
      </div>

      <div className={styles.requests_container}>

        {filteredData?.map((request: requestProp) => (
          <RequestCard key={request._id} request={request} userInfo={user} />
        ))}

      </div>

      <button
        className={styles.btn_add}
        onClick={() => {
          !showMore ? setFilteredData(requestsData) : setFilteredData(requestsData.slice(0, 4))
          setShowMore(!showMore)
        }}
      >
        {showMore ? 'Show less' : 'Show More'}
      </button>
    </div>
  );
};

export default MyRequests;
