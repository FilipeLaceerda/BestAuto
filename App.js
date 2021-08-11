import React from "react";
import { StatusBar } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {Agendamento} from './src/screens/Agendamento';
import Detalhes from "./src/screens/Detalhes";
import Feeds from "./src/screens/Feeds";



const Navegador = createStackNavigator(
  {
    Feeds: { screen : Feeds },
    Detalhes: { screen: Detalhes },
    Agendamento: { screen: Agendamento }
  },
  {
    headerMode: 'none'
  }
);

const Contenedor = createAppContainer(Navegador);

export default function App() {
  return(
    <MenuProvider>
      <StatusBar barStyle="dark-content" />
      <Contenedor />
    </MenuProvider>
  )
}