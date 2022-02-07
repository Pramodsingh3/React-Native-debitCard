import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';



//import { AuthContext } from '../components/context';

//import Users from '../model/users';

import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import ToggleSwitch from 'toggle-switch-react-native';
import color from '../assets/color'
import Header from '../components/Header';




const Debit = props => {

  const [cardNumber, setNumber] = useState('5647341124132020');
  const [limitSwitch, setLimitSwitch] = useState(false)
  const [debitSpendLimit, setDebitSpendLimit] = useState(props.route.params ? props.route.params : 0)
  const [visible, setVisible] = useState({
    text: "Show card number",
    visible: false,
    icon: 'eye'
  })
  useEffect(() => {
    AsyncStorage.getItem('debitlimit').then((value) => {
      if (value == null) {

        setLimitSwitch(false)
      } else {
        setLimitSwitch(true)
        setDebitSpendLimit(parseInt(value))
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)

  }, [props.route.params]);

  const onToggle = () => {
    if (visible.visible === false) {
      setVisible({
        text: 'Hide card number',
        visible: true,
        icon: 'eye-with-line'
      })
    }
    else {
      setVisible({
        text: "Show card number",
        visible: false,
        icon: 'eye'
      })
    }



  }

  const toggleSwitch = () => {
    if (limitSwitch === false) {
      setLimitSwitch(!limitSwitch)
      props.navigation.navigate('setlimit')

    }
    else {
      setLimitSwitch(!limitSwitch)
    }
  }

  return (

    <SafeAreaView style={styles.container}>
      <Header availableBalance={"3,000"} />
      <View style={styles.body}>
        <View style={styles.cardBox}>
          <View style={styles.hideshowBox}>
            <TouchableOpacity
              onPress={() => onToggle()}
              style={styles.hideshowTouch}
            >
              <Entypo name={visible.icon} size={24} color={color.primary} />
              <Text style={styles.visText}>{visible.text}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.logoTextContainer}>
            <View style={styles.hideshowBox}>
              <View style={styles.logoTextSubBox}>
                <Image
                  style={styles.tineLogo}
                  source={require('../assets/whitelogo.png')}
                />
                <Text style={styles.brandText}>aspire</Text>

              </View>
            </View>
  
            <View style={styles.userTextBox}>
              <Text style={styles.userText}>Mark Henry</Text>
            </View>
            
            <View style={styles.debitnumBox}>
              <View style={styles.numBoxOne}>
                {visible.visible ? <Text style={styles.numText}>{cardNumber.substring(0, 4)}</Text>
                  : <Text style={styles.numText}>{"...."}</Text>
                }
              </View>
              <View style={styles.numBoxTwo}>
                {visible.visible ? <Text style={styles.numText}>{cardNumber.substring(4, 8)}</Text>
                  : <Text style={styles.numText}>{"...."}</Text>
                }
              </View>
              <View style={styles.numBoxTwo}>
                {visible.visible ? <Text style={styles.numText}>{cardNumber.substring(8, 12)}</Text>
                  : <Text style={styles.numText}>{"...."}</Text>
                }
              </View>

              <View style={styles.numBoxTwo}>
                <Text style={styles.numText}>{cardNumber.substring(12, 16)}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20, marginTop: 20 }}>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{"Thru: 12/20"}</Text>
              </View>
              <View style={{ justifyContent: 'flex-start', marginLeft: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', letterSpacing: 2 }}>{visible.visible ? "CVV: 456" : "CVV: ***"}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', margin: 10 }}>

              <Image
                style={{ width: 60, height: 22 }}
                source={require('../assets/visa.png')}
                resizeMode={'contain'}
              />



            </View>
          </View>

          {limitSwitch ? <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ fontSize: 16, color: 'black' }}>debit card spendending limit</Text>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Text style={{ fontSize: 16, color: color.primary }}>$345 </Text>
                <Text>| </Text>
                <Text style={{ fontSize: 16, color: 'grey' }}>{debitSpendLimit}</Text>
              </View>
            </View>
            <Progress.Bar progress={345 / debitSpendLimit}
              borderRadius={8}
              width={Dimensions.get('window').width * 0.9} height={15} color={color.primary} />

          </View>
            : null}

          <View style={styles.listBox}>
            <View style={styles.iconBox}>
              <Feather name="upload" size={20} color="white" />
            </View>
            <View style={styles.listTextContainer}>
              <Text style={styles.listFirstText}>Top-up account</Text>
              <Text style={styles.listSecondText}>Deposit money to your account to use with card</Text>
            </View>
          </View>
          <View
            // onPress={()=>props.navigation.navigate('setlimit')}
            style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.listTextIconBox}>
              <View style={styles.iconBox}>
                <FontAwesome name="tachometer" size={20} color="white" />
              </View>
              <View style={styles.listTextContainer}>
                <Text style={styles.listFirstText}>Weekly spending limit</Text>
                <Text style={styles.listSecondText}>{limitSwitch ? `Your weekly spending limit is ${"S$ " + debitSpendLimit}` : "You havent set any spending limit on card"}</Text>
              </View>
            </View>
            <View style={styles.toggleBox}>
              <ToggleSwitch
                isOn={limitSwitch}
                onColor={color.primary}
                offColor="grey"
                size="small"
                onToggle={() => toggleSwitch()}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.listTextIconBox}>
              <View style={styles.iconBox}>
                <FontAwesome name="snowflake-o" size={20} color="white" />
              </View>
              <View style={styles.listTextContainer}>
                <Text style={styles.listFirstText}>Freeze card</Text>
                <Text style={styles.listSecondText}>Your Debit card is currently active</Text>
              </View>
            </View>
            <View style={styles.toggleBox}>
              <ToggleSwitch
                isOn={true}
                onColor={color.primary}
                offColor="grey"
                size="small"
                onToggle={isOn => console.log("changed to : ", isOn)}
              />
            </View>
          </View>
          <View style={styles.listBox}>
            <View style={styles.iconBox}>
              <Feather name="credit-card" size={20} color="white" />
            </View>
            <View style={styles.listTextContainer}>
              <Text style={styles.listFirstText}>Get a new card</Text>
              <Text style={styles.listSecondText}>This deactivates your current card</Text>
            </View>
          </View>
          <View style={styles.listBox}>
            <View style={styles.iconBox}>
              <MaterialIcons name="block" size={20} color="white" />
            </View>
            <View style={styles.listTextContainer}>
              <Text style={styles.listFirstText}>Deactivated cards</Text>
              <Text style={styles.listSecondText}>Your previously deactivated cards</Text>
            </View>
          </View>
          <View style={styles.listBox}>
            <View style={styles.iconBox}>
              <MaterialIcons name="block" size={20} color="white" />
            </View>
            <View style={styles.listTextContainer}>
              <Text style={styles.listFirstText}>Deactivated cards</Text>
              <Text style={styles.listSecondText}>Your previously deactivated cards</Text>
            </View>
          </View>
          <View style={styles.listBox}>
            <View style={styles.iconBox}>
              <MaterialIcons name="block" size={20} color="white" />
            </View>
            <View style={styles.listTextContainer}>
              <Text style={styles.listFirstText}>Deactivated cards</Text>
              <Text style={styles.listSecondText}>Your previously deactivated cards</Text>
            </View>
          </View>

        </View>

      </View>

    </SafeAreaView>
  );

};

const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,




  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -20
  },
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: color.primaryDark
  },
  footer: {

    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  tineLogo: {
    height: 25,
    width: 25,

  },
  numText:{ letterSpacing: 5, fontSize: 14, color: 'white' },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },



  listTextContainer: {
    padding: 5,
    marginLeft: 10,
    maxWidth: Dimensions.get('window').width * 0.50
  },
  toggleBox: {
    width: 70,
    height: 40,
    marginLeft: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.iconBag,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hidshowBtnBox: {

  },
  cardBox: {
    zIndex: 1000,
    position: 'relative',
    top: -Dimensions.get('window').height * 0.10,
    left: "5%", right: "5%",
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.28,
  },
  listFirstText: {
    fontSize: 14,
    color: 'black'
  },
  listSecondText: {
    fontSize: 14,
    color: 'grey'
  },
  listTextIconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  listBox: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  visText:{ marginLeft: 10, color: color.primary, fontWeight: 'bold' },

  hideshowBox: { justifyContent: 'flex-end', alignItems: 'flex-end' },
  hideshowTouch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: -8,
    backgroundColor: 'white',
    padding: 10,
  },
  logoTextContainer:{
    width: '100%',
    height: '100%', 
    borderRadius: 10, 
    backgroundColor: 
    color.primary 
  },
  logoTextSubBox:{ 
  flexDirection: 'row', 
  margin: 10, padding: 5, 
  justifyContent: 'center', 
  alignItems: 'center' 
 },
 brandText:{ color: 'white', fontSize: 20, marginLeft: 8, fontWeight: 'bold' },
 userTextBox:{ justifyContent: 'flex-start', marginLeft: 20, marginTop: 10, marginBottom: 20 },
 userText:{ color: 'white', fontSize: 24, fontWeight: 'bold' },
 debitnumBox:{ flexDirection: 'row', justifyContent: 'flex-start', maxWidth: Dimensions.get('window').width * 0.7 },
 numBoxOne:{ width: Dimensions.get('window').width * 0.2, justifyContent: 'flex-start', marginLeft: 20 },
 numBoxTwo:{ width: Dimensions.get('window').width * 0.2, justifyContent: 'flex-start', marginLeft: 15 }
});

export default Debit;