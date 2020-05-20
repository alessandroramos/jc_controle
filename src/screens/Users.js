import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Platform
} from 'react-native'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import User from '../components/User'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddUser from './AddUser'
import { server, showError } from '../common'
import todayImage from '../../assets/imgs/today.jpg'

export default class Use extends Component {
    state = {
        users: [],
        visible: [],
        vis: [],
        showDone: false,
        showAdd: false,
        loading: true,
        showUpdate: false,
        showEdit: true
    }
//----------------------------------------------------------------------------
    addUpdate = async use => {
        if(this.state.showUpdate){
            try {
                await axios.put(`${server}/users/atualisa`, {
                    dataUpdate:  new Date(),
                    dataCancelU: use.dataCancelU,
                    cpf: use.cpf,
                    password: use.password,
                })
                this.setState({ showAdd: false }, this.load)
            } catch (err) {
                showError(err)
            }
        }else{
            try {
                await axios.post(`${server}/users`, {
                    name: use.name, 
                    cpf: use.cpf, 
                    email: use.email, 
                    dataCadastro: new Date(),
                    dataUpdate:  new Date(),
                    dataCancelU: use.dataCancelU,
                    password: use.password,
                    pessoa_id: use.pessoa_id
                })
                this.setState({ showAdd: false }, this.load)
            } catch (err) {
                showError(err)
            }
        }
    }
//---------------------------------------------------------------------------------------
    delete = async users_id => {
        try {
            await axios.put(`${server}/users/${users_id}/remove`)
            await this.load()
        } catch (err) {
            showError(err)
        }
    }
//---------------------------------------------------------------------------------------

    filterUsers = () => {
        this.state.loading = false
        let visible = null
        if (this.state.showDone) {
            visible = [...this.state.users]
        } else {
            const pending = users => users.dataCancelU === null
            visible = this.state.users.filter(pending)
        }
        this.setState({ visible })
    }
//---------------------------------------------------------------------------------------

    toggleFilter = () => {
        this.setState({ showDone: !this.state.showDone }
            , this.filterUsers)
            this.state.loading = false
    }
//---------------------------------------------------------------------------------------

    componentDidMount = async () => {
        this.load()
    }
//---------------------------------------------------------------------------------------

    load = async () => {
        this.state.loading = true
        this.setState({showUpdate: false})
        this.setState({showEdit: true})
        try {
            const res = await axios.get(`${server}/users`)
            this.setState({ users: res.data }, this.filterUsers)
        } catch (err) {
            showError(err)
        }
    }
//---------------------------------------------------------------------------------------

    toggle = async users_id => {
        this.state.loading = true
        try {
            const res = await axios.get(`${server}/users/${users_id}/toggle`)
            this.setState({ users: res.data }, this.mostraUsers)
        } catch (err) {
            showError(err)
        }
    }

    mostraUsers = () => {
        this.state.loading = false
        let visible = null
        visible = [...this.state.users]
        this.setState({showUpdate: true})
        this.setState({visible})
        this.setState({showEdit: false})
        this.setState({showAdd: true})



    }

    fechaAdd = () =>{
        try {
            this.setState({ showAdd: false }, this.load)
        } catch (err) {
            showError(err)
        }
    }
    abriAdd = () =>{
        this.setState({showAdd: true})
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
                    <AddUser {...this.state} isVisible={this.state.showAdd} 
                        onSave={this.addUpdate}
                        onCancel={this.fechaAdd} />
                    <ImageBackground source={image}
                        style={styles.background}>
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
                        <Text style={styles.titletela}>Usuarios</Text>
                        <FlatList data={this.state.visible}
                            keyExtractor={item => `${item.users_id}`}
                            renderItem={({ item }) => 
                                <User {...item} onUpdate={this.toggle}
                                    onDelete={this.delete} />} />
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
    menu: {
        marginTop: 50,
    }
})