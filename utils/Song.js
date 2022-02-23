
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from "../Themes/colors"

export default function Song({ songName, artist, albumName, img, duration, item }) {
    const navigation = useNavigation();
    
    return (
      <Pressable onPress={() => navigation.navigate('DetailedSongScreen', {externalURLParam: item.external_urls.spotify})}> 
        <View style={styles.container}> 
            <View style={styles.indexContainer}>
              <Pressable onPress={(e) => {
                e.stopPropagation()
                navigation.navigate('PreviewSongScreen', {previewURLParam:  item.preview_url})
                }}> 
                <Ionicons name="play-circle" size={32} color={Colors.spotify} />
              </Pressable>
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
      </Pressable>
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
        width: '20%',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: undefined,
        width: "100%",
        aspectRatio: 1,
        resizeMode: 'contain'
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