import { useState } from 'react';
import { useConverter } from '../hooks/useConverter';
import styles from './home.module.css';


import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Card } from '../components/Card';

const currencies = [
    {
        label: 'Euro',
        value: 'EUR',
        countryCode: 'eu',
    },
    {
        label: 'Peso Argentino',
        value: 'ARS',
        countryCode: 'ar',
    },
    {
        label: 'Dólar',
        value: 'USD',
        countryCode: 'us',
    },
    {
        label: 'Peso Chileno',
        value: 'CLP',
        countryCode: 'cl',
    },
    {
        label: 'Real',
        value: 'REAL',
        countryCode: 'br',
    },
];

function Home() {
    const { convert } = useConverter();

    const [currency, setCurrency] = useState('EUR');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConvert = async () => {
        try {
            setLoading(true);
            const conversion = await convert(amount, currency);
            setResult(conversion);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Conversor de Monedas</h1>

                <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    options={currencies}
                    labelOut="Moneda actual"
                />

                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ingrese la cantidad a convertir"
                    labelOut="Cantidad"
                />

                <Button
                    onClick={handleConvert}
                    disabled={loading || !amount}
                >
                    {loading ? 'Convirtiendo...' : 'Convertir'}
                </Button>

                {result && (
                    <Card
                        result={result}
                        originCurrency={currency}
                    />
                )}
            </div>
        </div>
    );
}

export default Home;