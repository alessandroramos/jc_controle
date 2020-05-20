import React, { useState } from 'react'
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    ScrollView,
} from 'react-native'
import axios from 'axios'
import ImagePicker from 'react-native-image-picker'
import Icon from "react-native-vector-icons/MaterialIcons";
import { server, showError } from '../common'

const Imagens = ({visibleImagens, onCancelImagens, dados}) => {
    const [ image, setImage ]  = useState({}); 
    const [ imagem, setImagem] =  useState(null); 

    const pickImage = () => {
        ImagePicker.launchCamera({
            title: 'Tire uma foto.',
            quality: 0.5,
            noData: true,
            Height: 600,
            Width: 800
        }, res => {
            if (!res.didCancel) {
                setImage ({ uri: res.uri, base64: res.data })
                setImagem(res)
            }
        })
    }

    const save = async () => {
        if(image !== null){
            const data = new FormData();
            const fileNam = ('agr-'+dados.sistemaId+'-'+dados.rotinaId+'-'+dados.id+"-lc.jpeg")
            console.log(fileNam)
            data.append("file",{ 
                uri: imagem.uri, 
                type: imagem.type,
                name: fileNam
            });

            const res = await axios.post(`${server}/uplouds` , data)


            const location = res.data.location
            
            try {
                const res = await axios.post(`${server}/imagens`, {
                    imagensDataCadastro: new Date(), 
                    imagensDataUpdate: new Date(), 
                    sistemas_id: dados.sistemaId, 
                    rotinas_id: dados.rotinaId,
                    tabela_id:  dados.id,
                    imagen: location
                })
            } catch (err) {
                showError(err)
            } 
            setImage (null)
        }else{
            showError(' Erro: Não a imagem para enviar!')
        }
    

    }
    

    return (
        <Modal animationType='slide' transparent={false} visible={visibleImagens}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Imagem</Text>
                    <View style={styles.imageContainer}>
                        <Image source={image} style={styles.image} />
                    </View>
                    <View style={styles.buttons}>    
                        <TouchableOpacity onPress={pickImage} style={styles.buttom}>
                            <Icon name="camera-alt" size={40} color={"#f37272"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={save} style={styles.buttom}>
                            <Icon name="save" size={40} color={"#f37272"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancelImagens} style={styles.buttom}>
                                <Icon name="close" size={40} color={"#f37272"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#c8c3c3",
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 1,
        backgroundColor: '#EEE',
        marginTop: 10
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 1,
        resizeMode: 'center'
    },
    buttom: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 150,
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    buttons: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center"
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%'
    },
    buttonDisabled: {
        backgroundColor: '#AAA'
    }
})

export default Imagens


