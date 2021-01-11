import React, {FC, useEffect, useState} from 'react'
import {TextInput, View, Text, Button, StyleSheet} from 'react-native'
import {firebaseAuth} from "../firebase";

const LoginPage: FC = ({navigation}: any) => {
    const [inputData, setInputData] = useState({
        email: "",
        password: '',
        error: "",
    })
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        if (inputData.error.length !== 0) setIsValid(true)
    })

    const handleSubmit = async () => {
        await firebaseAuth
            .signInWithEmailAndPassword(inputData.email, inputData.password)
            .then(() => navigation.navigate("Home"))
            .catch((e) => setInputData({...inputData, error: e.message}));
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.loginText}>Login yourself</Text>
                <TextInput style={!isValid ? styles.input : styles.inputInvalid} placeholder={"Enter your E-mail"}
                           onChangeText={(text) => setInputData({...inputData, email: text})}/>
                {isValid && <Text style={styles.validation}>{inputData.error}</Text>}

                <TextInput style={!isValid ? styles.input : styles.inputInvalid} placeholder={"Enter your password"}
                           secureTextEntry={true}
                           onChangeText={(text) => setInputData({...inputData, password: text})}/>
                <Button color="#00eabd" title="Login" onPress={handleSubmit}/>

                <View style={styles.regField}>
                    <Text>Have no account?</Text>
                    <Text style={styles.regButton} onPress={() => navigation.navigate("Registration")}>Sign Up</Text>
                </View>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
    },
    input: {
        backgroundColor: "#ececec",
        borderStyle: "solid",
        borderColor: "#00eabd",
        borderWidth: 1,
        borderRadius: 4,
    },
    inputInvalid: {
        backgroundColor: "#ececec",
        borderStyle: "solid",
        borderColor: "#e40000",
        borderWidth: 1,
        borderRadius: 4,
    },
    loginText: {
        height: "20%",
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
    },
    form: {
        // height:"50%",
        display: "flex",
        minWidth: "80%",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#00eabd"
    },
    regField: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    regButton: {
        color: "#00eabd"
    },
    validation: {
        textAlign: "center",
        color: "#e40000",
        maxHeight: "80%",
        maxWidth: "80%"
    }
});

export default LoginPage;
