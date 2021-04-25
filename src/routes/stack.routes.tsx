import React from 'react'; 

import colors from '../styles/colors';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Welcome from '../pages/welcome';
import UserIdentification from '../pages/welcome/userIdentification';
import Confirmation from '../pages/welcome/confirmation';

import AuthRoutes from '../routes/tab.routes';

//import Plants from '../pages/plants';
import PlantDetails from '../pages/plants/plantDetails';
import SavedPlants from '../pages/plants/savedPlants';

const AppRoutes = () => {
    return (
        <Stack.Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.white
                }
            }}
            initialRouteName="Plants"
        >

            <Stack.Screen name="Welcome" component={ Welcome } />
            <Stack.Screen name="UserIdentification" component={ UserIdentification } />
            <Stack.Screen name="Confirmation" component={ Confirmation } />                
            <Stack.Screen name="PlantDetails" component={ PlantDetails } />
            
            <Stack.Screen name="Plants" component={ AuthRoutes } />        

        </Stack.Navigator>
    )
}

export default AppRoutes;