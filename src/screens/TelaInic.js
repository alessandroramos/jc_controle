import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Platform
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import todayImage from '../../assets/imgs/menu.jpg'

export default class TelaInic extends Component {
    render() {
        let image = null
        styleColor = commonStyles.colors.today
        image = todayImage

        return (
            <View style={styles.container}>
                <ImageBackground source={image}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={styles.menu}>
                            <Icon name='bars' size={30} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taksContainer}>
                    <Text style={styles.titletela}>Seja bem vindo!</Text>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#060606',
        flex: 1,
    },
    background: {
        flex: 3,
        marginTop: 5,
    },
    titleBar: {
        flex: 1,
    },
    title: {
        color: '#000000',
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 20,
        marginTop: -97,
        width: '60%'
    },
    titletela: {
        color: '#fff',
        fontSize: 20,
        marginLeft: '30%',
        marginTop: '30%',
    },    
    taksContainer: {
        flex: 7,
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    linha:{
        backgroundColor: '#f3eeee',
        height: 1
    },
    menu: {
        marginTop: 50,
    }
})