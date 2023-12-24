import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAPIContext } from "../context/APIcontext";
import { useAppContext } from "../context/AppContext";
import { FlatList } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";
const BottomSheetChapterContainer = ({ headerComponent }) => {
  const { combineQuranData, closeRandomModal } = useAPIContext();
  const { setRandomChapterIndex, setRandomAyahIndex, randomChapterIndex } =
    useAppContext();
  const handleReadingState = (item) => {
    closeRandomModal();
    setRandomChapterIndex(item.number - 1);
    setRandomAyahIndex(0);
  };
  return (
    <View style={{ width: "90%" }}>
      <FlatList
        data={combineQuranData}
        removeClippedSubviews={true}
        alwaysBounceVertical={false}
        contentContainerStyle={{ gap: 20 }}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={SafeAreaView}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.container,

              item.number === randomChapterIndex + 1
                ? { borderWidth: 1, borderColor: "#9b6efc" }
                : "",
            ]}
            onPress={() => handleReadingState(item)}
          >
            <View style={styles.textContainer}>
              <Text
                style={[styles.text, styles.name]}
              >{`${item.number}. ${item.englishName}`}</Text>
              <Text style={[styles.text, styles.info]}>
                {item.englishNameTranslation}
              </Text>
            </View>
            <Text
              style={[styles.text, styles.verses]}
            >{`${item.ayahs.length} verses`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#19191b",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    textTransform: "capitalize",
  },
  info: {
    marginTop: 5,
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: 400,
    color: "#7d7c81",
  },
  verses: {
    fontSize: 16,
  },
});
export default BottomSheetChapterContainer;
