import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';

import {useProducts} from '../providers/ProductsProvider';

export function Feedback({product}) {

  const {setProductFeedback} = useProducts();

  let options = [
    {title: 1, text: 'Off-Topic'},
    {title: 2, text: 'Acceptable'},
    {title: 3, text: 'Good'},
    {title: 4, text: 'Excellent'},
  ];

  const saveOption = (title) => {
    setProductFeedback(product, title);
  } 

  return (
    <View style={{marginTop: 20}}>
      <Text h3>Q: How well does this query match result?</Text>
      <View style={{flexDirection: 'row'}}>
        {options.map(option => (
          <OptionButton
            key={option.title}
            text={option.text}
            title={option.title}
            saveOption={saveOption}
            selected={product.relevance == option.title}
          />
        ))}
      </View>
    </View>
  );
}

export function OptionButton({title, text, saveOption, selected}) {
  let bStyle = {borderRadius: 20, paddingLeft: 15, paddingRight: 15};
  if (selected) {
    bStyle['backgroundColor'] = 'lightblue';
  }
  return (
    <View style={{flexDirection: 'column', margin: 10, justifyContent: 'center', alignItems: 'center'}}>
      <Button type='outline' buttonStyle={bStyle} title={"" + title} onPress={() => saveOption(title)} />
      <Text style={{fontSize: 12}}>{text}</Text>
    </View>
  );
}
