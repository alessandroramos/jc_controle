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
            acesso_tesourariasNome: '',
            acesso_tesourariasDocumento: '',
            acesso_tesourariasMotivo: '',
            acesso_tesourariasAuditor: '',
            acesso_tesourariasResponsavel: '',
            acesso_tesourariasObservacao: '',

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

                        <Text style={styles.header}>Cadastro de Acesso_tesourarias</Text>

                        <TextInput placeholder="Nome..." style={styles.input}
                            onChangeText={acesso_tesourariasNome => this.setState({ acesso_tesourariasNome })}
                            value={this.state.acesso_tesourariasNome} />
                        <TextInput placeholder="Documento..." style={styles.input}
                            onChangeText={acesso_tesourariasDocumento => this.setState({ acesso_tesourariasDocumento })}
                            value={this.state.acesso_tesourariasDocumento} />
                        <TextInput placeholder="Motivo..." style={styles.input}
                            onChangeText={acesso_tesourariasMotivo => this.setState({ acesso_tesourariasMotivo })}
                            value={this.state.acesso_tesourariasMotivo} />
                        <TextInput placeholder="Auditor..." style={styles.input}
                            onChangeText={acesso_tesourariasAuditor => this.setState({ acesso_tesourariasAuditor })}
                            value={this.state.acesso_tesourariasAuditor} />
                        <TextInput placeholder="Responsavel..." style={styles.input}
                            onChangeText={acesso_tesourariasResponsavel => this.setState({ acesso_tesourariasResponsavel })}
                            value={this.state.acesso_tesourariasResponsavel} />
                            
                        <TextInput placeholder="Observação..." style={styles.input}
                            onChangeText={acesso_tesourariasObservacao => this.setState({ acesso_tesourariasObservacao })}
                            value={this.state.acesso_tesourariasObservacao} />

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