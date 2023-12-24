import React from "react";
import { useContext, useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import * as Font from "expo-font";
import * as SQLite from "expo-sqlite";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AppContext = React.createContext();
const db = SQLite.openDatabase("quran.db");
import NetInfo from "@react-native-community/netinfo";

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [quranDataLoading, setQuranDataLoading] = useState(false);
  const [quranData, setQuranData] = useState([]);
  const [quranTranslation, setQuranTranslation] = useState([]);
  const [combineQuranData, setCombineQuranData] = useState([]);
  const [tafsir, setTafsir] = useState({});
  const [fontLoaded, setFontLoaded] = useState(false);
  const [sound, setSound] = useState("");
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [soundLoading, setSoundLoading] = useState(false);
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [isInternetConnected, setIsInternetConnected] = useState(false);
  const [soundPlayingState, setSoundPlayingState] = useState(false);
  // Tafsir Modal

  // ref
  const bottomSheetModalRef = useRef(null);
  const randomReadModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["60%"], []);
  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };
  const closeModal = () => {
    bottomSheetModalRef.current?.close();
  };
  const closeRandomModal = () => {
    randomReadModalRef.current?.close();
  };

  const presentRandomModal = () => {
    randomReadModalRef.current?.present();
  };
  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
          "arabic-font": require("../assets/fonts/noto-naskh-arabic-ui-regular-full-org.ttf"),
          "urdu-font": require("../assets/fonts/nafees-Regular-urdu.ttf"),
        });

        setFontLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }

    loadFont();
  }, []);

  // Sound
  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          setSoundPlaying(false);
        }
        if (playbackStatus.isPlaying) {
          setSoundPlayingState(true);
        } else {
          setSoundPlayingState(false);
        }
      });
    }
  }, [sound]);

  async function pauseSound() {
    try {
      await sound.pauseAsync();
    } catch (error) {
      console.log(error);
    }
  }
  async function resumeSound() {
    try {
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  async function playSound(chapter, verse, recitation_id) {
    getNetInfo();
    try {
      if (soundPlaying) {
        console.log("Stopping Sound");
        setSoundPlaying(false);
        await sound.stopAsync();
      } else {
        setSoundLoading(true);
        console.log("Loading Sound");
        const audioUrlResponse = await axios.get(
          `https://api.quran.com/api/v4/recitations/${recitation_id}/by_ayah/${chapter}:${verse}`
        );
        const audioFiles = await audioUrlResponse.data.audio_files;
        const { sound } = await Audio.Sound.createAsync({
          uri: `https://verses.quran.com/${audioFiles[0].url}`,
        });
        setSound(sound);
        console.log("Playing Sound");
        setSoundLoading(false);
        setSoundPlaying(true);
        await sound.playAsync();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //Tafsir
  const getTafsir = async (chapter, verse, id) => {
    console.log(chapter, verse, id);
    try {
      setTafsirLoading(true);
      const response = await axios.get(
        `https://api.quran.com/api/v4/quran/tafsirs/160?verse_key=${chapter}:${verse}`
      );
      const { tafsirs } = await response.data;
      const tafsir = tafsirs.find((tafsir) => tafsir.resource_id === id);
      const text = tafsir.text.replace(/<[^>]+>/g, "");
      setTafsir(text || "اس آیت کی مصنف کی طرف سے تفسیر دستیاب نہیں ہے۔");
      setTafsirLoading(false);
      handlePresentModal();
    } catch (error) {
      console.log(error);
    }
  };
  // https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/urd-muhammadtaqiusm.json

  // Get Quran Data with translation
  const getQuranData = async () => {
    setQuranDataLoading(true);
    try {
      const response = await axios.get(
        "https://api.alquran.cloud/v1/quran/quran-uthmani"
      );
      const { data } = await response.data;
      setQuranData(data.surahs);
      const translationDataResponse = await axios.get(
        `https://api.quran.com/api/v4/quran/translations/158`
      );
      const { translations } = await translationDataResponse.data;

      setQuranTranslation(translations);
      console.log("fetching done");
      combineAndInsertData(data.surahs, translations);
    } catch (error) {
      console.log("Please Try Later!");
      await AsyncStorage.removeItem("firstTimeRan");
      await AsyncStorage.removeItem("isFirstLaunched");
      console.log(error);
      setQuranDataLoading(false);
    }
  };
  const combineAndInsertData = (quranPakData, translationData) => {
    let array = [];
    let ayahIndex = 0;
    // array = quranPakData.map((item) => {
    //   const singleSurahTranslation = translationData.filter(
    //     (surah) => surah.chapter === item.number
    //   );
    //   item.ayahs.forEach((ayah, index) => {
    //     if (ayah.numberInSurah === singleSurahTranslation[index].verse) {
    //       ayah.translation = singleSurahTranslation[index].text;
    //     }
    //   });
    //   return item;
    // });
    array = quranPakData.map((item) => {
      item.ayahs.forEach((ayah, index) => {
        ayah.translation = translationData[ayahIndex].text;
        ayahIndex += 1;
      });
      return item;
    });
    console.log(array[0]);
    db.transaction(
      (tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Quran (dataArray TEXT)");

        // Batch insertion
        array.forEach((record) => {
          tx.executeSql("INSERT INTO Quran (dataArray) VALUES (?)", [
            JSON.stringify(record),
          ]);
        });
      },
      null,
      () => setQuranDataLoading(false)
    );
  };

  const getNetInfo = () => {
    NetInfo.fetch().then((state) => {
      console.log(state.isInternetReachable);
      setIsInternetConnected(
        state.isInternetReachable === null ? true : state.isInternetReachable
      );
    });
  };
  useEffect(() => {
    getNetInfo();
  }, []);

  // Drop Table
  // useEffect(() => {
  //   console.log("hello");
  //   setQuranData([]);
  //   setQuranTranslation([]);
  //   AsyncStorage.removeItem("firstTimeRan");
  //   db.transaction((tx) => {
  //     tx.executeSql("DROP TABLE IF EXISTS Quran"),
  //       [],
  //       () => console.log("table drop");
  //   });
  // }, []);
  // useEffect(() => {
  //   setQuranData([]);
  //   setQuranTranslation([]);
  //   AsyncStorage.removeItem("firstTimeRan");

  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "DROP TABLE IF EXISTS Quran",
  //       [],
  //       () => {
  //         console.log("Table dropped successfully");
  //       },
  //       (txObj, error) => {
  //         console.log(`Error dropping table: ${error.message}`);
  //       }
  //     );
  //   });
  // }, []);
  const queryQuranData = () => {
    if (combineQuranData.length === 0) {
      setLoading(true);

      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * from Quran",
            null,
            (txObj, resultSet) =>
              resultSet.rows._array.map((item) =>
                setCombineQuranData((prevArray) => [
                  ...prevArray,
                  JSON.parse(item.dataArray),
                ])
              ),
            (txObj, error) => console.log(error)
          );
        },
        null,
        () => setLoading(false)
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        quranData,
        quranTranslation,
        fontLoaded,
        handlePresentModal,
        tafsir,
        setTafsir,
        bottomSheetModalRef,
        snapPoints,
        getQuranData,
        queryQuranData,
        combineQuranData,
        playSound,
        getTafsir,
        soundPlaying,
        quranDataLoading,
        getQuranData,
        closeModal,
        randomReadModalRef,
        presentRandomModal,
        closeRandomModal,
        soundLoading,
        tafsirLoading,
        soundPlayingState,
        pauseSound,
        resumeSound,
        isInternetConnected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAPIContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
