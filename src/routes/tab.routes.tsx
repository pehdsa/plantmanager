import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

import Plants from '../pages/plants';
import SavedPlants from '../pages/plants/savedPlants';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88
                }
            }}
            initialRouteName="PlantsTab"
        >

            <AppTab.Screen 
                name="PlantsTab" 
                component={ Plants } 
                options={{
                    title: "Nova planta",
                    tabBarIcon: ( ({ size, color }) => <MaterialIcons name="add-circle-outline" size={ size } color={ color } /> )
                }}
            />

            <AppTab.Screen 
                name="SavedPlantsTab" 
                component={ SavedPlants } 
                options={{
                    title: 'Minhas Plantas',
                    tabBarIcon: ( ({ size, color }) => <MaterialIcons name="format-list-bulleted" size={ size } color={ color } /> )
                }}
            />

        </AppTab.Navigator>
    )
}


export default AuthRoutes;