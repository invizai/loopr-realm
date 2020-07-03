import React, {useState} from 'react';

import {Image, Text, Linking} from 'react-native';
import {Card} from 'react-native-elements';

export function ProductItem({product}) {
  return (
    <>
      <Card
        title={product.product_query}
        image={require('../assets/images/place.png')}>
        <Text h3>{product.product_title}</Text>
        <Text
          style={{color: 'blue'}}
          onPress={() => Linking.openURL(product.product_link)}>
          More info
        </Text>
      </Card>
    </>
  );
}