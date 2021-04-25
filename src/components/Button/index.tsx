import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: string
    color?: string
    colorText?: string,
    size?: string    
}

const Button = ({ title, color, colorText, size, ...rest }: ButtonProps) => {
    return (
        <TouchableOpacity 
            style={[ styles.button, { backgroundColor: color ? color : colors.green, width: size ? size : '100%' }]}
            activeOpacity={0.8}
            { ...rest }
        >
            <Text 
                allowFontScaling={ false } 
                style={[ 
                    styles.buttonText, 
                    { color: colorText ? colorText : colors.white }
                ]}
            >
                { title }
            </Text>

        </TouchableOpacity>
    );
}

export default Button;

const styles = StyleSheet.create({

    button: {        
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30
    },

    buttonText: {
        fontFamily: fonts.heading,
        fontSize: 16
    }

});