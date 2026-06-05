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
    const { convert, getQuotation } = useConverter();

    const [currency, setCurrency] = useState('EUR');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const [quotation, setQuotation] = useState(null);

    const handleConvert = async () => {
        try {
            setLoading(true);
            const conversion = await convert(amount, currency);
            setResult(conversion);
        } catch (error) {
            setLoading(false);
            alert(error.message);
        } finally {
            setLoading(false);
        }

    };

    const handleGetQuotation = async () => {
        try {
            setResult(null);
            setAmount('');

            const currentQuotation = await getQuotation();
            console.log(currentQuotation);
            setQuotation(currentQuotation);
        } catch (error) {
            setLoading(false);
            alert(error.message);
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
                <div className={styles.buttons}>
                    <Button
                        variant="primary"
                        onClick={handleConvert}
                        disabled={loading || !amount}
                    >
                        {loading ? 'Convirtiendo...' : 'Convertir'}
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={handleGetQuotation}
                    >
                        Ver cotización actual
                    </Button>
                </div>
                {result && (
                    <Card
                        result={result}
                        originCurrency={currency}
                    />
                )}
                {quotation && result == null && (
                    <Card
                        result={quotation}
                        originCurrency={currency}
                    />
                )}
            </div>
        </div>
    );
}

export default Home;