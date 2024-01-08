"use client";

import ProjectCard from "@/components/ProjectCard";
import styles from "@/styles/ProjectsPage.module.css";
import LoadingIcon from "@/components/icons/LoadingIcon";
import axios from "axios";
import { useEffect, useState } from "react";

const getProjects = async () => {
  const res = await axios.get(`/api/projects`);
  return res.data;
};

export default function page() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((data) => setProjects(data));
  }, []);

  return (
    <>
      {projects.length ? (
        <>
          <h3>Stuff I&apos;ve Built So Far</h3>
          <div className={styles.container}>
            {
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            }
          </div>
        </>
      ) : (
        <div className={styles.loading}>
          <LoadingIcon/>
          <h3>Loading...</h3>
        </div>
      )}
    </>
  );
};