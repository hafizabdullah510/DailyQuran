import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Loading } from "../components";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAPIContext } from "../context/APIcontext";
import { useAppContext } from "../context/AppContext";
import NetInfo from "@react-native-community/netinfo";
const FetchScreen = ({ navigation }) => {
  const { userState } = useAppContext();
  const { getQuranData, quranDataLoading, isInternetConnected } =
    useAPIContext();
  useEffect(() => {
    AsyncStorage.getItem("firstTimeRan").then((value) => {
      console.log(value);
      if (value === null) {
        getQuranData();
        AsyncStorage.setItem("firstTimeRan", "true");
      }
    });
  }, []);
  console.log("Internet", isInternetConnected);
  const goToHome = async () => {
    await AsyncStorage.setItem("userState", JSON.stringify(userState));
    navigation.navigate("Root");
  };
  return (
    <View style={styles.loading}>
      <Image
        source={require("../assets/Logo.png")}
        style={{
          width: 250,
          height: 250,
          objectFit: "cover",
        }}
      />
      {quranDataLoading && (
        <View>
          <Text
            style={
              (styles.text,
              {
                fontSize: 20,
                color: "#fff",
                fontWeight: "500",
                marginBottom: 20,
              })
            }
          >
            Fetching Data...
          </Text>
          <Loading />
        </View>
      )}
      {!quranDataLoading && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goToHome}>
            <Text style={[styles.text, styles.buttonText]}>get started</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  loading: {
    backgroundColor: "#111111",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "90%",
    backgroundColor: "#9b6efc",
    position: "absolute",
    bottom: 30,
    borderRadius: 8,
    paddingVertical: 10,
  },
  buttonText: {
    textTransform: "capitalize",
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default FetchScreen;
