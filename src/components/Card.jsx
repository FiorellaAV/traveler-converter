import styles from './Card.module.css';

export const Card = ({
    children,
}) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.heading}>Resultado</h2>
            <div className={styles.rows}>
                {children}
            </div>
        </div>
    );
}
