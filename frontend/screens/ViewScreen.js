import { useRoute } from "@react-navigation/native"
import React, { useState,useEffect, } from "react"
import { Text,View,StyleSheet, Modal,TouchableOpacity } from "react-native"

import axios from "axios"

import { TheformThread } from "./theFormThread"
import { UseThreadContext } from "../hooks/threadhook.js"

import { BASE_URL } from "../constants.js"






export const ViewScreen = () => {
const[content,setContent] =useState('')

const{thread, dispatch} =UseThreadContext()
const [ismodalVisible,setIsModalVisible] =useState(false)
const route = useRoute()
const {id} = route.params;


useEffect(() => {
    const fetchit = async() => {
  
  
        try {
        const response = await axios.get(`${BASE_URL}/api/content/${id}`)
        
        const thecontent = response.data
        setContent(thecontent)
    
       
    
       } catch (error) {
        console.log("could not get content", error)
       }
    }
    fetchit()
},[id])
const onCancel =()=>{
  setIsModalVisible(false)
}









useEffect(() => {
  const fetchit = async() => {


      try {
      const response = await axios.get(`${BASE_URL}/api/thread/${id}`)
      
      const thethread = response.data
    
  
       
 dispatch({type:'SET_THREAD',payload:thethread})
  
     } catch (error) {
      console.log("could not get thread", error)
     }
  }
  fetchit()
},[id])

const formattedDate = new Date(content?.updatedAt).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});



const threadDate = thread?.map((threa) => {
  const formattedDateThread = new Date(threa?.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formattedDateThread
})




    return(
        <View style={styles.container}>
<View style={styles.viewContainer}>

    <Text style={[styles.ViewContent,{marginBottom:10}]}>{content?.content}</Text>
     <Text style={styles.entryDate}>{formattedDate}</Text>
  
</View>
{thread?.map((threa,index) =>(

  
<View style={styles.viewthreadcon} key={threa?._id}>

  
<Text style={styles.Viewthread} key={threa?._id}>{threa?.thethread}</Text>
<Text style={styles.entryDate}>
  
  {new Date(threa?.updatedAt).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})}
  
  
  </Text>


</View>))}


<TouchableOpacity style={styles.addButton}  onPress={() => setIsModalVisible(true)}>
                <Text style={styles.addButtonText}>+ add new thread</Text>
            </TouchableOpacity>


 <Modal
            animationType='slide'
            transparent={true}
            visible={ismodalVisible}
            style={styles.modal}
             onRequestClose={() => setIsModalVisible(false)}
            
            >
             <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
              
                <TheformThread onCancel={onCancel} style={styles.form} ismodalVisible={ismodalVisible} setIsModalVisible={setIsModalVisible}/>
                </View>
                </View>
              </Modal>

</View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#627e8b',
        padding: 16,
        borderRadius: 12,
        elevation:3,
      },
      
        entryDate: {
          fontSize: 12,
          color: '#6c757d',
          textAlign:'right'
        

      },
      addButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#184b29',
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 24,
        elevation: 3,
      },
      addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      },
    viewContainer: {
        backgroundColor: '#d2cccc',
        color:'white',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#184b29',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      ViewContent: {
        fontSize: 14,
        color: 'black',
      },
      viewthreadcon: {
        backgroundColor: '#d2cccc',
        color:'white',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#184b29',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        
      },
      Viewthread: {
        fontSize: 14,
        color: 'black',
      },
      modalContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
       
  
      }

})