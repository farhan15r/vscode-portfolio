"use client";

import LinkIcon from "../components/icons/LinkIcon";
import styles from "../styles/OrgCard.module.css";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import GithubIcon from "./icons/GithubIcon";

const OrgCard = ({ org, isLoading }) => {
  const [orgData, setOrgData] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get(org.url);
      setOrgData(res.data);
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };

  useEffect(() => {
    !isLoading && fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org?.url]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {isLoading ? (
          <div className={styles["avatar-loading"]} />
        ) : (
          <Image
            src={org.avatar_url}
            className={styles.avatar}
            alt={org.login}
            // fill="responsive"
            width={100}
            height={100}
          />
        )}
      </div>
      <div className={styles.detail}>
        {isLoading ? (
          <>
            <h3 className={styles.loading}>Loading...</h3>
            <p className={styles.loading}>Loading..................</p>
          </>
        ) : (
          <>
            <h3 className={styles.title}>{org.login}</h3>
            <p>{org.description}</p>
          </>
        )}
        <div className={styles.stats}>
          {isLoading && (
            <div>
              <GithubIcon height={20} width={20} className={styles.loading} />
              <GithubIcon height={20} width={20} className={styles.loading} />
            </div>
          )}
          {orgData?.html_url && (
            <div>
              <a
                href={orgData.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon height={20} width={20} className={styles.icon} />
              </a>
            </div>
          )}

          {orgData?.blog && (
            <div>
              <a href={orgData.blog} target="_blank" rel="noopener noreferrer">
                <LinkIcon height={20} width={20} className={styles.icon} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgCard;
