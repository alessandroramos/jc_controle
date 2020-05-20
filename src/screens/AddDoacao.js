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


export default class Add extends Component   {   
    constructor(sta, props ) {
        super(sta, props)
        stat = sta
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
                doacaosData: '',
                doacaosHora: '',
                doacaosNota: '',
                doacaosEntidade: '',
                doacaosSetor: '',
                doacaosProduto: '',
                doacaosQuantidade: '',
                doacaosResponsavel: '',
                doacaosConferente: '',
                doacaosObservacao: '',

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

                        <Text style={styles.header}>Cadastro de Doacaos</Text>

                        <TextInput placeholder="Data da doação..." style={styles.input}
                            onChangeText={doacaosData => this.setState({ doacaosData })}
                            value={this.state.doacaosData} />
                        <TextInput placeholder="Hora..." style={styles.input}
                            onChangeText={doacaosHora => this.setState({ doacaosHora })}
                            value={this.state.doacaosHora} />
                        <TextInput placeholder="Nota..." style={styles.input}
                            onChangeText={doacaosNota => this.setState({ doacaosNota })}
                            value={this.state.doacaosNota} />
                        <TextInput placeholder="Entidade..." style={styles.input}
                            onChangeText={doacaosEntidade => this.setState({ doacaosEntidade })}
                            value={this.state.doacaosEntidade} />
                        <TextInput placeholder="Setor..." style={styles.input}
                            onChangeText={doacaosSetor => this.setState({ doacaosSetor })}
                            value={this.state.doacaosSetor} />
                        <TextInput placeholder="Produto..." style={styles.input}
                            onChangeText={doacaosProduto => this.setState({ doacaosProduto })}
                            value={this.state.doacaosProduto} />
                        <TextInput placeholder="Quantidade..." style={styles.input}
                            onChangeText={doacaosQuantidade => this.setState({ doacaosQuantidade })}
                            keyboardType={'numeric'}
                            value={this.state.doacaosQuantidade} />
                        <TextInput placeholder="Responsavel..." style={styles.input}
                            onChangeText={doacaosResponsavel => this.setState({ doacaosResponsavel })}
                            value={this.state.doacaosResponsavel} />
                            
                        <TextInput placeholder="Conferente..." style={styles.input}
                            onChangeText={doacaosConferente => this.setState({ doacaosConferente })}
                            value={this.state.doacaosConferente} />
                        <TextInput placeholder="Observação..." style={styles.input}
                            onChangeText={doacaosObservacao => this.setState({ doacaosObservacao })}
                            value={this.state.doacaosObservacao} />

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