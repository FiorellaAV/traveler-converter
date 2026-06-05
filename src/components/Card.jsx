import styles from './Card.module.css';

export const Card = ({
    result,
    originCurrency,
}) => {
    const formatNumber = (value) =>
        new Intl.NumberFormat('es-AR', {
            maximumFractionDigits: 2,
        }).format(value);
    return (
        <div className={styles.card}>
            <h2 className={styles.heading}>Resultado</h2>
            <div className={styles.rows}>

                {
                    result && (result.map((item) => (
                        <div className={styles.row} key={item.currency}>
                            <>
                                <span className={styles.label}>

                                    {item.countryCode && (
                                        <span className={`fi fi-${item.countryCode} ${styles.flag}`} aria-hidden="true" />
                                    )}
                                    { " " + item.currency}
                                </span>
                                <span className={styles.value}>{formatNumber(item.value)}</span>
                            </>
                        </div>
                    ))
                    )
                }
            </div>
        </div>
    );
}
