import React from 'react';
import { 
    View,
    ViewStyle,
    SafeAreaView,
    Text,
    StyleSheet
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { defaultStyles } from '../../styles/default';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import Button from '../../components/Button';

interface Params {
    title: string,
    subtitle: string,
    buttonTitle: string,
    icon: 'smile' | 'hug',
    nextScreen: string
}

const emojis = {
    hug: '🤗',
    smile: '😄'
}

export default function Confirmation() {

    const { navigate } = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    return (
        <SafeAreaView style={[ defaultStyles.container as ViewStyle, { justifyContent: 'center' } ]}>
            
            <View style={ styles.content }>

                <Text allowFontScaling={false} style={ styles.iconText }>
                    { emojis[icon] }
                </Text>

                <Text allowFontScaling={false} style={ styles.title }>
                    { title }
                </Text>

                <Text allowFontScaling={false} style={ styles.subTitle }>
                    { subtitle }
                </Text>

                <View style={ styles.buttonContainer }>
                    <Button 
                        title={ buttonTitle } 
                        onPress={() => navigate(nextScreen) }
                    />
                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    content: {
        paddingHorizontal: 30,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    iconText: {
        fontSize: 78,
        paddingBottom: 30
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        paddingBottom: 30
    },
    subTitle: {
        fontFamily: fonts.text,
        fontSize: 18,
        lineHeight: 30,
        textAlign: 'center',
        color: colors.heading,
        paddingBottom: 40 
    },
    buttonContainer: {        
        width: '100%',
        paddingHorizontal: 40
    }

})