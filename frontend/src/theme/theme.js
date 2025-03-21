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
            fontFamily: "Balloo 2, cursive",
            fontSize: "2rem",
            fontWeight: 600,
        },
        h4: {
            fontFamily: "Balloo 2, cursive",
            fontSize: "1.5rem",
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
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: "#ccc",
                    borderRadius: "8rem",
                    "& label.Mui-focused": {
                        color: "#000",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#ccc",
                        },
                        "&:hover fieldset": {
                            borderColor: '#000'
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#ff9800",
                        },
                    }
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                    color: "#ccc",
                    "&:hover": {
                        backgroundColor: "#fff",
                        color: "#000"
                    }
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#fff",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                    "&:hover": {
                        backgroundColor: "#fff",
                        color: "#ff9800"
                    }
                },
            },
        }
    }
});

export default theme;