import React, { useState } from 'react';
import {
    View,
    ViewStyle,
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { defaultStyles } from '../../styles/default';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import Button from '../../components/Button';



export default function UserIdentification() {

    const navigation = useNavigation();

    const [ isFocused, setIsFocused ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);
    const [ name, setName ] = useState<string>();

    const handleInputBlur = () => {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    const handleInputFocus = () => {
        setIsFocused(true);
    }

    const handleInputChange = (value: string) => {
        setIsFilled(!!value);
        setName(value);
    }

    const handleSubmit = async () => {
        if(!name) 
            return Alert.alert("Me diz como chamo você.");

        try {
            await AsyncStorage.setItem('@plantmanager:user', name);        
            isFilled && navigation.navigate('Confirmation', {
                icon: 'smile',
                title: 'Prontinho',
                subtitle: ' Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                nextScreen: 'Plants'
            });
        } catch(e) {
            Alert.alert("Não foi possível salvar o usuário.")
        }

    }

    return (
        <SafeAreaView style={[ defaultStyles.container as ViewStyle, { alignItems: 'center', justifyContent: 'space-around' } ]}>  
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.content}>

                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height' } style={ styles.form }>

                        <View style={ styles.header }>
                            <Text style={styles.emoji}>
                                { !isFilled ? '😀' : '😄' } 
                            </Text>
                            <Text style={ styles.title }>
                                Como podemos {'\n'}
                                chamar você?
                            </Text>
                        </View>

                        <TextInput                         
                            placeholder="Digite um nome"
                            placeholderTextColor={ colors.body_light }
                            style={[ 
                                styles.input, 
                                (isFocused || isFilled) && { borderBottomColor: colors.green }
                            ]}
                            onBlur={ handleInputBlur }
                            onFocus={ handleInputFocus }
                            onChangeText={handleInputChange}
                            autoFocus={true}
                        />

                        <View style={ styles.buttonContainer }>
                            <Button 
                                title="Confirmar" 
                                onPress={handleSubmit}
                                //disabled={ !isFilled }                            
                            />
                        </View>

                    </KeyboardAvoidingView>

                </View>
            </TouchableWithoutFeedback>     
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    content: {
        flex: 1,
        width: '100%'
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },

    header: {
        alignItems: 'center', 
        justifyContent: 'center'
    },

    emoji: {
        fontSize: 44,
        paddingBottom: 20
    },

    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },

    buttonContainer: {
        width: '100%',
        paddingHorizontal: 30,
        paddingTop: 40
    }

});