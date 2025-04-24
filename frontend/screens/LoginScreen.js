import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useContext, useState } from "react"
import { View,StyleSheet,TextInput,TouchableOpacity,Text } from "react-native"
import { AuthContext } from "../TheContext/AuthContext"
import { BASE_URL } from "../constants"
import AsyncStorage from "@react-native-async-storage/async-storage"







export const LoginScreen =() => {
  const {dispatch} = useContext(AuthContext)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [loginsuccess,setLoginsuccess] = useState('')
    const [errMessage, setErrMessage] = useState(false)
    const[errM,setErrM] = useState('')
    const navigation = useNavigation()

const postLogin = async() => {

  if(!username || !password){
    setErrM('complete both fields')
    return;
  }
  dispatch({type:"LOGIN_START"})

  try{
  const res = await axios.post(`${BASE_URL}/api/auth/login`,{
    username,
    password,
  })

  // const res = await axios.post('http://192.168.68.107:6000/api/auth/login',{
  //   username,
  //   password,
  // })
  console.log("Response from server:", res.data);

  const token = res.data?.token;

  if (!token){
    throw new Error('no token received from server')
  }
  await AsyncStorage.setItem('token',token)

    dispatch({ type: "LOGIN_SUCCESS", payload:res.data});
  




setPassword('')
setUsername('')
setLoginsuccess(true)
setErrM('')

 
 


  }catch(error){
     setErrMessage(true)
     setErrM('Login Failed')
    console.log('login error:', error)
    dispatch({ type: "LOGIN_FAILURE", payload: error });
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
                
                
         
         />
          <View style={styles.buttonContainer}>

          <TouchableOpacity  style={[styles.button,styles.saveButton]} onPress={postLogin}>
             <Text style={{color:'white'}} >Submit</Text>
            </TouchableOpacity>
            </View>
            <Text>{errM}</Text>
            
            
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