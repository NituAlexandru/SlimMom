import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <picture>
        <source
          srcSet="../../../src/assets/logo-d.png"
          media="(min-width: 1024px)"
        />
        <source
          srcSet="../../../src/assets/logo-t.png"
          media="(min-width: 768px)"
        />
        <img
          src="../../../src/assets/logo-m.png"
          alt="Logo"
          className={styles.logoImage}
        />
      </picture>
    </div>
  );
};

export default Logo;
