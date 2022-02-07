import React, { useState } from 'react';

import {View,Text,SafeAreaView,StyleSheet,Dimensions,Image} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const color = {
    primary: '#01d167',
    primaryDark: '#0c365a',
    iconBag:'#345cac'
  }
  
const SetLimit = props=> {
    const [amount,setAmount]=useState(0)
    const [isSet,setIsSet]=useState(false)
    const onChangeNumber=(n)=>{
        setAmount(n)
    }

    const SaveSpendLimit=()=>{
        AsyncStorage.setItem('debitlimit',amount.toString())
        props.navigation.navigate('Debit',{amount:amount})
    }

 
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                    <TouchableOpacity
                        style={styles.tineLogo}
                        onPress={()=>props.navigation.navigate('Debit')}
                    >
                        <Ionicons name="chevron-back-outline" size={32} color={'white'} />

                    </TouchableOpacity>
                    <Image
                        style={styles.tineLogo}
                        source={require('../assets/logo.png')}
                    />
                </View>
                <View style={{ justifyContent: 'flex-start', margin: 20 }}>
                    <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>Spending limit</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.subTitleBox}>
                    <Ionicons name="speedometer-outline" size={24} color="black" />
                    <Text style={styles.subTitleText}>Set a weeekly debit card spending limit</Text>
                </View>
                <View style={{ marginHorizontal: 20,justifyContent:'flex-start' }}>
                    <View style={{ flexDirection: 'row' ,borderBottomWidth:1,borderBottomColor:'grey',padding:5,justifyContent:'flex-start',alignItems:'center'}}>
                        <View style={{ width: 50, height: 30,borderRadius:5, backgroundColor: color.primary, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>S$</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={n=>setAmount(n)}
                            value={amount.toString()}
                            placeholder="Amount"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <Text style={styles.noteText}>Here weekly means the last 7 days-not the calendar week</Text>
                <View style={styles.numberChipBox}>
                    <TouchableOpacity style={styles.chipBox}
                    onPress={()=>onChangeNumber(5000)}
                    >
                        <Text style={styles.chipText}>S$ 5,000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chipBox}
                    onPress={()=>onChangeNumber(10000)}
                    >
                        <Text style={styles.chipText}>S$ 10,000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chipBox}
                    onPress={()=>onChangeNumber(15000)}
                    >
                        <Text style={styles.chipText}>S$ 15,000</Text>
                    </TouchableOpacity>
                   
                </View>
                <View style={styles.saveBtn}>
                <TouchableOpacity 
                onPress={()=>SaveSpendLimit()}
                style={styles.btn}>
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

        );
}

const styles = StyleSheet.create({

    container: {
      flex: 1, 
      backgroundColor: '#000'
    },
    header: {
      
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height*0.25,
      backgroundColor:color.primaryDark
    },
    body:{
        flex:1,
        borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: -20,
        zIndex:1000,
        backgroundColor:'#fff'
    },
    tineLogo:{
        height:35,
        width:35,
        
      },
    subTitleBox:{
        flexDirection:'row',
        marginLeft:20,
        padding:5,
        marginTop:30,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    subTitleText:{
        marginLeft:10,
        fontSize:16,
        fontWeight:'bold',
        color:'black'
    },
    input: {
        height: 50,
        marginLeft: 12,
        fontSize:24,
        fontWeight:'bold',
        color:'black'
        
        
      },
    noteText:{
        margin:20
    },
    numberChipBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:20,
        
    },
    chipBox:{
        width:Dimensions.get('window').width*0.28,
        height:50,
        padding:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#e6fff2",
        borderRadius:5
    },
    chipText:{
        fontWeight:'bold',
        color:color.primary
    },
    saveBtn:{
        width:Dimensions.get('window').width*0.7,
        height:60,
        padding:10,
        position:'absolute',
        bottom:30,
        left:Dimensions.get('window').width*0.15,
        right:Dimensions.get('window').width*0.15,
        backgroundColor:color.primary,
        elevation:10,
        borderRadius:40,
        justifyContent:'center',
        alignItems:'center'

    }
    ,
    btn:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%'
    },
    btnText:{
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    }
})
export default SetLimit;