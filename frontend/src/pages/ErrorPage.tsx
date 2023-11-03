import styles from '../styles.module.css'
import { useNavigate } from 'react-router-dom';
import { checkAccount } from '@/utilities'
export const ErrorPage = () => {
    const navigate = useNavigate();
    checkAccount(navigate)

    return (
        <div className={styles.body}>
        <h1>404</h1>
        <h1>Error: Page Not Found</h1>
        </div>)
  };
