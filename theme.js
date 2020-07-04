import { ThemeProvider } from "react-native-elements"
import React from "react"
import { StyleSheet } from "react-native"

/* COLORS */

export const colors = {
    primary:"#063f57",
    accent:"#45acbb",
    secondary:"#2699fb",
    light:"#809da9"
}

/* Button Styles */
export const buttonStyles = {
    solid:{
        type:"solid",
        buttonStyle:{
            backgroundColor:colors.secondary,
            padding:15,
            borderRadius:5,
        },
        titleStyle:{
            color:"#fff"
        }
    },
    outline:{
        type:"outline",
        buttonStyle:{
            borderColor:colors.secondary,
        },
        titleStyle:{
            color:colors.secondary
        }
    },
    clear:{
        type:"clear",
        titleStyle:{
            color:colors.secondary
        }
    },
}

export const theme = {
}

export default function Theme({children}){
    return <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
}


const inputStyles = {
    input:{
        padding:10,
        color:"#fff"
    },
    inputContainer:{
      borderWidth:1,
      borderRadius:5,
      borderColor:"#FFF",
      backgroundColor:"transparent"
    },
    containerStyle:{
        padding:0,
        paddingHorizontal:0
    }
}
export const inputs = {
    input1:{
        inputStyle:inputStyles.input,
        inputContainerStyle:inputStyles.inputContainer,
        placeholderTextColor:"#809da9",
        containerStyle:inputStyles.containerStyle
    }
}