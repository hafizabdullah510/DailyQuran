import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAppContext } from "../context/AppContext";
const tafsirs = [
  {
    id: 160,
    name: "Tafsir Ibn Kathir",
    author: "Hafiz Ibn Kathir",
  },
  {
    id: 157,
    name: "Fi Zilal al-Quran",
    author: "Sayyid Ibrahim Qutb",
  },
  {
    id: 159,
    name: "Tafsir Bayan ul Quran",

    author: "Dr. Israr Ahmad",
  },
];
const TafsirScreenContainer = () => {
  const { setUserState, tafsirInfo, userState } = useAppContext();

  return (
    <View style={styles.container}>
      <FlatList
        data={tafsirs}
        numColumns={1}
        alwaysBounceVertical={false}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.reciterButton,
              tafsirInfo.id === item.id
                ? { borderWidth: 1, borderColor: "#9b6efc" }
                : {},
            ]}
            onPress={() =>
              setUserState({
                ...userState,
                tafsir_id: item.id,
                tafsir_name: item.name,
                tafsir_author: item.author,
              })
            }
          >
            <Text
              style={[
                styles.text,
                styles.reciterName,
                tafsirInfo.id === item.id ? { color: "#9b6efc" } : {},
              ]}
            >
              {item.author}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 20,
  },
  reciterButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#19191b",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },

  reciterName: {
    fontSize: 20,
    fontWeight: "500",
  },
});
export default TafsirScreenContainer;
