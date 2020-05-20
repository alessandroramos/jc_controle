import React, { Component, useState } from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import commonStyles from '../commonStyles'
import Imagens from './Imagens'
let stat = null


export default class AddSel extends Component   {   
    constructor(sta, props ) {
        super(sta, props)
        stat = sta
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
            patrimoniosDataAquisicao: '',
            patrimoniosNota: '',
            patrimoniosEquipamento: '',
            patrimoniosnumSerie: '',
            
            patrimoniosModelo: '',
            patrimoniosSetor:'',
            patrimoniosLocal:'',

            patrimoniosResponsavel: '',
            patrimoniosObservacao: '',

            showCamera: false
        }
    }
    
    save = () => {
        const data = { ...this.state }
        this.props.onSave(data)
    }

    camera = () => {
        this.setState({ showCamera: true })
    }

    cancelaImagem = () => {
        this.setState({ showCamera: false })
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
                    <Imagens visibleImagens={this.state.showCamera} 
                        onCancelImagens={this.cancelaImagem}
                        dados={this.props.dados}
                    />

                        <Text style={styles.header}>Cadastro de Patrimonios</Text>

                        <TextInput placeholder="Data de Aquisição..." style={styles.input}
                            onChangeText={patrimoniosDataAquisicao => this.setState({ patrimoniosDataAquisicao })}
                            value={this.state.patrimoniosDataAquisicao} />
                        <TextInput placeholder="Numero da Nota..." style={styles.input}
                            onChangeText={patrimoniosNota => this.setState({ patrimoniosNota })}
                            keyboardType={'numeric'}
                            value={this.state.patrimoniosNota} />
                        <TextInput placeholder="Equipamento..." style={styles.input}
                            onChangeText={patrimoniosEquipamento => this.setState({ patrimoniosEquipamento })}
                            value={this.state.patrimoniosEquipamento} />
                        <TextInput placeholder="Serie..." style={styles.input}
                            onChangeText={patrimoniosnumSerie => this.setState({ patrimoniosnumSerie })}
                            value={this.state.patrimoniosnumSerie} />
                        <TextInput placeholder="Modelo..." style={styles.input}
                            onChangeText={patrimoniosModelo => this.setState({ patrimoniosModelo })}
                            value={this.state.patrimoniosResponsavel} />
                        <TextInput placeholder="Setor..." style={styles.input}
                            onChangeText={patrimoniosSetor => this.setState({ patrimoniosSetor })}
                            value={this.state.patrimoniosSetor} />
                        <TextInput placeholder="Local..." style={styles.input}
                            onChangeText={patrimoniosLocal => this.setState({ patrimoniosLocal })}
                            value={this.state.patrimoniosLocal} />
                        <TextInput placeholder="Responsavel..." style={styles.input}
                            onChangeText={patrimoniosResponsavel => this.setState({ patrimoniosResponsavel })}
                            value={this.state.patrimoniosResponsavel} />
                            
                        <TextInput placeholder="Prevenção..." style={styles.input}
                            onChangeText={patrimoniosPrevencao => this.setState({ patrimoniosPrevencao })}
                            value={this.state.patrimoniosPrevencao} />
                        <TextInput placeholder="Observação..." style={styles.input}
                            onChangeText={patrimoniosObservacao => this.setState({ patrimoniosObservacao })}
                            value={this.state.patrimoniosObservacao} />

                        <View style={{
                            justifyContent: 'flex-end',
                            borderWidth: 1,
                            marginTop: 10,
                            width: '40%',
                            marginLeft: '5%',
                            borderColor: '#848080',
                            backgroundColor: 'white',
                            borderRadius: 6
                            }}>
                            <TouchableOpacity onPress={this.camera}>
                                <Text style={styles.buttonE}>Câmera</Text>
                            </TouchableOpacity>
                        </View>
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
    buttonE: {
        margin: 20,
        marginRight: 30,
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
        backgroundColor: '#ede5e5',
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