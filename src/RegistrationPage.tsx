import React, {useState} from 'react'
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {firebaseAuth} from "../firebase";


const RegistrationPage = ({navigation}: any) => {
    const [inputData, setInputData] = useState({
        email: "",
        password: '',
        confirm: '',
    })
    const [isError, setError] = useState('')
    const [isConfirm, setConfirm] = useState('')


    const handleSubmit = async () => {
        if (inputData.email.length === 0) {
            setError("is required")
        }
        if (inputData.password.length === 0) {
            setConfirm("is required")
        }
        if (inputData.confirm.length === 0) {
            setConfirm("is required")
        }

        if (inputData.password === inputData.confirm && inputData.email.length !== 0) {
            await firebaseAuth
                .createUserWithEmailAndPassword(inputData.email, inputData.password)
                .then(() => navigation.navigate("Login"))
                .catch((e) => setError(e));
        } else setConfirm("Password don't match")

    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.sinUpText}>Sign Up</Text>
                <TextInput style={isError.length !== 0 ? styles.inputInvalid : styles.input}
                           placeholder={"Enter your E-mail"}
                           onChangeText={(text) => setInputData({...inputData, email: text})}/>
                {isError.length !== 0 && <Text style={styles.validation}>{isError}</Text>}
                <TextInput style={isConfirm.length !== 0 ? styles.inputInvalid : styles.input}
                           placeholder={"Enter your password"} secureTextEntry={true}
                           onChangeText={(text) => setInputData({...inputData, password: text})}/>
                {isConfirm.length !== 0 && <Text style={styles.validation}>{isConfirm}</Text>}
                <TextInput style={isConfirm.length !== 0 ? styles.inputInvalid : styles.input}
                           placeholder={"Confirm password"} secureTextEntry={true}
                           onChangeText={(text) => setInputData({...inputData, confirm: text})}/>
                <Button color="#00eabd" title="Sign Up" onPress={handleSubmit}/>
                <View style={styles.regField}>
                    <Text>Already have an account?</Text>
                    <Text style={styles.logButton} onPress={() => navigation.navigate("Login")}>Log In</Text>
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
    sinUpText: {
        height: "20%",
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
    },
    form: {
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
    validation: {
        textAlign: "center",
        color: "#e40000",
        maxHeight: "80%",
        maxWidth: "80%"
    },
    logButton: {
        color: "#00eabd"
    }
});

export default RegistrationPage;
