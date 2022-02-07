import { StyleSheet, Text, SafeAreaView, Image, Pressable, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors"
//import { FlatList } from "react-native-web";
import Song from "./utils/Song"
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
    console.log(tracks)
    return (
      <FlatList
          data={tracks} // the array of data that the FlatList displays
          renderItem={({item}) => renderItem(item)} // function that renders each item
          keyExtractor={(item) => item.id} // unique key for each item
      />
    );
  }

  const renderItem = (item) => (
    <Song
      id={item.id}
      songName={item.name}
      imageUrl={item.imageUrl} />
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

  let contentDisplayed = null;

  if (token) {
    contentDisplayed = <SongList/>
  } else {
    contentDisplayed = <SpotifyAuthButton/>
  }

  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
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
  }
});
