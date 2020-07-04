import React, {useState} from 'react';

import {Image, Text, Linking, View, } from 'react-native';
import {Card, Button,CheckBox} from 'react-native-elements';
import { buttonStyles } from '../../theme';
import Icon from "react-native-vector-icons/MaterialIcons"

export default function ProductItem(props) {
  const {product,prev,next,index} = props
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Card
        image={{uri:product.product_image}}>
        <Text h3>{product.product_title}</Text>
        <Image source={{uri:product.product_image}} style={{height:100,width:100}} />
        <Text
          style={{color: 'blue'}}
          onPress={() => Linking.openURL(product.product_link)}>
          More info
        </Text>
        <CheckBox
          title='Click Here'
          checked={checked}
          onPress={e=>setChecked(prev=>!prev)}
        />
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Button
        {...buttonStyles.solid}
        containerStyle={{alignItems:"flex-start"}}
        disabled={index<1}
        title={`Previous`} 
        onPress={()=>prev()}
        icon={()=><Icon name="arrow-back" size={20} color="#fff" style={{paddingRight:30}} />}
        />
        <Button
        {...buttonStyles.solid}
        containerStyle={{alignItems:"flex-start"}}
        title={`Next`} 
        onPress={()=>next()}
        icon={()=><Icon name="arrow-forward" size={20} color="#fff" style={{paddingLeft:30}} />}
        iconRight={true}
        />
        </View>
      </Card>
    </>
  );
}