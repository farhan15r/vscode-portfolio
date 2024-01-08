import WatchIcon from "../components/icons/WatchIcon";
import ForkIcon from "../components/icons/ForkIcon";
import StarIcon from "../components/icons/StarIcon";
import GithubIcon from "../components/icons/GithubIcon";
import LinkIcon from "../components/icons/LinkIcon";
import styles from "../styles/RepoCard.module.css";

const RepoCard = ({ repo, isLoading }) => {
  return (
    <div className={styles.card}>
      <div>
        {isLoading ? (
          <>
            <p className={styles.loading}>Loading ....</p>
            <p className={styles.loading}>Loading ..... .....</p>
          </>
        ) : (
          <>
            <h3 className={styles.title}>{repo.name}</h3>
            <p>{repo.description}</p>
          </>
        )}
      </div>
      <div className={styles.stats}>
        {isLoading ? (
          <div>
            <p className={styles.loading}>Loading ....</p>
          </div>
        ) : (
          <div>
            <div>
              <WatchIcon className={styles.icon} /> {repo.watchers}
            </div>
            <div>
              <ForkIcon className={styles.icon} /> {repo.forks}
            </div>
            <div>
              <StarIcon className={styles.icon} /> {repo.stargazers_count}
            </div>
          </div>
        )}

        {isLoading ? (
          <div>
            <p className={styles.loading}>....</p>
          </div>
        ) : (
          <div>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <GithubIcon height={20} width={20} className={styles.icon} />
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                <LinkIcon height={20} width={20} className={styles.icon} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoCard;
