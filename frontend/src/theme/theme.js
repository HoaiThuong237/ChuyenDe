import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff9800",
        },
        secondary: {
            main: "#42a5f5",
        },
        background: {
            default: "#f4e4e4",
            paper: "#fff",
        },
    },
    typography: {
        fontFamily: "Baloo 2, cursive",
        h1: {
            fontFamily: "Pacifico, cursive",
            fontSize: "3.5rem",
            fontWeight: 600,
        },
        h2: {
            fontFamily: "Pacifico, cursive",
            fontSize: "2rem",
            fontWeight: 600,
        },
        h3: {
            fontSize: "2rem",
            fontWeight: 600,
        },
        body1: {
            fontFamily: "Baloo 2, cursive",
            fontSize: "1.3rem",
            fontWeight: 400,
        },
        button: {
            fontFamily: "Baloo 2, cursive",
            textTransform: "none",
            fontWeight: 'bold',
            padding: "1rem 1.5rem",
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8rem",
                },
            },
        },
    }
});

export default theme;