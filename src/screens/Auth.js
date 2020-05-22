import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native'
import axios from 'axios'
import { server, showError } from '../common'
import AuthInput from '../components/AuthInput'
import commonStyles from '../commonStyles'
export default class Auth extends Component {
    state = {
        confirmaUser: false,
        confirmaEmp: false,
        valiUser: false,
        valiEmp: false,
        cpf: '',
        cnpj: '',
        password: '',
        confirmPassword: ''
    }
//--------------------------------------------Aqui valida usuario
    signin = async () => {
        const empresas_id = 1
        try {
            const res = await axios.post(`${server}/signin`, {
                cpf: this.state.cpf,
                password: this.state.password,
                empresas_id: empresas_id,
                sistemaId: 2
            })
            let teste = ''
            for(let i=0; i < res.data.acessos.length;i++){
                teste = teste = '|| '+i+' || '+res.data.acessos[i].acessos_id+' || ; '
            }
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
//            console.log(res.data)
            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            this.props.navigation.navigate('Home', res.data)
        } catch (err) {
             showError(err)
        }
    }

    //
//--------------------------------------------Aqui valida usuario fim

    signinOrSignup = () => {
        this.signin()
    }

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
                cpf = cpf.substring (0,14)
            }
            if(cpf.length == 14){
                if (this.state.valiUser == false){
                    this.buscaPessoa(cpf)
                }
            }
        }
        return cpf
    }
    
    buscaPessoa = async cpf => {
        try {
            const res = await axios.get(`${server}/pessoas/${cpf}/toggleagr`)
            if(res.data.length > 0){
                this.setState({ valiUser: true })
            }else{
                Alert.alert('CPF Não Cadastrado!')
            } 
        } catch (err) {
            this.setState({ valiUser: false })
            showError(err)
        }

    }
    validaCnpj= (cnpj) => {
        if (cnpj.length ==2){
            cnpj = cnpj +'.'
        }
        if (cnpj.length ==6){
            cnpj = cnpj +'.'
        }
        if (cnpj.length ==10){
            cnpj = cnpj +'/'
        }
        if (cnpj.length ==15){
            cnpj = cnpj +'-'
        }
        if(cnpj.length > 18){
            cnpj = cnpj.substring (0,18)
        }
        if(cnpj.length == 18){
            if (this.state.valiEmp == false){
                this.buscaEmpresa(cnpj)
            }
        }
        return cnpj
    }
    buscaEmpresa = async cnp => {
        try {
            const cnpj = cnp.replace("/", ",")
            const ress = await axios.get(`${server}/empresas/${cnpj}/buscaEmpresa`)
            if(ress.data.length > 0){
                this.setState({ valiEmp: true })
            }else{
                Alert.alert('Usuario Não Tem Acesso a Esta Empresa!')
            }             
        } catch (err) {
            showError(err)
        }

    }

    

    render() {
        const validations = []
        validations.push(this.state.password && this.state.password.length >= 6)
        validations.push(this.state.valiUser && this.state.valiUser == true)
        const validForm = validations.reduce((all, v) => all && v)

        return (
            <ImageBackground  
                style={styles.background}>
                <Text style={styles.title}>JC controle</Text>
                <View style={styles.formContainer}>
                    <AuthInput icon='user' placeholder="Informe o CPF do Usuario..." style={styles.input}
                        onChangeText={cpf => this.setState({ cpf })} 
                        keyboardType={'numeric'}
                        value={this.validaCpf(this.state.cpf)}/>
                    {this.state.valiUser &&
                        <AuthInput icon='calculator' placeholder="Informe o CNPJ da Empresa..." style={styles.input}
                            onChangeText={cnpj => this.setState({ cnpj })} 
                            keyboardType={'numeric'}
                            value={this.validaCnpj(this.state.cnpj)}/>
                    }
                    {this.state.valiEmp &&   
                        <AuthInput icon='lock' secureTextEntry={true}
                            placeholder='Senha'
                            style={styles.input}
                            value={this.state.password}
                            onChangeText={password => 
                                this.setState({ password })} />
                    }
                    {this.state.valiEmp &&  
                        <TouchableOpacity disabled={!validForm}
                            onPress={this.signinOrSignup}>
                            <View style={[styles.button, !validForm ? { backgroundColor: '#AAA' } : {}]}>
                                <Text style={styles.buttonText}>Entrar</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#000000',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 40,
        marginBottom: 100,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        marginLeft: '10%',
        padding: 10,
        alignItems: 'center',
        width: '80%',
        borderRadius: 20,
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})