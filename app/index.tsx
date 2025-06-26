import { ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Button, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter();
  const [user, setUser] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);

  const handlesubmit = async ()=>{

    setLoading(true);// imitates verification from backend

    setTimeout(()=>{
      setLoading(false);
      if(user.email && user.password){
        router.push("/home");
        //if i want to send any detials to the next screen i can use this with parameters
      }
      else{
        alert("Please fill both fields.")
      }      
    }, 500)
    
  }

  return (

    <ImageBackground source={require("../assets/images/background.jpeg")} style = {styles.container}>
      <Text style = {styles.text}>Login</Text>
      {/*<Image source={{uri: "https://marcem.com.pk/wp-content/uploads/2024/03/B4U_7357-1024x681.jpg"}}
      style = {{width: 200,height: 200}}
      />*/}
      {/*<Image source={require("C:/Users/HP/Desktop/Frontend/React Native/my-app/assets/images/react-logo.png")}
      style = {{width: 200, height: 200}}
      />*/}

      <KeyboardAvoidingView behavior="padding" style = {styles.keyboardAvoider}>

        <TextInput placeholder="Email" style = {styles.textInput}
          value={user.email} 
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(val) => {setUser({...user, email: val})}}/>

        <TextInput placeholder="Password" style = {styles.textInput}
          secureTextEntry = {true}
          value={user.password}
          onChangeText={(val)=>{setUser({...user, password: val})}}/>

        <TouchableOpacity style = {styles.button} onPress={handlesubmit}>
          <Text style = {styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="blue"/>}
      </KeyboardAvoidingView>
    
      {/*<Pressable style = {styles.button}>
        <Text style = {styles.buttonText}>Submit</Text>
      </Pressable>*/}
      {/*<Button title="Submit" />Buttons can't be styled directly(not used commonly*/}

      {/*<Link href={"/home"}>Home Page</Link>*/}
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black", fontSize: 40, margin:5
  },
  textInput: {
    
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    margin: 5
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 10,
      elevation: 3, 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      margin: 5,
    },
    buttonText:{
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    keyboardAvoider:{
      width: "100%",
      alignItems: "center"
    }
})
