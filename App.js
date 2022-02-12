import { StyleSheet, Text, SafeAreaView, Image, Pressable, FlatList, View} from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors"
import millisToMinutesAndSeconds from "./utils/millisToMinuteSeconds";
import Song from "./utils/Song"
import { logToConsole } from "react-native/Libraries/Utilities/RCTLog";
// TODO: import spotify button

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  function SpotifyAuthButton({}) {
    return(
      <Pressable style={styles.spotifyButton} onPress={promptAsync}>
        <Image
          source={require("./assets/spotify-logo.png")}
          style={styles.buttonImageIconStyle}
        />
        <Text style={styles.spotifyButtonText}>CONNECT WITH SPOTIFY</Text>
      </Pressable>
    );
  }
  
  function SongList() {
    return (
      <FlatList
          data={tracks} // the array of data that the FlatList displays
          renderItem={({item, index}) => renderItem(item, index)} // function that renders each item
          keyExtractor={(item) => item.id} // unique key for each item
      />
    );
  }

  function SongListView() {
    return (
      <SafeAreaView style={styles.songListContainer}>
        <View style={styles.header}>
          <Image
              source={require("./assets/spotify-logo.png")}
              style={styles.buttonImageIconStyle}
          />
          <Text style={styles.myTopTracks}>My Top Tracks</Text>
        </View>
        <SongList/>
      </SafeAreaView>
    );
  }

  function SpotifyAuthButtonView() {
    return (
      <SafeAreaView style={styles.spotifyAuthContainer}>
        <SpotifyAuthButton/>
      </SafeAreaView>
    );
  }

  const renderItem = (item, index) => (
    <Song
      id={item.id}
      idx={index + 1}
      songName={item.name}
      artist={item.artists[0].name}
      albumName={item.album.name}
      img={item.album.images[0].url}
      duration={millisToMinutesAndSeconds(item.duration_ms)}
    />
  ); 

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);

  if (token) {
    return (
      <SafeAreaView style={styles.songListContainer}>
        <SongListView/>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.spotifyAuthContainer}>
        <SpotifyAuthButtonView/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  spotifyAuthContainer: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  songListContainer: {
    backgroundColor: Colors.background,
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  spotifyButton: {
    backgroundColor: Colors.spotify,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
  },
  spotifyButtonText: {
    marginRight: '3%',
    color: 'white',
  },
  myTopTracks: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    height: '7%',
  }
});
