import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Animated
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface PlantCardSecondaryProps extends RectButtonProps {
    data: {
        name: string,
        photo: string
        hour: string
    }
    handleRemove: () => void
}

function PlantCardSecondary({ data, handleRemove, ...rest }: PlantCardSecondaryProps) {

    return(
        <Swipeable
            overshootRight={ false }
            renderRightActions={() => (
                <Animated.View>
                    <View style={{ height: '100%', paddingVertical: 5, justifyContent: 'center' }}>
                        <RectButton
                            style={ styles.buttonRemove }
                            onPress={handleRemove}
                        >   
                            <Feather name="trash" size={ 32 } color={ colors.white } />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={ styles.container }
                { ...rest }
            >
                <View style={ styles.containerInner }>
                    
                    
                    <SvgFromUri 
                        uri={ data.photo }                        
                        width={ 50 }
                        height={ 50 }              
                    />               
                    
                    <View style={{ flex: 2, flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={ styles.title }>
                            { data.name }
                        </Text>
                    </View>

                    <View style={ styles.details }>
                        <Text style={ styles.timeLabel }>
                            Regar ás
                        </Text>
                        <Text style={ styles.time }>
                            { data.hour }
                        </Text>
                    </View>

                </View>

            </RectButton>
        </Swipeable>
    )
}

export default PlantCardSecondary;

const styles = StyleSheet.create({

    container: {
        paddingLeft: 15,
        paddingRight: 20,
        paddingVertical: 25,
        backgroundColor: colors.shape,
        borderRadius: 20,        
        marginVertical: 5
    },

    containerInner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
        paddingRight: 10
    },

    details: {
        flex: 1,
        alignItems: 'flex-end',
    },

    timeLabel: {
        marginTop: 5,
        fontSize: 16,
        lineHeight: 17,
        fontFamily: fonts.text,
        color: colors.body_light,
    },

    time: {
        marginTop: 5,
        fontSize: 16,
        lineHeight: 18,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },

    buttonRemove: {
        width: 100,
        height: 80,
        backgroundColor: colors.red,          
        borderRadius: 20,        
        justifyContent: 'center',
        alignItems: 'center',        
        position: 'relative',
        right: 15
    }

});