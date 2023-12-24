import { StyleSheet, LogBox } from "react-native";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import {
  GoalScreen,
  HomeScreen,
  QuranReadScreen,
  ReciterScreen,
  FetchScreen,
  LoadingScreen,
  Settings,
  TafsirScreen,
  MainReadScreen,
  ReadSettings,
} from "./screens";
import { MyIcon } from "./components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppProvider } from "./context/APIcontext";
import { ContextProvider } from "./context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [isRanFirstTime, setIsRanFirstTime] = useState(null);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";

  useEffect(() => {
    LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  }, []);

  const isFirstLaunched = async () => {
    // await AsyncStorage.removeItem("isFirstLaunched");
    try {
      const firstLaunched = await AsyncStorage.getItem("isFirstLaunched");
      if (firstLaunched === null) {
        setIsRanFirstTime(true);
        await AsyncStorage.setItem("isFirstLaunched", "true");
      } else {
        setIsRanFirstTime(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isFirstLaunched();
  }, []);
  function Root() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#9c6dfa",
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#101010",
            borderTopWidth: 0,
            // position: "absolute",
            // bottom: 0,
          },
          tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",

            tabBarIcon: ({ focused }) => (
              <MyIcon
                name="home-outline"
                ionIcon
                size="26"
                color={focused ? "#9c6dfa" : "#fff"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MainReadScreen"
          component={MainReadScreen}
          options={{
            tabBarLabel: "Reading",
            tabBarIcon: ({ focused }) => (
              <MyIcon
                name="book-outline"
                ionIcon
                size="26"
                color={focused ? "#9c6dfa" : "#fff"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ focused }) => (
              <MyIcon
                name="settings-outline"
                ionIcon
                size="26"
                color={focused ? "#9c6dfa" : "#fff"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <AppProvider>
      <ContextProvider>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              {isRanFirstTime === null ? (
                <LoadingScreen />
              ) : (
                <Stack.Navigator
                  initialRouteName={isRanFirstTime ? "GoalScreen" : "Root"}
                >
                  <Stack.Screen
                    name="Root"
                    component={Root}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="GoalScreen"
                    component={GoalScreen}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="ReciterScreen"
                    component={ReciterScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ReadSettings"
                    component={ReadSettings}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="TafsirScreen"
                    component={TafsirScreen}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="FetchScreen"
                    component={FetchScreen}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="ReadScreen"
                    component={QuranReadScreen}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              )}
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </ContextProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
