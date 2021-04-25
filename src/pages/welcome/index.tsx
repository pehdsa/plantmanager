import React from 'react';
import { 
    Text, 
    ViewStyle,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
 

import { defaultStyles } from '../../styles/default';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import Watering from '../../assets/watering.png';

export default function Welcome() {

    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('UserIdentification');
    }

    return (
        <SafeAreaView style={[ defaultStyles.container as ViewStyle, { alignItems: 'center', justifyContent: 'space-around' } ]}>
            
            <Text allowFontScaling={false} style={ styles.title }>
                Gerencie {'\n'}
                suas plantas de {'\n'}
                forma fácil                
            </Text>

            <Image 
                style={ styles.image }
                source={ Watering } 
                resizeMode="contain"
            />

            <Text allowFontScaling={false} style={ styles.subTitle }>
                Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity activeOpacity={0.8} style={ styles.button } onPress={handleStart}>
                <Feather name="chevron-right" size={32} color={ colors.white } />
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    title: {
        fontFamily: fonts.heading,
        fontSize: 28,
        lineHeight: 34,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },

    image: {
        height: Dimensions.get('window').width * 0.7
    },

    subTitle: {
        fontFamily: fonts.text,
        fontSize: 18,
        lineHeight: 30,
        textAlign: 'center',
        color: colors.heading,
        paddingHorizontal: 30
    },

    button: {
        backgroundColor: colors.green,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginBottom: 10
    }

});