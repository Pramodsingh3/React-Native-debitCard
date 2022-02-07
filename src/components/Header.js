import React, { useState } from 'react';

import { View, Text, Image,StyleSheet,Dimensions } from 'react-native'
import color from '../assets/color'

const Header = props => {

    return (

        <View style={styles.header}>
            <View style={styles.titleImageBox}>
                <Text style={styles.titleText}>Debit Card</Text>
                <Image
                    style={styles.tineLogo}
                    source={require('../assets/logo.png')}
                />
            </View>
            <View style={styles.balancBox}>
                <Text style={styles.subtitle}>Available balance</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: 50, height: 30, backgroundColor: color.primary, borderRadius: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>S$</Text>
                    </View>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 26, marginLeft: 15 }}>{props.availableBalance}</Text>
                </View>
            </View>
        </View>


    );
}

export default Header;
const styles = StyleSheet.create({

    header: {
   
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.3,
        backgroundColor:color.primaryDark
      },

    titleImageBox:{
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20 
    },
    titleText:{  
        color: 'white',
        fontSize: 26, 
        fontWeight: 'bold' 
    },
    balancBox:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
        marginLeft: 10 
    },
    subtitle:{
         color: 'white', fontWeight: 'bold', fontSize: 18 
    },
    tineLogo:{
        height:25,
        width:25,
        
      },
})