import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  HeaderContainer,
  Goal,
  MyIcon,
  Acheivement,
  BottomSheetChapterContainer,
  BottomSheetVerseContainer,
} from "../components";
import { useAPIContext } from "../context/APIcontext";
import { useAppContext } from "../context/AppContext";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useState, useMemo } from "react";
const data = [
  {
    icon: (
      <MyIcon name="document-text" size="48" color="#80ceff" center ionIcon />
    ),
    text: "verses",
    count: 0,
    border: "#80ceff",
  },
  {
    icon: <MyIcon name="time" size="48" color="#feb779" center ionIcon />,
    text: "time",
    count: `0s`,
    border: "#feb779",
  },
  {
    icon: (
      <MyIcon name="document-text" size="48" color="#45dac0" center ionIcon />
    ),
    text: "pages",
    count: 0,
    border: "#45dac0",
  },
];
const MainReadScreen = ({ navigation }) => {
  const { randomChapterIndex, randomAyahIndex } = useAppContext();
  const [modalType, setModalType] = useState("");
  const { combineQuranData, randomReadModalRef, presentRandomModal } =
    useAPIContext();
  const showModal = (name) => {
    if (name === "chapter") {
      setModalType("chapter");
    }
    if (name === "verse") {
      setModalType("verse");
    }
    presentRandomModal();
  };

  const bottomSheetHeader = () => {
    return (
      <View style={styles.bottomSheetHeader}>
        <Text style={[styles.text, styles.headerText]}>
          {modalType === "chapter" ? "chapter" : "verse"}
        </Text>
      </View>
    );
  };
  const header = useMemo(() => {
    return (
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{ width: "100%", alignItems: "center", flex: 1 }}
      >
        <HeaderContainer headerText="reading" />
        <View style={styles.goalContainer}>
          <Goal navigation={navigation} quran={combineQuranData} />
        </View>
        <View style={styles.randomReadContainer}>
          <View style={styles.surah_juz_container}>
            <View style={styles.textContainer}>
              <Text style={[styles.text, styles.surahName]}>
                {combineQuranData?.[randomChapterIndex]?.englishName}
              </Text>
              <Text style={[styles.text, styles.surahInfo]}>
                {combineQuranData?.[randomChapterIndex]?.englishNameTranslation}
              </Text>
            </View>
            <TouchableOpacity onPress={() => showModal("chapter")}>
              <MyIcon name="arrow-forward" size="32" ionIcon color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.verse_container}>
            <View style={styles.textContainer}>
              <Text style={[styles.text, styles.surahName]}>
                start from verse
              </Text>
              <Text style={[styles.text, styles.surahInfo]}>{`verse ${
                randomAyahIndex + 1
              }`}</Text>
            </View>
            <TouchableOpacity onPress={() => showModal("verse")}>
              <MyIcon name="arrow-forward" size="32" ionIcon color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.readButton}
            onPress={() => {
              navigation.push("ReadScreen", {
                chapter: randomChapterIndex,
                verse: randomAyahIndex,
              });
            }}
          >
            <Text style={[styles.text, styles.buttonText]}>
              Start Reading Quran
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.acheivementsContainer}>
          <Text style={[styles.text, styles.weekText]}>This week</Text>
        </View>
      </SafeAreaView>
    );
  }, [combineQuranData, randomChapterIndex, randomAyahIndex]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={data}
        alwaysBounceVertical={false}
        contentContainerStyle={{ gap: 20 }}
        ListHeaderComponent={header}
        ListFooterComponent={SafeAreaView}
        renderItem={({ item }) => (
          <View
            style={{
              width: "90%",
              alignSelf: "center",
            }}
          >
            <Acheivement {...item} />
          </View>
        )}
      />

      <BottomSheetModal
        bottomInset={0}
        ref={randomReadModalRef}
        index={0}
        snapPoints={["75%"]}
        backgroundStyle={{ backgroundColor: "#202020" }}
      >
        <View style={styles.sheetContainer}>
          {modalType === "chapter" ? (
            <BottomSheetChapterContainer headerComponent={bottomSheetHeader} />
          ) : (
            <BottomSheetVerseContainer headerComponent={bottomSheetHeader} />
          )}
        </View>
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  sheetContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  bottomSheetHeader: {
    backgroundColor: "#202020",
  },
  headerText: {
    fontSize: 20,
    textTransform: "capitalize",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#101010",
  },
  goalContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  surahName: {
    fontSize: 20,
    textTransform: "capitalize",
    marginBottom: 8,
  },
  surahInfo: {
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: 400,
    color: "#7d7c81",
  },
  randomReadContainer: {
    marginTop: 30,
    width: "90%",
  },
  surah_juz_container: {
    backgroundColor: "#19191b",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verse_container: {
    backgroundColor: "#19191b",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  readButton: {
    marginTop: 20,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
  },
  acheivementsContainer: {
    width: "90%",
    marginTop: 20,
  },
  weekText: {
    fontSize: 20,
  },
});
export default MainReadScreen;
