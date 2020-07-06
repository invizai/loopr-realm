import React,{useState, useRef} from 'react';
import {View, Dimensions, ScrollView, StyleSheet} from 'react-native';

import Swiper from 'react-native-swiper';

import {useAuth} from '../providers/AuthProvider';
import {useProducts} from '../providers/ProductsProvider';
import ProductItem from '../components/ProductItem';
import { Button,Text} from 'react-native-elements';
import { colors, buttonStyles } from '../../theme';

const {width} = Dimensions.get('window');


export default class SwiperComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      swiper:null
    }
    this.swiperRef = swiper => this.state.swiper = swiper
    this.scrollHandler = page => {
      console.log ('Page ',page,this.state.swiper)
      this.state.swiper && this.state.swiper.scrollBy(page, true)
    }
  }
  
  render() {
    const renderPagination = (index, total, context) => {
      return (
        <View style={styles.paginationStyle}>
          <Text style={{color: 'white'}}>
            <Text style={styles.paginationText}>{index + 1}</Text>/{total}
          </Text>
        </View>
      );
    };
    return (
      <>
      <View  style={styles.project}>
      <Text style={{color:"#fff",fontSize:25}}>{this.props.project.name}</Text>
      <Button  title="Save" />
      </View>
      <Swiper 
        ref={ this.swiperRef }
        style={styles.wrapper}
        renderPagination={renderPagination}
        loop={false}
      >
       {this.props.products.slice(0,10).map((product,i) => (
         
          <ProductItem 
          index={i}
          next={e=>this.state.swiper.scrollBy(2,true)}
          prev={e=>this.state.swiper.scrollBy(-1, true)}
           key={`${product._id}`} product={product} />
        ))}
      </Swiper>
      </>
    )
  }
}

export function ProductsView({project}) {
  const {logOut} = useAuth();
  const {products} = useProducts();

  return (
    <SwiperComponent project={project} logout={logOut} products={products} />
  );
}


const styles = StyleSheet.create({
  wrapper: {
    backgroundColor:'white',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  project:{
    padding:20,
    paddingBottom:11,
    backgroundColor:'#17202A',
    justifyContent:"space-between",
    flexDirection:"row"
  },
  paginationStyle:{
    justifyContent:'center',
    alignItems:"center",
    padding:10,
    backgroundColor:colors.primary
  }
})