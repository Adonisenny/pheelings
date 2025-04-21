import React, { useContext, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen.js';
import AddEntryScreen from '../screens/AddEntryScreen.js';
import { LoginScreen } from '../screens/LoginScreen.js';
import { RegisterScreen } from '../screens/RegisterScreen.js';
import { AuthContext, AuthContextProvider } from '../TheContext/AuthContext.js';
import { ContentContextProvider } from '../TheContext/contentcontext.js';
import { ViewScreen } from '../screens/ViewScreen.js';
import { ThreadContextProvider } from '../TheContext/threadContext.js';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
 
  return (
    <AuthContextProvider>
      <ContentContextProvider>
        <ThreadContextProvider>
    <NavigationContainer>
    <RootNavigator />
      
    </NavigationContainer>
    </ThreadContextProvider>
    </ContentContextProvider>
    </AuthContextProvider>
  );
}


const RootNavigator = () => {
  const {user,dispatch} =useContext(AuthContext)
  useEffect(() => {
    let timeout;
    if(user){
      timeout = setTimeout(() => {
        dispatch({type:"LOGOUT"});
        AsyncStorage.removeItem('user');

      }, 5 * 60 * 1000)
    }
    return () => clearTimeout(timeout)
  },[user])


  return(
<Drawer.Navigator

// initialRouteName={user?'Login':'Home'}
             screenOptions={{
              drawerStyle: {
                backgroundColor:'#184b29',// drawer bg color
              },
              drawerActiveTintColor: '#fff',
              drawerInactiveTintColor: '#ddd',
               
            }}
>

{!user?(
<>


 <Drawer.Screen name="Login" component={LoginScreen}/>
<Drawer.Screen name="Register" component={RegisterScreen}/>
</>
):(
  <>

<Drawer.Screen name="Home" component={HomeScreen}/>
<Drawer.Screen name="View" component={ViewScreen}/>

<Drawer.Screen name="Add Entry" component={AddEntryScreen} />

</>
)}

</Drawer.Navigator>

  )

}