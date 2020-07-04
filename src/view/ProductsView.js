import React, { useState } from 'react';
import {Text, View, Dimensions, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';

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
    <>
      <Text style={{paddingLeft: 20, paddingTop: 20}} h1>{project.name}</Text>
      {inProgress ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <Swiper
        style={styles.wrapper}
        renderPagination={renderPagination}
        loop={false}>
        {products.map(product => (
          <ProductItem key={`${product._id}`} product={product} />
        ))}
      </Swiper>

      <Button title="Save Change" onPress={saveAnnotation()} />
    </>
  );
}
