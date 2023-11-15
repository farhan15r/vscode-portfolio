import styles from '../styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'farhan15r.me',
    href: 'https://www.farhan15r.me',
  },
  {
    social: 'email',
    link: 'farhan15ramadhan@gmail.com',
    href: 'mailto:farhan15ramadhan@gmail.com',
  },
  {
    social: 'github',
    link: 'farhan15r',
    href: 'https://github.com/farhan15r',
  },
  {
    social: 'linkedin',
    link: 'Farhan Ramadhan',
    href: 'https://www.linkedin.com/in/farhan15r/',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
