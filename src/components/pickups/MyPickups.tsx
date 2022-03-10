import React, { useEffect, useState } from "react";
import styles from "./pickupss.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getallRequests, allRequests } from "../../redux/features/request/request"
import { userInfo } from "../../redux/features/auth/auth"
//import { requestInfoState } from "../../../interfaces/index"
import PickUpCard from "./PickUpCard";
//import useSWR from 'swr';
import axios from "axios";
//import { requestInfoState } from "../../../interfaces/index"

//const fetcher = (url: any) => fetch(url).then((res) => res.json());

const MyPickUps = ({ title } : { title: string }) => {

  const dispatch = useDispatch();
  const allRequestsData = useSelector(allRequests);
  const userLoggedData = useSelector(userInfo);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [showMore, setShowMore] = useState<boolean>(false);

  // const { data, error } = useSWR('/api/requests', fetcher)
  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>

  const filterData = (event: any) => {

    setFilteredData(allRequestsData.filter((request: any) => { return request.status === event.target.id }));

  }

  useEffect(() => {
    axios.get(`/api/requests`).then((res) => {
      dispatch(getallRequests(res.data))
      setFilteredData(res.data.slice(0, 4))
    })
    //dispatch(getallRequests(data))
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      {/* <button className={styles.btn_request}>New request</button> */}

      <p className={styles.table_title}>Lists of requests</p>

      <div className={styles.filter} >
          <div id="Pending" onClick={filterData} className={styles.filter_card}>Pending</div>
          <div id="Ongoing" onClick={filterData} className={styles.filter_card}>On going</div>
          <div id="Past" onClick={filterData} className={styles.filter_card}>Past</div>
        </div>

      <div className={styles.requests_container}>

        {
          filteredData?.map((request : any) => (
            <PickUpCard key={request._id} request={request} userLoggedData={userLoggedData} />
          ))
        }

      </div>

      <button
          className={styles.btn_add}
          onClick={() => {
            !showMore ? setFilteredData(allRequestsData) : setFilteredData(allRequestsData.slice(0, 4))
            setShowMore(!showMore)
          }}
        >
          {showMore ? 'Show less' : 'Show More'}
        </button>
    </div>
  );

};

export default MyPickUps;
