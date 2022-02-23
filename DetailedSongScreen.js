import { WebView } from "react-native-webview";

export default function DetailedSongScreen({ navigation, route}) {
    const { externalURLParam } = route.params 

    return (
        <WebView source={{ uri: externalURLParam }} />
    );
}