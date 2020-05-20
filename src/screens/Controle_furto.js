import React, { Component, useEffect  } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert,
    Platform,
    AsyncStorage
} from 'react-native'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import AddControle_furto from './AddControle_furto'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import { server, showError } from '../common'
import todayImage from '../../assets/imgs/today.jpg'
import Geolocation from 'react-native-geolocation-service'
import Localizacao from '../components/localizacao'

let dados ={
    rotinaId: 1,
    sistemaId: 3,
    usersId: null,
    id: null
}  

export default class Controle_furto extends Component {
    state = {
        acessoemps: [],
        usuario: [],
        visible: [],
        vis: [],
        dados: {},
        showAdd: false,
        showDone: false,
        loading: false,
        showUpdate: false,
        cpf: '',
        name: '',
    }
    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('userData')
        const userData = JSON.parse(json) || {}
        dados.usersId = JSON.stringify(userData.acessos[0].userId)
        this.setState({dados: dados})
    }    
//---------------------------------------------------------------------------------------
    AddControle_furtos = async  locData  => {
        this.setState({loading: true})
        try {
            const res = await axios.post(`${server}/controle_furtos`, {
                controle_furtosDataCadastro: new Date(), 
                sistemas_id: dados.sistemaId, 
                rotinas_id: dados.rotinaId,
                users_id:  dados.usersId
            })
            dados.id = res.data
        } catch (err) {
            showError(err)
        }
        const SisRotIdtabela = dados.id
//        Localizacao.localizacao( dados.rotinaId,  dados.sistemaId,  dados.usersId,  dados.id)
        
        try {
            await axios.post(`${server}/localizacaos`, {
                localizacaosDataCadastro: new Date(), 
                localizacaosLatitude: locData.coords.latitude,
                localizacaosLongitude: locData.coords.longitude,
                localizacaosAltitude: locData.coords.altitude,
                localizacaosAccuracy: locData.coords.accuracy,
                localizacaosSpeed: locData.coords.speed,

                sistemas_id: dados.sistemaId, 
                rotinas_id: dados.rotinaId,
                users_id:  dados.usersId,
                SisRotIdtabela: SisRotIdtabela,
            })
        } catch (err) {
            showError(err)
        }
        
        this.setState({loading: false})
        this.setState({showAdd: true})

}

//--------------------------------------------------------------------------------------- 
    updateControle_furtos = async  controle_furto  => {
        const data = new Date()
        console.log(data.getHours())
        try {
            await axios.put(`${server}/controle_furtos/atualisa`, {
                controle_furtos_id: dados.id,
                controle_furtosDataUpdate: new Date(),

                controle_furtosProduto: controle_furto.controle_furtosProduto,
                controle_furtosQuantidade: controle_furto.controle_furtosQuantidade,
                controle_furtosValor: controle_furto.controle_furtosValor,
                controle_furtosNome: controle_furto.controle_furtosNome,
                controle_furtosEndereco: controle_furto.controle_furtosEndereco,
                controle_furtosNumero: controle_furto.controle_furtosNumero,
                controle_furtosBairro: controle_furto.controle_furtosBairro,
                controle_furtosCidade: controle_furto.controle_furtosCidade,
                controle_furtosDataNasc: controle_furto.controle_furtosDataNasc,
                controle_furtosCPF: controle_furto.controle_furtosCPF,
                controle_furtosLocalNasc: controle_furto.controle_furtosLocalNasc,
                controle_furtosRG: controle_furto.controle_furtosRG,
                controle_furtosTotal: controle_furto.controle_furtosTotal,
                controle_furtosFiscal: controle_furto.controle_furtosFiscal,
                controle_furtosPrevencao: controle_furto.controle_furtosPrevencao,
                controle_furtosObservacao: controle_furto.controle_furtosObservacao                
            })
            this.setState({ showAdd: false }, this.load)
        } catch (err) {
            showError(err)
        }

    }
//---------------------------------------------------------------------------------------    
//---------------------------------------------------------------------------------------    
    abriAdd = () =>{
        Geolocation.getCurrentPosition((locData)=>{
            this.AddControle_furtos(locData)
        }, (erro)=>{
            Alert.alert('Erro ao pegar a sua Localização! '+erro.message)
        },{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 } )
    }
    
    fechaAdd = () =>{
        try {
            this.setState({ showAdd: false })
        } catch (err) {
            showError(err)
        }
    }


//---------------------------------------------------------------------------------------

    render() {
        let styleColor = '#c33038'
        let image = null
        image = todayImage
        if(this.state.loading){
            return (
                <View style={[styles.container, styles.loading]}>
                    <Text style={styles.loadingText}>Carregando......</Text>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <AddControle_furto {...this.state} isVisible={this.state.showAdd} 
                        onSave={this.updateControle_furtos}
                        onCancel={this.fechaAdd}/>

                    <ImageBackground source={image} style={styles.background}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={styles.menu}>
                                <Icon name='bars' size={30} color={'#fff'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDone ? 'eye' : 'eye-slash'}
                                    size={20} color={commonStyles.colors.secondary} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.subtitle}>
                                {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.linha} />
                    <View style={styles.taksContainer}>
                        <Text style={styles.titletela}>Controle de Controle_furto</Text>
                        <View style={styles.linha} />
                    </View>
                    <ActionButton buttonColor={styleColor}
                        onPress={this.abriAdd} />
                </View >
            )
                 }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#060606',
        flex: 1,
    },
    loading: {
        backgroundColor: '#060606',
        flex: 1,
    },
    loadingText: {
        fontSize: 25,
        fontWeight: 'bold', 
        color: '#fff',
        marginTop: '45%',
        marginLeft: '30%'       
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
        marginTop: -89,
        width: '60%'
    },
    titletela: {
        color: '#fff',
        fontSize: 20,
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: 3,
        marginBottom: 5
    },    
    taksContainer: {
        flex: 9,
    },
    iconBar: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    linha:{
        marginTop: 5,
        backgroundColor: '#f3eeee',
        height: 1
    },
    input: {
        color: '#000',
        fontSize: 15,
        width: '90%',
        height: 40,
        marginTop: 4,
        marginLeft: '5%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#848080',
        borderRadius: 6
    },
    texto:{
        color: '#000',
        fontSize: 15,
        width: '90%',
        height: 40,
        marginTop: 4,
        padding: 6,
        marginLeft: '5%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#848080',
        borderRadius: 6
    },
    menu: {
        marginTop: 50,
    }
})