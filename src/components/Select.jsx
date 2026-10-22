import { useState } from 'react';
import { FlagIcon } from './Icons/FlagIcon';
import styles from './Select.module.css';

export const Select = ({
    onChange = () => {},
    labelOut,
    options = [],
    placeholder = 'Seleccionar...',
    defaultValue,
    value,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedValue = value ?? defaultValue;
    const selectedOption = options.find(
        (option) => String(option.value) === String(selectedValue),
    );

    const handleSelect = (option) => {
        onChange({ target: { value: option.value } });
        setIsOpen(false);
    };

    return (
        <div>
            {labelOut && <span className={styles.label}>{labelOut}</span>}
            <div
                className={styles.selectWrapper}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        setIsOpen(false);
                    }
                }}
            >
                <button
                    type="button"
                    className={styles.select}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    onClick={() => setIsOpen((open) => !open)}
                >
                    {selectedOption?.countryCode && (
                        <FlagIcon countryCode={selectedOption.countryCode} className={styles.flag} />
                    )}
                    <span className={styles.selectedLabel}>
                        {selectedOption?.label ?? placeholder}
                    </span>
                    <span className={styles.chevron} aria-hidden="true" />
                </button>
                {isOpen && (
                    <div className={styles.options} role="listbox">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                role="option"
                                aria-selected={String(option.value) === String(selectedValue)}
                                className={styles.option}
                                onClick={() => handleSelect(option)}
                            >
                                {option.countryCode && (
                                    <FlagIcon countryCode={option.countryCode} className={styles.flag} />
                                )}
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
