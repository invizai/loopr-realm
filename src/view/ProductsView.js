import React from 'react';
import {Text, View, Dimensions, ScrollView} from 'react-native';

import Swiper from 'react-native-swiper';

import {useAuth} from '../providers/AuthProvider';
import {useProducts} from '../providers/ProductsProvider';
import {ProductItem} from '../components/ProductItem';

const {width} = Dimensions.get('window');

const styles = {
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width,
    flex: 1,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  paginationText: {
    color: 'teal',
    fontSize: 14,
  },
};

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{color: 'grey'}}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  );
};

export function ProductsView({project}) {
  const {logOut} = useAuth();
  const {products} = useProducts();

  return (
    <>
      <Text h2>{project.name}</Text>

      <Swiper
        style={styles.wrapper}
        renderPagination={renderPagination}
        loop={false}>
        {products.map(product => (
          <ProductItem key={`${product._id}`} product={product} />
        ))}
      </Swiper>
    </>
  );
}

/*
<Swiper
  style={styles.wrapper}
  renderPagination={renderPagination}
  loop={false}>
  {products.map(product => (
    <ProductItem key={`${product._id}`} product={product} />
  ))}
</Swiper> 
*/
