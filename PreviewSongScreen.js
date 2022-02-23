import { WebView } from "react-native-webview";

export default function PreviewSongScreen({ navigation, route}) {
    const { previewURLParam } = route.params 
    console.log(previewURLParam)

    return (
      <WebView source={{ uri: previewURLParam }} />
    );
}