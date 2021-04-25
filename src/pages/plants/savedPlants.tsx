import React, { useState, useEffect } from 'react';
import {
    View,
    ViewStyle,
    StyleSheet,
    Text,
    Image,
    FlatList,
    Alert
} from 'react-native';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/core';

import Header from '../../components/Header';
import Load from '../../components/Load';
import PlantCardSecondary from '../../components/PlantCardSecondary';

import { defaultStyles } from '../../styles/default';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import WaterDrop from '../../assets/waterdrop.png';

import { PlantProps, loadPlants, removePlant } from '../../libs/storage';

function SavedPlants() {

    const navigation = useNavigation();

    const [ plants, setPlants ] = useState<PlantProps[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ nextWatered, setNextWatered ] = useState<string>();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadStorages();
        });      
        return unsubscribe;
    },[navigation]);

    async function loadStorages() {
        const storagedPlants = await loadPlants();
        
        if (storagedPlants.length > 0) {
            const nextTime = formatDistance(
                new Date(storagedPlants[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: ptBR }
            );
            
            setNextWatered(`Não esqueça de regar a ${storagedPlants[0].name} em ${nextTime}`);
            setPlants(storagedPlants);
        } else {
            setNextWatered('Nenhum cadastro');            
        }
        setLoading(false);

    }

    function handleSelectPlant(plant: PlantProps) {
        navigation.navigate('PlantDetails', plant);
    }

    async function handleRemove(plant: PlantProps) {
        Alert.alert(
            'Remover',
            `Deseja remover ${ plant.name }`,
            [
                {
                    text: 'Não',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    style: 'default',
                    onPress: async () => {
                        try {
                            await removePlant(plant.id);
                            setPlants(oldData => {
                                return oldData.filter(item => item.id !== plant.id);
                            });
                        } catch(e) {
                            Alert.alert('Não foi possível remover.')
                        }
                        
                    }
                }
            ]
        );
    }

    if(loading) {
        return <Load />
    }

    return (
        <View style={ defaultStyles.container as ViewStyle }>
            <View style={[ defaultStyles.containerInner as ViewStyle, { flexGrow: 1 } ]}>
                
                <View>
                    <Header />

                    <View style={ styles.tipContainer }>
                        <Image
                            source={ WaterDrop }
                            style={ styles.tipImage }
                        />
                        <Text style={ styles.tipText }>
                            { nextWatered }
                        </Text>
                    </View>
                </View>

                <View style={ styles.plants }>
                    <Text style={ styles.plantsTitle }>
                        Próximas regadas
                    </Text>

                    <FlatList 
                        data={plants}
                        renderItem={({ item }) => 
                            <PlantCardSecondary 
                                data={item} 
                                onPress={() => handleSelectPlant(item)}
                                handleRemove={() => handleRemove(item)}
                            />
                        }                        
                        keyExtractor={item => String(item.id)}
                        showsVerticalScrollIndicator={ false }                        
                        contentContainerStyle={{ flex: 1, paddingBottom: getBottomSpace() + 20 }}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ paddingVertical: 100, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontFamily: fonts.text, color: colors.body_light }}>
                                        Nenhuma planta cadastrada
                                    </Text>
                                </View>
                            )
                        }}
                    />

                </View>

            </View>
        </View>
    )
}

export default SavedPlants;

const styles = StyleSheet.create({

    tipContainer: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        marginBottom: 20,
        borderRadius: 20,        
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
        lineHeight: 22,
    },

    plants: {
        flexGrow: 1,
        width: '100%',
    },

    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        paddingBottom: 10
    }

});