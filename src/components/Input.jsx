import styles from './Input.module.css';

export const Input = ({
    value,
    onChange = () => { },
    label,
    labelOut,
    placeholder,
    onlyNumber = false,
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
            <input
                className={styles.input}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
}