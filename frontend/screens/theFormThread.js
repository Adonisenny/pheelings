import { useState } from "react"
import {TouchableOpacity,View,Text,StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native"

import { TextInput } from "react-native-gesture-handler";
import axios from 'axios'
import { UseThreadContext } from "../hooks/threadhook";
import React from "react";
import { BASE_URL } from "../constants";






export const TheformThread = ({onCancel,ismodelVisible,setIsModalVisible}) =>{
  const {dispatch} =UseThreadContext()
const [thethread,setThread] =useState('')

const route = useRoute()
const {id} = route.params;
const myid = id


const theinfo = {myid,thethread}


 const handleSave =async() =>{
  try {
    const postthread = await axios.post(`${BASE_URL}/api/thread`,theinfo)
    const otherinfo = postthread.data
 if (postthread.status===200){

    dispatch({type:'CREATE_THREAD',payload:otherinfo})
    setIsModalVisible(false)
    

 }

  
  } catch (error) {
    console.log(error)
  }
 }
return (
    <View>
     
     <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Thread"
        value={thethread}
        onChangeText={setThread}
        multiline
        
 
 />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
        <Text style={styles.buttonText}>save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

        </View>
            
       


    </View>
)


}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
      padding: 16,
    },
    dateButton: {
      backgroundColor: '#e9ecef',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      alignItems: 'center',
    },
    dateText: {
      fontSize: 16,
      color: '#495057',
    },
    input: {
      backgroundColor: '#ffffff',
      padding: 12,
      borderRadius: 8,
  
      marginBottom: 16,
      fontSize: 16,
      color: '#212529',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    textArea: {
      height: 280,
      width:280,
      textAlignVertical: 'top',
      backgroundColor:'#eaedf0',
      
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      padding: 6,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    saveButton: {
      backgroundColor: '#184b29',
    },
    cancelButton: {
      backgroundColor: '#dc3545',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 8,
      fontWeight: 'bold',
    },
  });
  

  