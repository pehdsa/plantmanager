import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface PlantCardPrimaryProps extends RectButtonProps {
    data: {
        name: string,
        photo: string
    }
    
}

function PlantCardPrimary({ data, ...rest }: PlantCardPrimaryProps) {
    return(
        <RectButton
            style={ styles.container }
            { ...rest }
        >

            <SvgFromUri 
                uri={ data.photo }
                width={ 70 }
                height={ 70 }
            />
            <Text style={ styles.text }>{ data.name }</Text>

        </RectButton>
    )
}

export default PlantCardPrimary;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        maxWidth: '45%',        
        height: 154,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        margin: 5
    },

    text: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16
    },

    image: {
        width: '100%',
        height: 80
    }

});