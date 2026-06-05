const CACHE_KEY = 'currency_rates';

const CACHE_TIME = 5 * 60 * 1000;

//apis de dolarapi 
const EURO_URL = 'https://dolarapi.com/v1/cotizaciones/eur';
const DOLAR_URL = 'https://dolarapi.com/v1/dolares/bolsa';
const PESO_CHILENO_URL = 'https://dolarapi.com/v1/cotizaciones/clp';
const REAL_URL = 'https://dolarapi.com/v1/cotizaciones/brl';

const getCache = () => {
    try {
        const cache = localStorage.getItem(CACHE_KEY);

        if (!cache) return null;

        return JSON.parse(cache);
    } catch {
        return null;
    }
};

const saveCache = (data) => {
    localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
            ...data,
            timestamp: Date.now(),
        })
    );
};

const isCacheValid = (cache) => {
    if (!cache?.timestamp) return false;

    return Date.now() - cache.timestamp < CACHE_TIME;
};

export const getRates = async () => {
    const cache = getCache();
    if (cache && isCacheValid(cache)) {
        return {
            euroVenta: cache.euroVenta,
            dolarVenta: cache.dolarVenta,
            pesoChilenoVenta: cache.pesoChilenoVenta,
            realVenta: cache.realVenta,
        };
    }

    const [euroResponse, dolarResponse, pesoChilenoResponse, realResponse] = await Promise.all([
        fetch(EURO_URL),
        fetch(DOLAR_URL),
        fetch(PESO_CHILENO_URL),
        fetch(REAL_URL),
    ]);

    if (!euroResponse.ok || !dolarResponse.ok) {
        throw new Error('Error obteniendo cotizaciones');
    }

    const euroData = await euroResponse.json();
    const dolarData = await dolarResponse.json();
    const pesoChilenoData = await pesoChilenoResponse.json();
    const realData = await realResponse.json();
    const rates = {
        euroVenta: euroData.venta,
        dolarVenta: dolarData.venta,
        pesoChilenoVenta: pesoChilenoData.venta,
        realVenta: realData.venta,
    };

    saveCache(rates);

    return rates;
};