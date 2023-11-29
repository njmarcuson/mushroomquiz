/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
    ],

    theme: {
        extend: {},
        colors: {
            'cs-darkred': '#5b040d',
            'cs-brown': '#937656',
            'cs-red': '#d50630',
            'cs-grey': '#e1cdc2',
            'cs-blue': '#c6d6e5',
            'cs-green': '#7da27e',
        },
        fontFamily: {
            rubik: ['Rubik', 'sans-serif'],
        },
    },
    plugins: [],
};
