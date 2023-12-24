import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import { useAppContext } from "../context/AppContext";
const TranslationContainer = ({ quranData, params }) => {
  const { chapterIndex, ayahIndex, randomChapterIndex, randomAyahIndex } =
    useAppContext();

  return (
    <View style={styles.translationContainer}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.translation}>
          {
            quranData?.[params ? randomChapterIndex : chapterIndex].ayahs?.[
              params ? randomAyahIndex : ayahIndex
            ].translation
          }
        </Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  translationContainer: {
    width: "100%",
    marginTop: 20,
    flex: 1,
  },
  translation: {
    fontSize: 24,
    color: "#fff",
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "urdu-font",
  },
});
export default TranslationContainer;
