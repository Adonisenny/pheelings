import React, {useEffect, useState} from 'react'
import { FlatList, TouchableOpacity, View,StyleSheet,Text, Modal } from 'react-native';
import { Theform } from './formscreen.js';
import { UseContentContext } from '../hooks/contenthook.js';
import { BASE_URL } from '../constants.js';






const Home = ({navigation}) => {
  const {contents,dispatch} =UseContentContext()

    const [ismodalVisible,setIsModalVisible] =useState(false)




//fetching data
   useEffect(() => {
const fetchit = async() => {
try{
  const response = await fetch(`${BASE_URL}/api/content`)
           
  const newcontent = await response.json()
  
  
 dispatch({type:'SET_CONTENT',payload:newcontent})


}catch(error){
console.log(error)
}

    }
    fetchit()
    
  },[])


  


 


    const renderEntry =({item}) => {
      const formattedDate = new Date(item.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      
        return(

        <TouchableOpacity style={styles.entryContainer} onPress={() => navigation.navigate('View', {id:item._id})}>
   

          
              
          
            <Text style={styles.entryContent}>{item?.content?.substring(0, 50)}...</Text>
            <Text style={styles.entryDate}>{formattedDate}</Text>
            
        </TouchableOpacity>
        )
    }
  

    
    
    
    const onCancel =()=>{
      setIsModalVisible(false)
    }

  const onPressF = ()=>{
    setIsModalVisible(true)
  }

    

    return (
        <View style={styles.container}>
          
            <FlatList 
            
            data={contents}
            keyExtractor={(item) => item?._id}
            renderItem={renderEntry}
            contentContainerStyle={styles.listContent}
            
    
            />
  

           {!ismodalVisible &&
            <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.addButtonText}>+ add new experience</Text>
            </TouchableOpacity>}

            <Modal
            animationType='slide'
            transparent={true}
            visible={ismodalVisible}
            style={styles.modal}
            onRequestClose={() => setIsModalVisible(false)}
            
            >
             <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
              
                <Theform onCancel={onCancel} style={styles.form}/>
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
    listContent: {
      paddingBottom: 100,
    },
    overlay: {
      position:'absolute',
      width:'100%',
      height:'25%',
      bottom:0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black with 50% transparency
      justifyContent: 'center', // Center the content
      alignItems: 'center', // Center the content
    },
    entryContainer: {
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
    entryDate: {
      fontSize: 12,
      color: '#6c757d',
      textAlign:'right'
    },
    entryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 0,
    },
    entryContent: {
      fontSize: 14,
      color: 'black',
      marginBottom:8,
      fontFamily:'roboto'

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
    modalContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
     

    }
  });



export default Home;