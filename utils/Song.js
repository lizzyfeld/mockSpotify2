
import { StyleSheet, Text, View, Image } from "react-native";

export default function Song({ id, songName, imageURL}) { //({ name, id, index, imageURL, title, artist, albumName, duration }) {
    return (
      <View style={styles.container}>
          <Text style = {{color: 'white'}}>{id}</Text>
          <Text style = {{color: 'white'}}>{songName}</Text>
          <Image source={{uri: imageURL}} style={styles.imageStyle}/> 
          {/* <View style={styles.songTitleAndArtist}>
            <Text>{title}</Text>
            <Text>{artist}</Text>
          </View>
          <Text>{albumName}</Text>
          <Text>{duration}</Text> */}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        alignItems: 'center',
        width: '100%',
    },
    imageStyle: {
        height: '50',
        width: '50',
    },
    songTitleAndArtist: {

    },
});