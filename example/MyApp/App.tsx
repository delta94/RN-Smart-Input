/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AppTextInput from './Component/AppTextInput';



const App = () => {
  const [firstName,setFirstName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <StatusBar backgroundColor={'blue'} barStyle="dark-content" />
      <SafeAreaView style={styles.flex}>
        <View style={[styles.header]}>
          <Text style={[styles.title]}>React Native Smart Input</Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            padding: 20
          }}
          style={styles.scrollView}>
          <AppTextInput
          errorMessage={'* Enter valid User Name'}
            value={firstName}
            autoCapitalize={'words'}
            isFirstName={true}
            nameTitle={'Mr'}
            title={'User First Name'}
            placeholder={'Enter First Name'}
            formType={'isString'}
            autoCompleteType="off"
            marginBottom={40}
            isImportant={true}
            onTextChange={(name:string) => setFirstName(name)}
          />
          <AppTextInput
          errorMessage={'* Password is mandatory'}
            value={firstName}
            autoCapitalize={'none'}
            isFirstName={false}
            title={'Password'}
            placeholder={'Enter Password'}
            formType={'required'}
            autoCompleteType="off"
            marginBottom={40}
            isImportant={true}
            isPassword={true}
            onTextChange={(name:string) => setPassword(name)}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#EEEEEE',
    flex: 1
  },
  flex: {
    flex: 1
  },
  header: {
    padding: 16,
    height: 56,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default App;
