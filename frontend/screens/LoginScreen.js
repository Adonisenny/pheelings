import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useContext, useState } from "react"
import { View,StyleSheet,TextInput,TouchableOpacity,Text } from "react-native"
import { AuthContext } from "../TheContext/AuthContext"
import { BASE_URL } from "../constants"







export const LoginScreen =() => {
  const {dispatch} = useContext(AuthContext)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [loginsuccess,setLoginsuccess] = useState('')
    const [errMessage, setErrMessage] = useState(false)
    const[errM,setErrM] = useState('')
    const navigation = useNavigation()

const postLogin = async() => {
  
  const loginDetails = {username,password}
  if(!username && !password){
    setErrM('complete both fields')
  }
  dispatch({type:"LOGIN_START"})

  try{
  const res = await axios.post(`${BASE_URL}/api/auth/login`,loginDetails)
const otherres = res.data

 setPassword('')
setUsername('')
setLoginsuccess(true)
setErrM('')
if(res.status===200){
  dispatch({type:"LOGIN_SUCCESS",payload:otherres})
 
 
}

  }catch(error){
     setErrMessage(true)
    console.log(error)
  }

  

}


    return(
    <View style={styles.container}>
            <TextInput
                style={[styles.input]}
                placeholder="username"
                value={username}
                onChangeText={setUsername}
                multiline
                
         
         />

<TextInput
                style={[styles.input]}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                multiline
                
         
         />
          <View style={styles.buttonContainer}>

          <TouchableOpacity  style={[styles.button,styles.saveButton]} onPress={postLogin}>
             <Text style={{color:'white'}} >Submit</Text>
            </TouchableOpacity>
            </View>
            <Text>{errM}</Text>
            {errMessage &&<Text style={{color:'red'}}>try again</Text>}
            
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
  button: {
    flex: 1,
    padding: 2,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
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