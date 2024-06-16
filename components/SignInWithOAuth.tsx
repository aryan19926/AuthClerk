import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, StyleSheet, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

// Complete any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  // Warm up the Android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        if (setActive) {
          await setActive({ session: createdSessionId });
        } else {
          console.error("setActive is undefined");
        }
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow]);

  return (
    <View style={styles.container}>
      <Button
        title="Sign in with Google"
        onPress={onPress}
        color={styles.button.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    color: "#4285F4", // Google's blue color
  },
});

export default SignInWithOAuth;
