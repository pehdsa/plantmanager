import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';
import Routes from './src/routes';

import { PlantProps } from './src/libs/storage';

import {
    useFonts,
    Jost_400Regular,
    Jost_600SemiBold
} from '@expo-google-fonts/jost';

export default function App() {

    let [ fontsLoaded ] = useFonts({
        Jost_400Regular,
        Jost_600SemiBold    
    });

    useEffect(() => {
        
        const subscription = Notifications.addNotificationReceivedListener(
            async notification => {
                const data = notification.request.content.data.plant as PlantProps;
                console.log(data);
            }
        );
        return () => subscription.remove();
        
    },[]);

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Routes />
        </>
    )
}