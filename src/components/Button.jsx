import styles from './Button.module.css';

export const Button = ({
    onClick = () => { },
    label,
    children,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            className={styles.button}
            {...props}>

            {children || label}
        </button>
    );
};
