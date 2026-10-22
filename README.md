# Traveler Converter

Traveler Converter es una aplicación web que permite consultar cotizaciones y convertir importes entre distintas monedas. La aplicación surgió de una necesidad concreta durante un viaje: poder comparar rápidamente cuánto representa un importe en otra moneda.

Actualmente, ofrece soporte para pesos argentinos, dólares estadounidenses, euros, pesos chilenos y reales brasileños.

https://traveler-converter.vercel.app/

## Funcionalidades

- Convertir un importe ingresado en EUR, ARS, USD, CLP o reales (BRL).
- Ver el equivalente del importe en las demás monedas disponibles.
- Consultar las cotizaciones actuales frente al peso argentino.
- Mostrar banderas para identificar las monedas.
- Conservar las cotizaciones en el almacenamiento local del navegador durante cinco minutos para reducir solicitudes repetidas.

Las cotizaciones se obtienen desde [DolarAPI](https://dolarapi.com/). La cotización del dólar utilizada corresponde al endpoint de dólar bolsa (MEP). Los valores son informativos y pueden cambiar; verificá la cotización antes de realizar una operación.

## Requisitos

- Node.js y npm.
- Conexión a internet para consultar las cotizaciones.

## Desarrollo

1. Instalá las dependencias:

   ```bash
   npm install
   ```

2. Iniciá el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Vite mostrará en la terminal la dirección local para abrir la aplicación.

Para permitir el acceso desde otros dispositivos de la red local, usá:

```bash
npm run dev:mobile
```

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run dev:mobile` | Inicia el servidor y lo expone en la red local. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la última compilación de producción. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |

## Tecnologías

- React
- Vite
- CSS Modules
- [flag-icons](https://github.com/lipis/flag-icons)
- [DolarAPI](https://dolarapi.com/) para las cotizaciones
- vite-plugin-pwa
