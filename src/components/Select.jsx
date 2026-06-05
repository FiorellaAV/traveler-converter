import 'flag-icons/css/flag-icons.min.css';
import styles from './Select.module.css';

export const Select = ({
    onChange = () => { },
    labelOut,
    options = [],
    placeholder,
    getLabel,
    defaultValue,
    value,
    optValueToUse = false,
    ...props
}) => {

    const handleChange = (e) => {
        onChange(e);
    }
    const selectedOption = options.find(opt => String(opt.value) === String(value));
    return (

        <div>

            {labelOut && <label className={styles.label}>{labelOut}</label>}
            <div className={styles.selectWrapper}>
                {selectedOption && selectedOption.countryCode && (
                    <span className={`fi fi-${selectedOption.countryCode} ${styles.flagSmall}`} aria-hidden="true"/>
                )}
                <select
                    value={value}
                    onChange={handleChange}
                    className={styles.select}
                >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
                </select>
            </div>
        </div>
    );
};
