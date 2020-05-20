import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native'
import moment from 'moment'
import axios from 'axios'
import { server, showError } from '../common'
import commonStyles from '../commonStyles'
let stat = null


export default class AddUse extends Component   {   
    constructor(sta, props ) {
        super(sta, props)
        stat = sta
        let novo = true
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        if(stat.showUpdate){
            this.novo = false
            return {
                name: stat.visible[0].name, 
                cpf: stat.visible[0].cpf, 
                email: stat.visible[0].email, 
                password:'',
                dataCadastro: stat.visible[0].dataCadastro,
                dataUpdate: stat.visible[0].dataUpdate,
                dataCancelU: stat.visible[0].dataCancelU,
                pessoa_id: stat.visible[0].pessoa_id        
            }
        }else{
            return {
                name: '', 
                cpf: '', 
                email: '', 
                password: null,
                dataCadastro: new Date(),
                dataUpdate: new Date(),
                dataCancelU: null,
                pessoa_id: ''      
            }
        }
    }

    save = () => {
        if (!this.state.cpf.trim()) {
            Alert.alert('Dados inválidos', 'Informe uma descrição para a tarefa')
            return
        }
        const data = { ...this.state }
        this.props.onSave(data)
    }

    cpfTe = false
    validaCpf = (cpf) => { 
        if (this.showUpdate != true)  {               
            if(cpf == null){
                cpf = ''
            }
            if (cpf.length ==3){
                cpf = cpf +'.'
            }
            if (cpf.length ==7){
                cpf = cpf +'.'
            }
            if (cpf.length ==11){
                cpf = cpf +'-'
            }
            if (cpf.length >14){
                cpfTe =  false
                cpf = cpf.substring (0,14)
            }
            if(cpf.length == 14){
                if (this.cpfTe == false){
                    stat.showEdit = true
                    this.cpfTe =  true
                    this.buscaPessoa(cpf)
                    this.render
                }
            }
        }
        return cpf
    }

    buscaPessoa = async cpf => {
        try {
            const res = await axios.get(`${server}/pessoas/${cpf}/toggle`)
            this.setState({ name:  res.data[0].nome}) 
            this.setState({ email:  res.data[0].mail}) 
            this.setState({ pessoa_id:  res.data[0].pessoas_id}) 
        } catch (err) {
            showError(err)
        }
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}
                onShow={() => this.setState({ ...this.getInitialState() })}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.header}>Cadastro de Usuario</Text>
                        {stat.showEdit && 
                            <TextInput placeholder="CPF..." style={styles.input}
                                onChangeText={cpf => this.setState({ cpf })}
                                value={this.validaCpf(this.state.cpf)} />
                        }
                        {this.cpfTe &&     
                            <Text style={styles.texto}>{this.state.name}</Text>
                        }
                        {this.cpfTe &&     
                            <Text style={styles.texto}>{this.state.email}</Text>
                        }
                        {stat.showUpdate &&     
                            <Text style={styles.texto}>{this.state.cpf}</Text>
                        }
                        {stat.showUpdate &&     
                            <Text style={styles.texto}>{this.state.name}</Text>
                        }
                        {stat.showUpdate &&     
                            <Text style={styles.texto}>{this.state.email}</Text>
                        }
                        {stat.showUpdate &&     
                            <Text style={styles.texto}>Data Cadastro: {moment(this.state.dataCadastro).format('DD[/]MM[/]YYYY')}</Text>                            
                        }
                        {stat.showUpdate &&     
                            <Text style={styles.texto}>Data Ultima Atualização: {moment(this.state.dataUpdate).format('DD[/]MM[/]YYYY')}</Text>                            
                        }
                        {this.state.dataCancelU &&     
                            <Text style={styles.texto}>Data Cancelamento: {moment(this.state.dataCancelU).format('DD[/]MM[/]YYYY')}</Text>                            
                        }                        
                        <TextInput placeholder="Senha..." style={styles.input}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password} />
                        <TextInput placeholder="Confirme a Senha..." style={styles.input}
                            onChangeText={confirma => this.setState({ confirma })}
                            value={this.state.confirma} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                            }}>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.save}>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#c8c3c3',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button: {
        margin: 20,
        marginRight: 30,
        marginBottom: 50,
    },
    header: {
        backgroundColor: '#a18686',
        color: commonStyles.colors.default,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
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
    date: {
        color: commonStyles.colors.default,
        width: '90%',
        height: 35,
        fontSize: 15,
        marginLeft: '5%',
        marginTop: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
        padding: 5,
    }
})