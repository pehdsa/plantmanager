import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import Perfil from '../../assets/perfil.png';


function Header() {

    const [ userName, setUserName ] = useState<string>();

    useEffect(() => {
        getUserName();
    },[])

    async function getUserName() {
        const name = await AsyncStorage.getItem('@plantmanager:user');
        setUserName(name || '');
    }

    return (
        <View style={ styles.container }>
            <View>
                <Text allowFontScaling={false} numberOfLines={1} style={ styles.greeting }>Olá</Text>
                <Text allowFontScaling={false} numberOfLines={1} style={ styles.userName }>{ userName }</Text>
            </View>

            <Image 
                source={ Perfil }                 
                style={ styles.image }
                resizeMode="cover" 
            />

        </View>
    )
}

export default Header;

const styles = StyleSheet.create({

    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: getStatusBarHeight(),
        paddingTop: 30,
        paddingBottom: 20
    },

    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },

    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 38
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    }

});