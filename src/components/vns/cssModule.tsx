import styles from "./cssModule.module.css";

console.log("styles", styles);
const BlueTitle = () => <h1 className={styles.blue}>I am blue</h1>;

export default BlueTitle;
