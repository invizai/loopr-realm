import React, {useState} from 'react';

import {Linking, ActivityIndicator} from 'react-native';
import {Text, Card, Image} from 'react-native-elements';

import {Feedback} from '../components/Feedback';

export function ProductItem({product}) {
  return (
    <>
      <Card>
        <Text h4>Query: {product.query}</Text>
        <Image
          source={{
            uri: product.product_image,
          }}
          style={{width: 300, height: 300, marginTop: 10, marginBottom: 10}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text h5>Result title: {product.product_title}</Text>
        <Text
          style={{color: 'blue'}}
          onPress={() => Linking.openURL(product.product_link)}>
          More info
        </Text>
        <Feedback product={product} />
      </Card>
    </>
  );
}
