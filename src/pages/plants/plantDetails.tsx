import React, { useState } from 'react';

import {
    Alert,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ViewStyle,
    StyleSheet,
    Platform,
    Text,
    Dimensions
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import Button from '../../components/Button';
import Load from '../../components/Load';

import { defaultStyles } from '../../styles/default';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import WaterDrop from '../../assets/waterdrop.png';

import { PlantProps, savePlant } from '../../libs/storage';


function PlantDetails() {

    const navigation = useNavigation();

    const route = useRoute();
    const params = route.params as PlantProps;

    const [ selectedDateTime, setSelectedDateTime ] = useState(new Date());
    const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS === 'ios');

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if(Platform.OS === 'android') {
            setShowDatePicker(!showDatePicker);
        }

        if(dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro!');
        }

        if(dateTime){
            setSelectedDateTime(dateTime);
        }

    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(!showDatePicker);
    }

    async function handleSavePlant() {
        try {
            await savePlant({
                ...params,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                icon: 'hug',
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                nextScreen: 'SavedPlantsTab'
            })

        } catch(e) {
            Alert.alert('Não foi possível cadastrar a planta.');
        }
    }

    if (!params) {
        return <Load />
    }

    return (
        <View style={ defaultStyles.container as ViewStyle }>            
            <ScrollView
                style={ styles.scrollContainer }
                scrollEventThrottle={ 16 }
                contentContainerStyle={{ flexGrow: 1 }}
            >

                <View style={ styles.plantInfoContainer }>
                    
                    <SvgFromUri
                        uri={ params.photo }
                        width={150}
                        height={150}
                    />                

                    <Text style={ styles.plantName }>{ params.name }</Text>

                    <Text style={ styles.plantDescription }>
                        { params.about }
                    </Text>

                </View>

                <View style={ styles.controller }>

                    <View style={ styles.fundoController } />
                    
                    <View style={ styles.tipContainer }>
                        <Image
                            source={ WaterDrop }
                            style={ styles.tipImage }
                        />
                        <Text style={ styles.tipText }>
                            { params.water_tips }
                        </Text>
                    </View>

                    <View style={ styles.timePickerContainer }>
                        <Text style={ styles.alertLabel }>
                            Ecolha o melhor horário para ser lembrado(a):
                        </Text>

                        { showDatePicker && (
                            <DateTimePicker                     
                                value={ selectedDateTime }
                                mode="time"
                                display="spinner"
                                onChange={handleChangeTime}
                                style={{ height: 200 }}
                            />
                        ) }

                        {
                            Platform.OS === 'android' && (
                                <TouchableOpacity 
                                    style={ styles.dateTimePickerButton }
                                    onPress={handleOpenDateTimePickerForAndroid}
                                >
                                    <Text style={ styles.dateTimePickerText }>
                                        {`Mudar ${ format(selectedDateTime, 'HH:mm') }`}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                        
                    </View>

                    <Button 
                        title="Cadastrar planta"
                        onPress={handleSavePlant}
                    />

                </View>

            </ScrollView>
        </View>
    )
}

export default PlantDetails;

const styles = StyleSheet.create({

    scrollContainer: {
        flex: 1,
    },

    plantInfoContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
        paddingHorizontal: 30,
        paddingTop: getStatusBarHeight() ? getStatusBarHeight() + 20 :  40,
        paddingBottom: 30
    },

    plantName: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        textAlign: 'center',
        paddingBottom: 20
    },

    plantDescription: {
        fontSize: 17,
        fontFamily: fonts.text,
        color: colors.body_dark,
        textAlign: 'center'
    },

    controller: {
        flexGrow: 1,
        position: 'relative',
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingBottom: getBottomSpace() || 20
    },

    fundoController: {
        position: 'absolute',
        top: 0,
        left:0,
        width: Dimensions.get('window').width,
        height: 50,
        backgroundColor: colors.shape
    },

    tipContainer: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        marginBottom: 10,
        borderRadius: 20,
        zIndex: 10
    },

    tipImage: {
        width: 56,
        height: 56
    },

    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        lineHeight: 22
    },

    timePickerContainer: {
        flexGrow: 1
    },
    
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },

    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },


});