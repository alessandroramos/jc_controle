import React from 'react'
import { createSwitchNavigator,createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import AuthOrApp from './screens/AuthOrApp'
import Menu from './screens/Menu'
import TelaInic from './screens/TelaInic'
import Auth from './screens/Auth'


import Armarios from './screens/Temperaturas'
import PrestServicos from './screens/Prest_servico'
import Agendamentos from './screens/Agendamento'
import Doacaos from './screens/Doacao'
import Papelaos from './screens/Papelao'
import Recebimentos from './screens/Recebimento'
import Transferencias from './screens/Transferencia'
import Comodatos from './screens/Comodato'
import Recuperados from './screens/Recuperado'
import Cancelamentos from './screens/Cancelamento'
import Canc_descontos from './screens/Canc_desconto'
import Controle_descontos from './screens/Controle_desconto'
import Reg_precos from './screens/Reg_preco'
import Controle_furtos from './screens/Controle_furto'
import Troca_devolucaos from './screens/Troca_devolucao'
import Esquecimentos from './screens/Esquecimento'
import Sangrias from './screens/Sangria'
import Acerto_caixas from './screens/Acerto_caixa'
import Acesso_tesourarias from './screens/Acesso_tesouraria'

import Material_circulantes from './screens/Material_circulante'
import Epis from './screens/Epi'
import Patrimonios from './screens/Patrimonio'
import Emprestimos from './screens/Emprestimo'
import Manifestos from './screens/Manifesto'

const MenuNavigator = createDrawerNavigator({
    TelaInic: {
        name: 'Home',
        screen: props =>
            <TelaInic {...props} />,
        navigationOptions: {
            title: 'Home'
        }
    },
    Armario:{
        name: 'Armario',
        screen: props => 
            <Armarios {...props} />,
        navigationOptions: {
            title: 'Armario'
        }
    },
    PrestServico:{
        name: 'PrestServico',
        screen: props => 
            <PrestServicos {...props} />,
        navigationOptions: {
            title: 'Prestação de Serviços'
        }
    },
    Agendamento:{
        name: 'Agendamento',
        screen: props => 
            <Agendamentos {...props} />,
        navigationOptions: {
            title: 'Agendamento'
        }
    },
    Doacao:{
        name: 'Doacao',
        screen: props => 
            <Doacaos {...props} />,
        navigationOptions: {
            title: 'Doação'
        }
    },
    Papelao:{
        name: 'Papelao',
        screen: props => 
            <Papelaos {...props} />,
        navigationOptions: {
            title: 'Papelão/Plastico'
        }
    },
    Recebimento:{
        name: 'Recebimento',
        screen: props => 
            <Recebimentos {...props} />,
        navigationOptions: {
            title: 'Recebimento'
        }
    },
    Transferencia: {
        name: 'Transferencia',
        screen: props => 
            <Transferencias {...props} />,
        navigationOptions: {
            title: 'Transferencia'
        }
    },
    Comodato:{
        name: 'Comodato',
        screen: props => 
            <Comodatos {...props} />,
        navigationOptions: {
            title: 'Comodato'
        }
    },
    Recuperado: {
        name: 'Recuperado',
        screen: props => 
            <Recuperados {...props} />,
        navigationOptions: {
            title: 'Recuperado'
        }
    },
    Cancelamento: {
        name: 'Cancelamento',
        screen: props => 
            <Cancelamentos {...props} />,
        navigationOptions: {
            title: 'Cancelamento'
        }
    },
    Canc_desconto: {
        name: 'Canc_desconto',
        screen: props => 
            <Canc_descontos {...props} />,
        navigationOptions: {
            title: 'Cancelamento de Desconto'
       }
    },
    Controle_desconto:{
        name: 'Controle_desconto',
        screen: props => 
            <Controle_descontos {...props} />,
        navigationOptions: {
            title: 'Controle de Desconto'
        }
    },
    Reg_precos:{
        name: 'Reg_preco',
        screen: props => 
            <Reg_precos {...props} />,
        navigationOptions: {
            title: 'Requisição de Alteração de Precos'
        }
    },
    Controle_furto:{
        name: 'Controle_furto',
        screen: props => 
            <Controle_furtos {...props} />,
        navigationOptions: {
            title: 'Controle de Furto'
        }
    },
    Troca_devolucao:{
        name: 'Troca_devolucao',
        screen: props => 
            <Troca_devolucaos {...props} />,
        navigationOptions: {
            title: 'Trocas  & Devolução'
        }
    },
    Esquecimento:{
        name: 'Esquecimento',
        screen: props => 
            <Esquecimentos {...props} />,
        navigationOptions: {
            title: 'Esquecimento'
        }
    },
    Sangria:{
        name: 'Sangria',
        screen: props => 
            <Sangrias {...props} />,
        navigationOptions: {
            title: 'Sangria'
        }
    },
    Acerto_caixs:{
        name: 'Acerto_caixa',
        screen: props => 
            <Acerto_caixas {...props} />,
        navigationOptions: {
            title: 'Acerto de Caixas'
        }
    },
    Acesso_tesouraria:{
        name: 'Acesso_tesouraria',
        screen: props => 
            <Acesso_tesourarias {...props} />,
        navigationOptions: {
            title: 'Acesso a Tesouraria'
        }
    },
    Material_circulante:{
        name: 'Material_circulante',
        screen: props => 
            <Material_circulantes {...props} />,
        navigationOptions: {
            title: 'Material Circulante'
        }
    },
    Epi:{
        name: 'Epi',
        screen: props => 
            <Epis {...props} />,
        navigationOptions: {
            title: 'Controle de Epi'
        }
    },
    Patrimonio:{
        name: 'Patrimonio',
        screen: props => 
            <Patrimonios {...props} />,
        navigationOptions: {
            title: 'Controle de Patrimonio'
        }
    },
    Emprestimo:{
        name: 'Emprestimo',
        screen: props => 
            <Emprestimos {...props} />,
        navigationOptions: {
            title: 'Controle de Emprestimo'
        }
    },
    Manifesto:{
        name: 'Manifesto',
        screen: props => 
            <Manifestos {...props} />,
        navigationOptions: {
            title: 'Controle de Manifesto'
        }
    },
},
{
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontWeight: 'normal',
            fontSize: 20,
            color: '#000'
        },
        activeLabelStyle: {
            color: '#080',
        }
    }
});

const DrawerNavigatorConfig = {
    initialRouteName: TelaInic,
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontWeight: 'normal',
            fontSize: 20,
            color: '#000'
        },
        activeLabelStyle: {
            color: '#080',
        }
    }

}
const MainRoutes = {
    Loading: {
        name: 'Loading',
        screen: AuthOrApp
    },
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: MenuNavigator
    }
}
const MainNavigator = createSwitchNavigator(MainRoutes, {
        initialRouteName: 'Loading'
})
export default createAppContainer(MainNavigator)
