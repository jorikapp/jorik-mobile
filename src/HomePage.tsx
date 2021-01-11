import React, {useCallback, useEffect, useState} from "react";
import {View, Text, StyleSheet, ActivityIndicator, Image, Pressable} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import {database} from "../firebase";


const HomePage = () => {

    const [play, setPlay] = useState(true)
    const [videoData, setVideoData] = useState("")

    useEffect(() => {
        (async () => {
            await database.ref("/videoId").once("value").then(snap => setVideoData(snap.val()))
        })()
        console.log(videoData)

    }, [])

    const handlePause = useCallback((state) => {
        if (state === "playing")
            setPlay(true)
        else if (state === "paused") setPlay(false)
    }, [])
    return (
        <View style={styles.mainContainer}>
            <View style={styles.videoWrapper}>
            {videoData.length === 0 ? <ActivityIndicator size={55} color={"#00eabd"}  style={{paddingTop:"20%"}}/> :
                <YoutubePlayer
                    height={300}
                    play={play}
                    videoId={videoData[0]}
                    onChangeState={handlePause}
                />}
            </View>
            <Pressable style={styles.gift} onPress={()=>alert("Happy New Year!")}>
                <Image source={require("../assets/gift.jpg")} style={{width:50, height:50}}/>
            </Pressable>
            <View style={{justifyContent: "flex-end"}}>
                <Text style={styles.ownerText}>Made by Dmitriy Zhuravlev</Text>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    mainContainer: {
        height:"100%",
        backgroundColor:"#f6f6f6",
        paddingTop: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    videoWrapper:{
        minHeight:"40%"
    },
    ownerText: {
        textAlign: 'center',
        color: "#d4d4d4",
        fontSize: 10,
        fontWeight: "bold",
        paddingBottom:30
    },
    gift:{
        alignItems:"center",
        marginBottom:"20%"
    }
})

export default HomePage;
