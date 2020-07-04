import React,{useState, useRef} from 'react';
import {Text, View, Dimensions, ScrollView, StyleSheet} from 'react-native';

import Swiper from 'react-native-swiper';

import {useAuth} from '../providers/AuthProvider';
import {useProducts} from '../providers/ProductsProvider';
import ProductItem from '../components/ProductItem';
import { Button } from 'react-native-elements';

const {width} = Dimensions.get('window');

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{color: 'grey'}}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  );
};

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
    return (
      <>
      <Text h2>{this.props.project.name}</Text>
      <Swiper 
        ref={ this.swiperRef }
        style={styles.wrapper}
        renderPagination={renderPagination}
        loop={false}
      >
       {this.props.products.map((product,i) => (
          <ProductItem 
          index={i}
          next={e=>this.state.swiper.scrollBy(1, true)}
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
  const {products, setProductFeedback} = useProducts();

  let [inProgress, setInProgress] = useState(false);

  const saveAnnotation = () => {
    // setInProgress(true);
    // let pMap = products.reduce((a, x) => ({...a, [x._id]: x}), {});
    // reviewedProducts.forEach(p => {
    //   let product = pMap[p._id];
    //   if (product === undefined) {
    //     setProductFeedback(product, p.relevance);
    //   }
    // });
    // setReviewedProducts([]);
    // setInProgress(false);
  }

  return (
    <SwiperComponent project={project} logout={logOut} products={products} />
  );
}


const styles = StyleSheet.create({
  wrapper: {},
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
  }
})