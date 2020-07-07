import * as React from 'react';
import { Text, Image, ActivityIndicator, Dimensions, TouchableOpacity, View, StyleSheet, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import * as Progress from 'react-native-progress';

import { useNavigation } from '@react-navigation/native';

import Icons1 from 'react-native-vector-icons/AntDesign';
import { Container, Left, Body, Right, CardItem } from 'native-base';
const { width, height } = Dimensions.get('window');

import {useProducts} from '../providers/ProductsProvider';

const SummaryView = ({ project }) => {

    const navigation = useNavigation();

    const {products} = useProducts();

    let progress = [0, 0, 0, 0, 0]; // Counter for Not Marked, OffTopic, Acceptable, Good, Excellent

    products.forEach(product => {
        progress[product.relevance] += 1;
    })

    let totalAnnotation = products.length;
    let markedAnnotation = totalAnnotation - progress[0];
    let pendingAnnotation = progress[0];

    const calulatePercentage = (num, deno) => {
        if (deno == 0) return 0;
        return ((num/deno) * 100).toFixed(2);
    }

    const calulateProgress = (num, deno) => {
        if (deno == 0) return 0.0;
        return (num/deno);
    }

    return (
        <>
        {products.length === 0 ? <View style={mainStyle.loading}><ActivityIndicator size='large' /></View> :
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


                                        <Left><Text>Total Annotations: {totalAnnotation}</Text></Left>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Progress.Bar progress={markedAnnotation/totalAnnotation} width={width - 90} useNativeDriver={true} />
                                        </Body>
                                    </CardItem>
                                </View>
                                <View style={mainStyle.sumCardDetail}>

                                    <CardItem><Text>Annotations Completed: {markedAnnotation}</Text></CardItem>
                                    <CardItem><Text>Annotations Pendings: {pendingAnnotation}</Text></CardItem>

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
                                        <Progress.Bar progress={calulateProgress(progress[4], markedAnnotation)} width={width /2.8} borderRadius={1} borderWidth={0.5} useNativeDriver={true} />
                                    </Body>
                                    <Right>
                                        <Text>{calulatePercentage(progress[4], markedAnnotation)} (%)</Text>

                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text numberOfLines={1}>Good</Text>
                                    </Left>
                                    <Body style={{ paddingVertical: 12, }}>
                                        <Progress.Bar progress={calulateProgress(progress[3], markedAnnotation)} width={width /2.8} borderRadius={0} borderWidth={0.5} useNativeDriver={true} />
                                    </Body>
                                    <Right>
                                        <Text>{calulatePercentage(progress[3], markedAnnotation)} (%)</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text numberOfLines={1}>Acceptable</Text>
                                    </Left>
                                    <Body style={{ paddingVertical: 12, }}>
                                        <Progress.Bar progress={calulateProgress(progress[2], markedAnnotation)} width={width /2.8} borderRadius={0} borderWidth={0.5} useNativeDriver={true} />
                                    </Body>
                                    <Right>
                                        <Text>{calulatePercentage(progress[2], markedAnnotation)} (%)</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text numberOfLines={1}>Off-Topic</Text>
                                    </Left>
                                    <Body style={{ paddingVertical: 12, }}>

                                        <Progress.Bar progress={calulateProgress(progress[1], markedAnnotation)} width={width /2.8} borderRadius={0} borderWidth={0.5} useNativeDriver={true} />
                                    </Body>
                                    <Right>
                                        <Text>{calulatePercentage(progress[1], markedAnnotation)} (%)</Text>
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
                            Start Annotation</Text>
                        <Icons1 name="arrowright" size={20} color='white' style={{ textAlignVertical: 'center' }} />
                    </TouchableOpacity>
                </ScrollView>
            </Container>
        </SafeAreaView>}
        </>
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
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SummaryView;