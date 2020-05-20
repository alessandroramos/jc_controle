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
            recebimentosFornecedor: '',
            recebimentosMotorista: '',
            recebimentosHoraEntradaSaida: '',
            recebimentosHoraNota: '',
            recebimentosPlacaVeic: '',
            recebimentosNotaFiscal: '',
            recebimentosTemperatura: '',
            recebimentosIrregDescProd: '',
            recebimentosIrregCodigo: '',
            recebimentosIrregDiferenca: '',
            recebimentosIrregCodDecisao: '',
            recebimentosRecebedor: '',            
            recebimentosConferente: '',
            recebimentosPrevencao: '', 
            recebimentosObservacao: '',

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

                        <Text style={styles.header}>Cadastro de Recebimentos</Text>

                        <TextInput placeholder="Fornecedor..." style={styles.input}
                            onChangeText={recebimentosFornecedor => this.setState({ recebimentosFornecedor })}
                            value={this.state.recebimentosFornecedor} />
                        <TextInput placeholder="Motorista..." style={styles.input}
                            onChangeText={recebimentosMotorista => this.setState({ recebimentosMotorista })}
                            value={this.state.recebimentosMotorista} />
                        <TextInput placeholder="Hora da Nota..." style={styles.input}
                            onChangeText={recebimentosHoraNota => this.setState({ recebimentosHoraNota })}
                            value={this.state.recebimentosHoraNota} />
                        <TextInput placeholder="Placa do Veiculo..." style={styles.input}
                            onChangeText={recebimentosPlacaVeic => this.setState({ recebimentosPlacaVeic })}
                            value={this.state.recebimentosPlacaVeic} />
                            
                        <TextInput placeholder="Nota Fiscal..." style={styles.input}
                            onChangeText={recebimentosNotaFiscal => this.setState({ recebimentosNotaFiscal })}
                            value={this.state.recebimentosNotaFiscal} />
                        <TextInput placeholder="Temperatura.." style={styles.input}
                            onChangeText={recebimentosTemperatura => this.setState({ recebimentosTemperatura })}
                            value={this.state.recebimentosTemperatura} />
                        <TextInput placeholder="Descrição da Irrecularidade do Produto..." style={styles.input}
                            onChangeText={recebimentosIrregDescProd => this.setState({ recebimentosIrregDescProd })}
                            value={this.state.recebimentosIrregDescProd} />
                        <TextInput placeholder="Codigo da Irreguralidade..." style={styles.input}
                            onChangeText={recebimentosIrregCodigo => this.setState({ recebimentosIrregCodigo })}
                            value={this.state.recebimentosIrregCodigo} />
                        <TextInput placeholder="Diferrença da Irreguralidade..." style={styles.input}
                            onChangeText={recebimentosIrregDiferenca => this.setState({ recebimentosIrregDiferenca })}
                            value={this.state.recebimentosIrregDiferenca} />
                        <TextInput placeholder="Codigo da Decisão..." style={styles.input}
                            onChangeText={recebimentosIrregCodDecisao => this.setState({ recebimentosIrregCodDecisao })}
                            value={this.state.recebimentosIrregCodDecisao} />
                        <TextInput placeholder="Recebedor..." style={styles.input}
                            onChangeText={recebimentosRecebedor => this.setState({ recebimentosRecebedor })}
                            value={this.state.recebimentosRecebedor} />
                        <TextInput placeholder="Conferente..." style={styles.input}
                            onChangeText={recebimentosConferente => this.setState({ recebimentosConferente })}
                            value={this.state.recebimentosConferente} />
                        <TextInput placeholder="Prevenção..." style={styles.input}
                            onChangeText={recebimentosPrevencao => this.setState({ recebimentosPrevencao })}
                            value={this.state.recebimentosPrevencao} />
                        <TextInput placeholder="Observação..." style={styles.input}
                            onChangeText={recebimentosObservacao => this.setState({ recebimentosObservacao })}
                            value={this.state.recebimentosObservacao} />

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