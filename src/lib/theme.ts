import { createMuiTheme } from "@material-ui/core/styles";

const appPrimary = {
    50: '#4c7395',
    100: '#446a8b',
    200: '#3c6181',
    300: '#355978',
    400: '#2d506e',
    500: '#284b68',
    600: '#224563',
    700: '#1d405d',
    800: '#193c5a',
    900: '#143857',
    A100: '#0f3453',
    A200: '#0a3050',
    A400: '#0a3050',
    A700: '#0a3050'
};

const appSecondary = {
    50: '#dfdfdf',
    100: '#d1d1d1',
    200: '#c3c3c3',
    300: '#b5b5b5',
    400: '#a8a8a8',
    500: '#9e9e9e',
    600: '#949494',
    700: '#8a8a8a',
    800: '#818181',
    900: '#787878',
    A100: '#6f6f6f',
    A200: '#666666',
    A400: '#555555',
    A700: '#444444'
};
const theme = createMuiTheme({
    palette: {
        primary: appPrimary,
        secondary: appSecondary,
        background: {
            default: "#fff"
        }
    }
});

export default theme;