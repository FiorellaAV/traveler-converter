import styles from './Button.module.css';

export const Button = ({
    onClick = () => { },
    label,
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const variantClass = variant === 'secondary' ? styles.secondary : styles.primary;
    const buttonClassName = [styles.button, variantClass, className].filter(Boolean).join(' ');

    return (
        <button
            onClick={onClick}
            className={buttonClassName}
            {...props}>

            {children || label}
        </button>
    );
};
