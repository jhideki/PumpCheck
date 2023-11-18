import React, { useRef, useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WebView from "react-native-webview";

const GoogleSignInScreen = () => {
  const navigation = useNavigation();
  const webViewRef = useRef(null);

  const handleGoogleAuth = (token) => {
    console.log("Received token: ", token);
    // Perform any additional actions you need after receiving the token
    // Example: navigation.goBack();
  };

  const handleNavigationStateChange = (newNavState) => {
    const url = newNavState.url;

    if (url.includes("token=")) {
      const token = extractTokenFromUrl(url);
      handleGoogleAuth(token);
    }
  };

  const extractTokenFromUrl = (url) => {
    const tokenParam = url.split("token=")[1];
    const token = tokenParam.split("&")[0];
    return token;
  };

  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(
        'window.location.href="https://ec2-3-19-73-100.us-east-2.compute.amazonaws.com:5000/auth/api/google_login"'
      );
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        onNavigationStateChange={handleNavigationStateChange}
        source={{ uri: "about:blank" }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default GoogleSignInScreen;
