import React from 'react';

import {Image, Text, Linking, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {buttonStyles, colors} from '../../theme';
import Feedback from '../components/Feedback';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

function ProductItem(props) {
  const {product, prev, next, index} = props;
  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{flexGrow: 1}}>
          <Text h4 style={{...styles.query, ...styles.border}}>
            Query : {product.query}
          </Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: product.product_image}}
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
          </View>
          <Text h3 style={styles.title}>
            Result title : {product.product_title}
          </Text>
          <Text h5>ID: {product.product_id}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Linking.openURL(product.product_link)}>
            <Text
              style={{
                color: colors.secondary,
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              More Info
            </Text>
          </TouchableOpacity>
          <Feedback product={product} />
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{textAlign: 'center', color: '#fff'}} h4>
            Swipe to view next item
          </Text>
        </View>
      </View>
    </>
  );
}

export default React.memo(ProductItem);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20,
    flex: 1,
  },
  title: {
    color: '#fff',
    paddingVertical: 10,
  },
  query: {
    padding: 10,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  border: {
    color: '#fff',
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#fff',
    borderRadius: 5,
  },
});
