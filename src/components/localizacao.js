import axios from 'axios'
import { server, showError } from '../common'

const localizacao = async (rotinaId, sistemaId, usersId, id) => {
        try {
            await axios.post(`${server}/localizacaos`, {
                localizacaosDataCadastro: new Date(), 
                localizacaosLatitude: locData.coords.latitude,
                localizacaosLongitude: locData.coords.longitude,
                localizacaosAltitude: locData.coords.altitude,
                localizacaosAccuracy: locData.coords.accuracy,
                localizacaosSpeed: locData.coords.speed,

                sistemas_id: sistemaId, 
                rotinas_id: rotinaId,
                users_id:  usersId,
                SisRotIdtabela: id,
            })
        } catch (err) {
            showError(err)
        }
        return
}

