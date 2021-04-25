import React, { useEffect, useState, useRef } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ViewStyle,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/core';

import api from '../../services/api';

import { defaultStyles } from '../../styles/default';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import Header from '../../components/Header';
import EnviromentButton from '../../components/EnviromentButton';
import PlantCardPrimary from '../../components/PlantCardPrimary';
import Load from '../../components/Load';

import { PlantProps } from '../../libs/storage';

interface EnviromentProps {
    key: string,
    title: string
}

const Plants = () => {

    const navigation = useNavigation();

    const [ enviroments, setEnviroments ] = useState<EnviromentProps[]>();
    const [ enviromentsActive, setEnviromentsActive ] = useState('all');

    const [ plants, setPlants ] = useState<PlantProps[]>();
    const [ filteredPlants, setFilteredPlants ] = useState<PlantProps[]>();

    const [ loading, setLoading ] = useState(true);

    const [ page, setPage ] = useState(1);
    const [ loadingMore, setLoadingMore ] = useState(false);
    const [ loadingAll, setLoadingAll ] = useState(false);

    useEffect(() => {    
        fetchEnviroment();    
    },[]);

    useEffect(() => {    
        fetchPlants();    
    },[]);

    const refPage = useRef(true);
    useEffect(() => {   
        if (refPage.current) { refPage.current = false; return; }
        fetchPlants();
    },[page])

    async function fetchEnviroment(){
        const { data } = await api
        .get('plants_environments?_sort=title&_order=esc');
        setEnviroments([ { key: 'all', title: 'todos' }, ...data]);
    }

    async function fetchPlants() {
        const { data } = await api
        .get(`plants?_sort=name&_order=esc&_page=${ page }&_limit=8`);

        if(!data)
            return setLoadingAll(true);

        if(page > 1){
            setPlants(oldValue => oldValue ? [ ...oldValue, ...data ] : data);
            setFilteredPlants(oldValue => oldValue ? [ ...oldValue, ...data ] : data);
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
        
    }

    function handleFetchMore(distance: number) {
        if (distance < 1)
            return;
        
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);        
    }

    function handleEviromentSelected(enviroment: string) {
        setEnviromentsActive(enviroment);
        if (enviroment === 'all')
            return setFilteredPlants(plants)
        
        const filtered = plants?.filter(item => item.environments.includes(enviroment) );
        setFilteredPlants(filtered);
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantDetails', plant);
    }

    if (loading) {
        return <Load />
    }

    return (
        <View style={ defaultStyles.container as ViewStyle }>
            
                <View style={ defaultStyles.containerInner as ViewStyle }>
                
                    <Header />
                
                    <Text style={ styles.title }>Em qual ambiente</Text>
                    <Text style={ styles.subTitle }>você quer colocar sua planta</Text>
    
                </View>
                
                <View>
                    <FlatList 
                        data={enviroments}
                        renderItem={({ item }) => (                            
                            <EnviromentButton 
                                title={ item.title }
                                active={ item.key === enviromentsActive }
                                onPress={() => handleEviromentSelected(item.key)}
                            />                            
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}                    
                        contentContainerStyle={ styles.enviromentButtonsContainer }
                        scrollEventThrottle={16}
                        keyExtractor={(item) => String(item.key) }
                    />
                </View>
            
            
            <View style={ styles.plantCardsContainer }>
                <FlatList 
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    numColumns={ 2 }                    
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    style={{ flex: 1 }}
                    contentContainerStyle={ styles.plantCardsInner }
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => (plants && plants.length < 10 && !loadingMore) ? handleFetchMore(distanceFromEnd) : null }
                    ListFooterComponent={
                        loadingMore ? (
                            <View style={{ paddingVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size="small" color={ colors.green } />
                            </View>
                        ) : null
                    }
                    keyExtractor={(item) => String(item.id) }
                />
            </View>
            

        </View>
    );
}

export default Plants;

const styles = StyleSheet.create({

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20
    },

    subTitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 22,
        marginBottom: 20    },    enviromentButtonsContainer: {
        height: 40,
        paddingHorizontal: 30,
        marginBottom: 20
    },

    plantCardsContainer: {
        flexGrow: 1,
    },

    plantCardsInner: {
        paddingHorizontal: 20,
        paddingBottom: 20
    }

});