import React from 'react';
import { Button, TouchableOpacity, View, StyleSheet } from 'react-native';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/AntDesign';
import SyncStorage from 'sync-storage';
import feedsEstaticos from '../../assets/dicionarios/feeds.json';
import avatar from '../../assets/imgs/mirauto.jpg';
import slide1 from '../../assets/imgs/slide1.png';
import slide2 from '../../assets/imgs/slide2.png';
import slide3 from '../../assets/imgs/slide3.png';
import {
    Avatar,
    Cabecalho,
    CentralizadoNaMesmaLinha,
    DescricaoProduto,
    Espacador,
    EsquerdaDaMesmaLinha,
    Likes,
    NomeEmpresa,
    NomeProduto
} from '../../assets/styles';
import Compartilhador from '../../components/Compatilhador';
export default class Detalhes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedId: this.props.navigation.state.params.feedId,
      feed: null,

      gostou: false,
    };
  }

  carregarFeed = () => {
    const {feedId} = this.state;

    const feeds = feedsEstaticos.feeds;
    const feedsFiltrados = feeds.filter(feed => feed._id === feedId);
    if (feedsFiltrados.length) {
      this.setState({
        feed: feedsFiltrados[0],
      });
    }
  };

  componentDidMount = () => {
    this.carregarFeed();
  };

  mostrarSlides = () => {
    const slides = [slide1, slide2, slide3];

    return (
      <SliderBox
        dotColor={'#ffad05'}
        inactiveDotColor={'#5995ed'}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        dotStyle={{
          width: 15,
          height: 15,

          borderRadius: 15,
          marginHorizontal: 5,
        }}
        images={slides}
      />
    );
  };

  like = () => {
    const {feed} = this.state;
    const usuario = SyncStorage.get('user');

    console.log('adicionando o like do usuário: ' + usuario.name);
    feed.likes++;

    this.setState(
      {
        feed: feed,
        gostou: true,
      },
      () => {
        Toast.show('Obrigado pela sua avaliação!', Toast.LONG);
      },
    );
  };

  dislike = () => {
    const {feed} = this.state;
    const usuario = SyncStorage.get('user');

    console.log('removendo o like do usuário: ' + usuario.name);
    feed.likes--;

    this.setState({
      feed: feed,
      gostou: false,
    });
  };

  render = () => {
    const {feed, gostou} = this.state;
    const usuario = SyncStorage.get('user');

    if (feed) {
      return (
        <>
          <Header
            leftComponent={
              <Icon
                size={28}
                name="left"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            }
            centerComponent={
              <CentralizadoNaMesmaLinha>
                <Avatar source={avatar} />
                <NomeEmpresa>{feed.company.name}</NomeEmpresa>
              </CentralizadoNaMesmaLinha>
            }
            rightComponent={
              <CentralizadoNaMesmaLinha>
                <Compartilhador feed={feed} />
                <Espacador />
                {gostou && usuario && (
                  <Icon
                    name="heart"
                    size={28}
                    color={'#ff0000'}
                    onPress={() => {
                      this.dislike();
                    }}
                  />
                )}
                {!gostou && usuario && (
                  <Icon
                    name="hearto"
                    size={28}
                    color={'#ff0000'}
                    onPress={() => {
                      this.like();
                    }}
                  />
                )}
              </CentralizadoNaMesmaLinha>
            }
            containerStyle={Cabecalho}
          />
          <CardView cardElevation={2} cornerRadius={0}>
            {this.mostrarSlides()}
            <View style={{padding: 8}}>
              <Espacador />
              <NomeProduto>{feed.product.name}</NomeProduto>
              <DescricaoProduto>{feed.product.description}</DescricaoProduto>
              <Espacador />
              <EsquerdaDaMesmaLinha>
                <Icon name="heart" size={18} color={'#ff0000'}>
                  <Likes> {feed.likes}</Likes>
                </Icon>
                <Espacador />
                {usuario && (
                  <Icon
                    name="message1"
                    size={18}
                    onPress={() => {
                      this.props.navigation.navigate('Comentarios', {
                        feedId: feed._id,
                        empresa: feed.company,
                        produto: feed.product,
                      });
                    }}
                  />
                )}
              </EsquerdaDaMesmaLinha>
              <Espacador />
                <TouchableOpacity >
                  <Button
                    title="Deseja marcar um horário??" onPress={() => this.props.navigation.navigate('Agendamento') }></Button>
                </TouchableOpacity>
            </View>
          </CardView>
        </>
      );
    } else {
      return null;
    }
  };
}
