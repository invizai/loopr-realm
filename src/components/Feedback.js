import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {useProducts} from '../providers/ProductsProvider';
import { buttonStyles, colors } from '../../theme';

function Feedback({product}) {

  const {setProductFeedback} = useProducts();

  let options = [
    {title: 1, text: 'Off-Topic'},
    {title: 2, text: 'Acceptable'},
    {title: 3, text: 'Good'},
    {title: 4, text: 'Excellent'},
  ];

  const [selectedOption, setselectedOption] = useState(product.relevance)

  const saveOption = (title) => {
    setselectedOption(title)
    setTimeout(()=>{
      setProductFeedback(product, title);
    },10)
  } 

  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.question}>Q: How well does this query match result?</Text>
      <View style={{flexDirection: 'row'}}>
        {options.map(option => (
          <OptionButton
            key={option.title}
            text={option.text}
            title={option.title}
            saveOption={saveOption}
            selected={selectedOption == option.title}
          />
        ))}
      </View>
    </View>
  );
}

export default React.memo(Feedback)

export function OptionButton({title, text, saveOption, selected}) {
  let bStyle = {height:50,width:50,borderRadius:25,borderWidth:3};
  const selectedStyle = {
      backgroundColor:colors.secondary,
  }
  return (
    <View style={{flexDirection: 'column', margin: 10,flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Button {...buttonStyles.outline} buttonStyle={{...bStyle,...selected?selectedStyle:{}}}
       titleStyle={{color:"#fff"}} title={"" + title} 
       onPress={() => saveOption(title)}
       />
      <Text style={{fontSize: 12,color:"#fff",paddingTop:5}}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    question:{
        color:"#fff",
        borderColor:"#fff",
        borderRadius:5,
        borderWidth:1,
        marginBottom:10,
        borderColor:"#fff",
        borderRadius:5,
        padding:10,
        fontSize: 14,
        textAlign:"center",
        textTransform:"capitalize"
      }
})