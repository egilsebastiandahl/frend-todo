import { createTheme } from "@mui/material";

// Create a custom theme for the material components
export const createMaterialTheme = () => {
    const theme = createTheme({
        components: {
            MuiInput: {
                styleOverrides: {
                    underline: {
                        '&:before': {
                            borderBottomColor: '#0B0426', 
                        },
                        '&:hover:not(.Mui-disabled):before': {
                            borderBottomColor: '#0B0426',  
                        },
                        '&.Mui-focused:after': {
                            borderBottomColor: '#0B0426',  
                        },
                        '&.Mui-error:after': {
                            borderBottomColor: '#0B0426',  
                        },
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    icon: {
                        color: '#0B0426', 
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: '#0B0426', 
                        '&.Mui-focused': {
                            color: '#0B0426', 
                        },
                        '&.Mui-error': {
                            color: '#0B0426', 
                        },
                    },
                },
            },
        },
    });
    return theme;
}
