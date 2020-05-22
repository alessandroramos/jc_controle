import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ?
    'https://jcapp-275121.uc.r.appspot.com/' : 'https://jcapp-275121.uc.r.appspot.com/' 
    function showError(err) {
    Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
}
/*/
const server = Platform.OS === 'ios' ?
    'http://localhost:3000' : 'http://10.0.2.2:3000'
    function showError(err) {
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
}
*/
export { server, showError }