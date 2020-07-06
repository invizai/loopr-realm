import * as React from 'react';
import { Text, Image, ImageBackground, Button, TextInput, Dimensions, TouchableOpacity, View, StyleSheet, SafeAreaView, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import * as Progress from 'react-native-progress';

import Icons1 from 'react-native-vector-icons/AntDesign';
import Icons2 from 'react-native-vector-icons/Ionicons'
import { Container, Header, Left, Body, Right, Title, Subtitle, Icon, CardItem } from 'native-base';
import { ClipPath } from 'react-native-svg';
const { width, height } = Dimensions.get('window');
const SummaryView = ({ navigation, project, products }) => {


    // variables related to products
    const [totalAnnotations, setTotalAnnotations] = React.useState(products.length);
    const [completedAnnotations, setCompeletedAnnotations] = React.useState((products.filter(product => product.relevance != 0)).length);

    // variables for relevance

    const [countOffTopic, setCountOffTopic] = React.useState((products.filter(product => product.relevance == 1)).length);
    const [countAcceptable, setCountAcceptable] = React.useState((products.filter(product => product.relevance == 2)).length);
    const [countGood, setCountGood] = React.useState((products.filter(product => product.relevance == 3)).length);
    const [countExcellent, setCountExcellent] = React.useState((products.filter(product => product.relevance == 4)).length);
    // console.log((products.filter( product => product.relevance == 0)).length);

    const annotationsPending = totalAnnotations - completedAnnotations;
    // variables related to products

    return (
        <SafeAreaView style={mainStyle.wrapperBackground}>
            <Container>
                <ScrollView style={[mainStyle.wrapperBackground, { marginBottom: 120 }]}>

                    <TouchableWithoutFeedback >
                        <View style={[mainStyle.card, mainStyle.boxShadow]}>
                            <View style={mainStyle.cardHeader, mainStyle.row}>
                                <Image source={require('../assets/project.png')} style={{ width: 60, height: 60 }} />
                                <Text style={{ lineHeight: 60, marginHorizontal: 5, fontSize: 15 }}>Search Relevancy</Text>
                            </View>
                            <View style={mainStyle.cardBody, mainStyle.row}>
                                <Left>
                                    <View style={mainStyle.projectDetail}>
                                        <Text style={mainStyle.projectDetailTitle}>{project.name} </Text>
                                        <Text>Started : {new Date(project.date).toDateString()}</Text>
                                    </View>
                                </Left>

                            </View>
                            <View style={mainStyle.sumCard}>
                                <View style={mainStyle.sumCardProgress}>
                                    <CardItem>
                                        <Left></Left>
                                        <Right><Text>Total Annotations: {totalAnnotations}</Text></Right>

                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Progress.Bar progress={completedAnnotations / totalAnnotations} width={width - 90} useNativeDriver={true} />

                                        </Body>
                                    </CardItem>
                                </View>
                                <View style={mainStyle.sumCardDetail}>
                                    <CardItem><Left><Text>Annotations Completed</Text></Left><Right><Text>{completedAnnotations}</Text></Right></CardItem>
                                    <CardItem><Left><Text>Annotations Pendings</Text></Left><Right><Text>{annotationsPending}</Text></Right></CardItem>
                                </View>

                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback >
                        <View style={[mainStyle.card, mainStyle.boxShadow]}>
                            <View style={mainStyle.cardHeader, mainStyle.row}>
                                <Text style={{ lineHeight: 40, marginHorizontal: 0, fontSize: 20, fontWeight: 'bold' }}>Score Overview</Text>
                            </View>
                            <View style={mainStyle.sumCardDetail}>
                                <CardItem>
                                    <Left>
                                        <Text numberOfLines={1}>Excellent</Text>
                                    </Left>
                                    <Body style={{ paddingVertical: 12, }}>
                                        <Progress.Bar progress={countExcellent / completedAnnotations} width={width / 2.5} borderRadius={1} borderWidth={0.5} useNativeDriver={true} />
                                    </Body>
                                    <Right>
                                        <Text> {countExcellent}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text numberOfLines={1}>Good</Text>
                                    </Left>
                                    <Body style={{ paddingVertical: 12, }}>
                                        <Progress.Bar progress={countGood / completedAnnotations} width={width / 2.5} borderRadius={0} borderWidth={0.5} useNativeDriver={true} />
                                    </Body>
                                    <Right>
                                        <Text> {countGood}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text numberOfLines={1}>Acceptable</Text>
                                    </Left>
                                    <Body style={{ paddingVertical: 12, }}>
                                        <Progress.Bar progress={countAcceptable/ completedAnnotations} width={width / 2.5} borderRadius={0} borderWidth={0.5} useNativeDriver={true} />
                                    </Body>
                                    <Right>
                                        <Text> {countAcceptable}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text numberOfLines={1}>Off-Topic</Text>
                                    </Left>
                                    <Body style={{ paddingVertical: 12, }}>
                                        <Progress.Bar progress={countOffTopic/ completedAnnotations} width={width / 2.5} borderRadius={0} borderWidth={0.5} useNativeDriver={true} />
                                    </Body>
                                    <Right>
                                        <Text>{countOffTopic}</Text>
                                    </Right>
                                </CardItem>

                            </View>

                        </View>

                    </TouchableWithoutFeedback>

                    <TouchableOpacity style={mainStyle.btn}>
                        <Text style={mainStyle.buttonText} onPress={() =>
                            navigation.navigate('Products', {
                                projectId: project._id,
                                projectName: project.name,
                            })
                        }
                            project={project}
                        >
                            Start Annotations</Text>
                        <Icons1 name="arrowright" size={20} color='white' style={{ textAlignVertical: 'center' }} />
                    </TouchableOpacity>

                </ScrollView>

            </Container>

        </SafeAreaView>

    )

}


const mainStyle = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,
        marginTop: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#e5e5e5',
        borderWidth: 0,
        marginHorizontal: 10,
        width: width - 40,

    },
    boxShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
    },
    cardBody: {
        paddingVertical: 0,
    },
    projectDetail: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    projectDetailTitle: {
        fontFamily: 'Almarai-Bold',
        fontSize: 20,
    },
    wrapperBackground: {
        backgroundColor: '#063f57',
        height: height,
        color: 'white',

    },

    row: {

        flexDirection: 'row',
    },
    btn: {
        backgroundColor: '#2698fb',
        color: 'white',
        padding: 2,
        alignSelf: 'center',
        width: 200,
        margin: 20,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    buttonText: {

        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 8,
        marginHorizontal: 10,

    },
})

export default SummaryView;