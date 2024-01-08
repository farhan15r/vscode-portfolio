"use client";

import Image from "next/image";
import GitHubCalendar from "react-github-calendar";
import RepoCard from "@/components/RepoCard";
import styles from "@/styles/GithubPage.module.css";
import OrgCard from "@/components/OrgCard";
import axios from "axios";
import { useEffect, useState } from "react";

const getUser = async () => {
  const res = await axios.get(`/api/github`);
  return res.data;
};

const getOrgs = async () => {
  const res = await axios.get(`/api/github/orgs`);
  return res.data;
};

const getRepos = async () => {
  const res = await axios.get(`/api/github/repos`);
  return res.data;
};

const UserLoading = () => (
  <div className={styles["user-loading"]}>
    <div>
      <div className={styles["avatar-loading"]} />
      <h3 className={styles["username-loading"]}>farhan15r</h3>
    </div>
    <div>
      <h3 className={styles.loading}>50 repos</h3>
    </div>
    <div>
      <h3 className={styles.loading}>50 followers</h3>
    </div>
  </div>
);

const User = ({ user }) => (
  <div className={styles.user}>
    <div>
      <Image
        src={user.avatar_url}
        className={styles.avatar}
        alt={user.login}
        width={50}
        height={50}
      />
      <h3 className={styles.username}>{user.login}</h3>
    </div>
    <div>
      <h3>{user.public_repos} repos</h3>
    </div>
    <div>
      <h3>{user.followers} followers</h3>
    </div>
  </div>
);

export default function page() {
  const [user, setUser] = useState(null);
  const [orgs, setOrgs] = useState(null);
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    getUser().then((user) => setUser(user));
    getOrgs().then((orgs) => setOrgs(orgs));
    getRepos().then((repos) => setRepos(repos));
  }, []);

  const theme = {
    light: ["#161B22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    dark: ["#161B22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <>
      {user ? <User user={user} /> : <UserLoading />}

      <div className={styles.orgs}>
        <h3>My organization(s)</h3>
        {orgs && user ? (
          <div className={styles.container}>
            {orgs.map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}
          </div>
        ) : (
          <div className={styles.container}>
            <OrgCard isLoading={true} />
          </div>
        )}
      </div>

      <div className={styles.repos}>
        <h3>Some of my public repositories</h3>
        <div className={styles.container}>
          {repos ? (
            repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
          ) : (
            <>
              <RepoCard isLoading={true} />
              <RepoCard isLoading={true} />
              <RepoCard isLoading={true} />
            </>
          )}
        </div>
        {user && (
          <div className={styles.contributions}>
            <GitHubCalendar
              username={user.login}
              theme={theme}
              hideColorLegend
              hideMonthLabels
            />
          </div>
        )}
      </div>
    </>
  );
}
