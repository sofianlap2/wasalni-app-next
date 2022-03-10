import React, { useEffect, useState } from "react";
import styles from "./homeConductor.module.scss";
// import { RootState } from "../../redux/Store";
// import { useSelector } from "react-redux";
import Link from "next/link";
import { requestProp } from "../../../interfaces/index"
import RequestCardConductor from "./RequestCardConductor";
//import useSWR from 'swr';
import axios from "axios";
import { requestInfoState } from "../../../interfaces/index"

//const fetcher = (url: any) => fetch(url).then((res) => res.json());

const MyRequests = ({ title }: { title: string }) => {

  //const user = useSelector((state: RootState) => state.authReducer.userInfo);
  //const { data, error } = useSWR('/api/requests', fetcher);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]);
  const [showMore, setShowMore] = useState<boolean>(false);

  const filterData = (event: any) => {

    setFilteredData(allData.filter((request: requestInfoState) => { return request.status === event.target.id }));

  }

  useEffect(() => {
    axios.get('/api/requests').then((res) => {
      setFilteredData(res.data.slice(0, 4))
      setAllData(res.data)
    })
  }, [])

  //if (error) return <div>Failed to load</div>
  if (!filteredData) return <div>Loading...</div>


  if (filteredData) {

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
            <RequestCardConductor key={request._id} request={request} />
          ))}

        </div>

        <button
          className={styles.btn_add}
          onClick={() => {
            !showMore ? setFilteredData(allData) : setFilteredData(allData.slice(0, 4))
            setShowMore(!showMore)
          }}
        >
          {showMore ? 'Show less' : 'Show More'}
        </button>
      </div>
    );
  } else {
    return <div>Sorry there is a problem fetching data</div>
  }
};

export default MyRequests;
