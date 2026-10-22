import { useState, useEffect } from 'react';
import { useConverter } from '../hooks/useConverter';
import styles from './home.module.css';

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Card } from '../components/Card';
import { FlagIcon } from '../components/Icons/FlagIcon';

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
    const [lastUpdate, setLastUpdate] = useState(null);

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

  const formatNumber = value =>
    new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

    useEffect(() => {
        const cache = localStorage.getItem('currency_rates');
        setLastUpdate(cache ? new Date(JSON.parse(cache).timestamp).toLocaleString() : 'No disponible');
    }, [result]);

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

                <div className={styles.lastUpdate}>
                    <span className={styles.label} style={{ display: "flex", justifyContent: "center" }}>
                        Última actualización: {lastUpdate}
                    </span>
                </div>
                {result && (
                    <Card>
                        {
                            result && (result.map((item) => (
                                <div className={styles.row} key={item.currency}>
                                    <>
                                        <span className={styles.label}>

                                            <FlagIcon countryCode={item.countryCode} className={styles.flag} />
                                            {" " + item.currency}
                                        </span>
                                        <span className={styles.value}>{formatNumber(item.value)}</span>
                                    </>
                                </div>
                            ))
                            )
                        }
                    </Card>
                )}
                {quotation && result == null && (
                    <Card>
                        {quotation && (quotation.map((item) => (
                            <div className={styles.row} key={item.currency}>
                                <>
                                    <span className={styles.label}>
                                        {" 1 " + item.currency}
                                        <FlagIcon countryCode={item.countryCode} className={styles.flag} />
                                        {" -> "}
                                        <FlagIcon countryCode="ar" className={styles.flag} />
                                        {" " + " ARS "}
                                    </span>
                                    <span className={styles.value}>{formatNumber(item.value)}</span>
                                </>
                            </div>
                        ))
                        )}
                    </Card>
                )}
            </div>
        </div>
    );
}

export default Home;