import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
    title: string,
    active?: boolean
}

function EnviromentButton({ 
    title, 
    active = false, 
    ...rest 
}: EnviromentButtonProps) {

    return (
        <RectButton 
            style={[ 
                styles.container,
                active && styles.containerActive
            ]} 
            { ...rest }
        >
            <Text 
                style={[ 
                    styles.text,
                    active && styles.textActive
                ]}
            >
                { title }
            </Text>

        </RectButton>
    )

}

export default EnviromentButton;

const styles = StyleSheet.create({

    container: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        backgroundColor: colors.shape,
        paddingHorizontal: 20,
        borderRadius: 12
    },

    containerActive: {
        backgroundColor: colors.green_light
    },

    text: {
        color: colors.heading,
        fontFamily: fonts.text
    },

    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    }

});