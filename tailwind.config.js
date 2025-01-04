/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                black: '#0e0806',
                orange: '#e05704',
                red: '#fb0f0f',
                gray: '#656d75',
                fonLight: '#e6eaed',
                yellowy: '#fff7ac',
                white: '#ffffff',
                orange20: 'rgba(224, 87, 4, 0.2)',
                shaddow: 'rgba(14, 8, 6, 0.4)'
            }
        }
    },
    plugins: []
}
