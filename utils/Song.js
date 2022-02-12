
import { StyleSheet, Text, View, Image } from "react-native";

export default function Song({ id, songName, artist, albumName, idx, img, duration}) {
    return (
      <View style={styles.container}>
          <View style={styles.indexContainer}>
            <Text style={styles.songTitleAndArtist}>{idx}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: img}} style={styles.imageStyle}/> 
          </View>
          <View style={styles.titleAndArtistContainer}>
            <Text style={[styles.songTitleAndArtist, {fontWeight: 'bold'}]} numberOfLines={1}>{songName}</Text>
            <Text style={styles.songTitleAndArtist} numberOfLines={1}>{artist}</Text>
          </View>
          <View style={styles.albumNameConainer}>
            <Text style={styles.songTitleAndArtist} numberOfLines={1}>{albumName}</Text>
          </View>
          <View style={styles.durationContainer}>
            <Text style={{color: 'white', margin: '1%'}}>{duration}</Text>
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        margin: '1%',
    },
    imageContainer: {
        backgroundColor: 'white',
        width: '20%',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: '100%',
        width: '100%',
        //resizeMode: 'contain'
    },
    songTitleAndArtist: {
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleAndArtistContainer: {
        width: '30%',
        flex: 3,
        justifyContent: 'center',
        margin: '1%',
    },
    albumNameConainer: {
        flex: 2,
        justifyContent: 'center',
        margin: '1%',
    },
    indexContainer: {
        width: '10%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1%',
    },
    durationContainer: {
        width: '10%',
        flex: 1,
        justifyContent: 'center',
        margin: '1%',
    }
});