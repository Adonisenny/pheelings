
import { useContext, useState } from "react"
import { View,StyleSheet,TextInput,TouchableOpacity,Text } from "react-native"
import axios from "axios"
import { AuthContext } from "../TheContext/AuthContext"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { BASE_URL } from "../constants"







export const RegisterScreen =() => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [errMessage,setErrMessage] =useState(false)
    const [errm,seterrM] = useState('')
    const {dispatch} = useContext(AuthContext)
    const navigation =useNavigation()



    const handleSubmit =async()=>{
      console.log('submit')
     
      const registerdetails = {email,username,password}
      if(!email || !username || !password){
        seterrM('No field can be left empty')
        return;
      }
      dispatch({type:"LOGIN_START"})
        try {
            
            const submitDetails = await axios.post(`${BASE_URL}/api/auth/register`,registerdetails)
            const otherjson = submitDetails.data
            setEmail('')
            setPassword('')
            setUsername('')
           
            seterrM('')
            if(submitDetails.status===200 || submitDetails.status===201){
              dispatch({payload:otherjson})
              navigation.navigate('Login')
             
            }
        } catch (error) {
           setErrMessage(true)
           console.log({error:'not working for now'})
        
        }
    }

    const loginNavigate = () =>{
      navigation.navigate('Login')
    }
    return(
    <View style={styles.container}>


        <TextInput 
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}

        
        />
            <TextInput
                style={[styles.input]}
                placeholder="username"
                value={username}
                onChangeText={setUsername}
                
                
         
         />

<TextInput
                style={[styles.input]}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                
                
         
         />
          <View style={styles.buttonContainer}>

          <TouchableOpacity  style={[styles.buttons,styles.saveButton]} 
          onPress={handleSubmit}
          
          >
             <Text style={{color:'white'}} >Submit</Text>
            </TouchableOpacity>
            </View>
            <Text style={{textAlign:'center', fontSize:15}}>If you have an account, <Text onPress={loginNavigate} style={{color:'blue'}}>Login</Text></Text>
            {errMessage && <Text>can't register</Text>}
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#184b29',
  },
  buttons: {
    flex: 1,
    padding: 2,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom:8,
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
    
      submitButton:{
        backgroundColor:'#45555C',
        borderRadius:12,
        padding:8,
        
        

      },
      submitText:{
        fontSize:12,
        color:'white'
      }
})