import { getRates } from '../services/dolarApi';

export const useConverter = () => {
    
    const convert = async (amount, currency) => {
        const { euroVenta, dolarVenta, pesoChilenoVenta, realVenta } = await getRates();

        const value = Number(amount);


        if (!value || value <= 0) {
            throw new Error('Valor inválido');
        }

        switch (currency) {
            case 'EUR': {
                const ars = value * euroVenta;
                const usd = ars / dolarVenta;
                const clp = ars / pesoChilenoVenta;
                const real = ars / realVenta;

                return [
                    { currency: 'EUR', value, code: 'EUR', countryCode: 'eu' },
                    { currency: 'ARS', value: ars, code: 'ARS', countryCode: 'ar' },
                    { currency: 'USD', value: usd, code: 'USD', countryCode: 'us' },
                    { currency: 'CLP', value: clp, code: 'CLP', countryCode: 'cl' },
                    { currency: 'REAL', value: real, code: 'REAL', countryCode: 'br' },
                ];
            }

            case 'ARS': {
                const usd = value / dolarVenta;
                const eur = value / euroVenta;
                const clp = value / pesoChilenoVenta;
                const real = value / realVenta;

                return [
                    { currency: 'ARS', value, code: 'ARS', countryCode: 'ar' },
                    { currency: 'USD', value: usd, code: 'USD', countryCode: 'us' },
                    { currency: 'EUR', value: eur, code: 'EUR', countryCode: 'eu' },
                    { currency: 'CLP', value: clp, code: 'CLP', countryCode: 'cl' },
                    { currency: 'REAL', value: real, code: 'REAL', countryCode: 'br' },
                ];
            }

            case 'USD': {
                const ars = value * dolarVenta;
                const eur = ars / euroVenta;
                const clp = ars / pesoChilenoVenta;
                const real = ars / realVenta;

                return [
                    { currency: 'USD', value: value, code: 'USD', countryCode: 'us' },
                    { currency: 'ARS', value: ars, code: 'ARS', countryCode: 'ar' },
                    { currency: 'EUR', value: eur, code: 'EUR', countryCode: 'eu' },
                    { currency: 'CLP', value: clp, code: 'CLP', countryCode: 'cl' },
                    { currency: 'REAL', value: real, code: 'REAL', countryCode: 'br' },
                ];
            }

            case 'CLP': {
                const ars = value * pesoChilenoVenta;
                const usd = ars / dolarVenta;
                const eur = ars / euroVenta;
                const real = ars / realVenta;

                return [
                    { currency: 'CLP', value, code: 'CLP', countryCode: 'cl' },
                    { currency: 'ARS', value: ars, code: 'ARS', countryCode: 'ar' },
                    { currency: 'USD', value: usd, code: 'USD', countryCode: 'us' },
                    { currency: 'EUR', value: eur, code: 'EUR', countryCode: 'eu' },
                    { currency: 'REAL', value: real, code: 'REAL', countryCode: 'br' },
                ];
            };


            case 'REAL': {
                const ars = value * realVenta;
                const usd = ars / dolarVenta;
                const eur = ars / euroVenta;
                const clp = ars / pesoChilenoVenta;
                
                return [
                    { currency: 'REAL', value, code: 'REAL', countryCode: 'br' },
                    { currency: 'ARS', value: ars, code: 'ARS', countryCode: 'ar' },
                    { currency: 'USD', value: usd, code: 'USD', countryCode: 'us' },
                    { currency: 'CLP', value: clp, code: 'CLP', countryCode: 'cl' },
                    { currency: 'EUR', value: eur, code: 'EUR', countryCode: 'eu' },
                ];
            }

            default:
                throw new Error('Moneda no soportada');
        }
    };

    const getQuotation = async () => {
        const { euroVenta, dolarVenta, pesoChilenoVenta, realVenta } = await getRates();
    
        return [
            { value: dolarVenta, currency: 'USD', countryCode: 'us' },
            { value: euroVenta, currency: 'EUR', countryCode: 'eu' },
            { value: pesoChilenoVenta, currency: 'CLP', countryCode: 'cl' },
            { value: realVenta, currency: 'REAL', countryCode: 'br' },
        ];
    
    };


    return {
        convert,
        getQuotation,
    };
};