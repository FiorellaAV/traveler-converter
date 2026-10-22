import styles from './Input.module.css';

export const Input = ({
    value,
    onChange = () => { },
    label,
    labelOut,
    placeholder,
    onlyNumber = false,
    clearable = false,
    onClear,
    ...props }) => {

    const handleChange = (e) => {
        if (onlyNumber) {
            const value = e.target.value;
            if (/^\d+$/.test(value)) {
                onChange(e);
            }
        } else {
            onChange(e);
        }
    };

    return (
        <div>
            {labelOut && <label className={styles.label}>{labelOut}</label>}
            <div className={styles.inputWrapper}>
                <input
                    className={`${styles.input} ${clearable ? styles.clearableInput : ''}`}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...props}
                />
                {clearable && value && (
                    <button
                        className={styles.clearButton}
                        type="button"
                        onClick={onClear}
                        aria-label="Borrar cantidad"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                )}
            </div>
        </div>
    );
}