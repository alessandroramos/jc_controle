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
            agendamentosDataAgendamento: '',
            agendamentosHoraAgendamento: '',
            agendamentosVolume: '',
            agendamentosFornecedor: '',
            agendamentosCPD: '',
            agendamentosDataExecu: '',
            agendamentosEntSai: '',
            agendamentosConferencia: '',
            agendamentosObservacao: '',
            
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

                        <Text style={styles.header}>Cadastro de Agendamentos</Text>

                        <TextInput placeholder="Data Agendamento..." style={styles.input}
                            onChangeText={agendamentosDataAgendamento => this.setState({ agendamentosDataAgendamento })}
                            value={this.state.agendamentosDataAgendamento} />
                        <TextInput placeholder="Hora Agendamento..." style={styles.input}
                            onChangeText={agendamentosHoraAgendamento => this.setState({ agendamentosHoraAgendamento })}
                            value={this.state.agendamentosHoraAgendamento} />
                        <TextInput placeholder="Volume..." style={styles.input}
                            onChangeText={agendamentosVolume => this.setState({ agendamentosVolume })}
                            keyboardType={'numeric'}
                            value={this.state.agendamentosVolume} />
                        <TextInput placeholder="Fornecedor..." style={styles.input}
                            onChangeText={agendamentosFornecedor => this.setState({ agendamentosFornecedor })}
                            value={this.state.agendamentosFornecedor} />
                        <TextInput placeholder="CPD..." style={styles.input}
                            onChangeText={agendamentosCPD => this.setState({ agendamentosCPD })}
                            value={this.state.agendamentosCPD} />                            
                        <TextInput placeholder="Data Execução..." style={styles.input}
                            onChangeText={agendamentosDataExecu => this.setState({ agendamentosDataExecu })}
                            value={this.state.agendamentosDataExecu} />
                        <TextInput placeholder="Hora da Entrada ou Saida..." style={styles.input}
                            onChangeText={agendamentosEntSai => this.setState({ agendamentosEntSai })}
                            value={this.state.agendamentosEntSai} />
                        <TextInput placeholder="Conferente..." style={styles.input}
                            onChangeText={agendamentosConferencia => this.setState({ agendamentosConferencia })}
                            value={this.state.agendamentosConferencia} />

                        <TextInput placeholder="Observação..." style={styles.input}
                            onChangeText={agendamentosObservacao => this.setState({ agendamentosObservacao })}
                            value={this.state.agendamentosObservacao} />

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