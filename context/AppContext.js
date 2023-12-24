import React, { useContext, useEffect, useState, useRef } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AppContext = React.createContext();

const ContextProvider = ({ children }) => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed (0-11), so add 1 to get the actual month
  const year = currentDate.getFullYear();

  // Pad the day and month with leading zeros if needed
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  const [chapterIndex, setChapterIndex] = useState(0);
  const [randomChapterIndex, setRandomChapterIndex] = useState(0);
  const [ayahIndex, setAyahIndex] = useState(0);
  const [randomAyahIndex, setRandomAyahIndex] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(1);
  const [filteredAcheivements, setFilteredAcheivements] = useState([]);
  const [filterType, setFilterType] = useState("today");
  const [timeSpentInfo, setTimeSpentInfo] = useState([
    {
      seconds: 0,
      date: formattedDate,
      verses: 0,
      pages: 0,
    },
  ]);
  const [tafsirInfo, setTafsirInfo] = useState({
    id: 160,
    name: "Tafsir Ibn Kathir",
    author: "Hafiz Ibn Kathir",
  });
  const [streak, setStreak] = useState(1);
  const [reciterId, setReciterId] = useState(1);
  const [isGoalCompleted, setIsGoalCompleted] = useState(false);
  const [canRun, setCanRun] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [userState, setUserState] = useState({
    daily_goal: 1,
    reciter_id: 3,
    tafsir_id: 160,
    tafsir_name: "Tafsir Ibn Kathir",
    tafsir_author: "Hafiz Ibn Kathir",
    time_spent: [
      {
        seconds: 0,
        date: formattedDate,
        verses: 0,
        pages: 0,
      },
    ],
    readingChapter: 0,
    readingVerse: 0,
    randomReadingChapter: 0,
    randomReadingVerse: 0,
    isDailyGoalCompleted: false,
    streak: 0,
  });
  const saveState = () => {
    setUserState({
      ...userState,
      readingChapter: chapterIndex,
      readingVerse: ayahIndex,
      randomReadingChapter: randomChapterIndex,
      randomReadingVerse: randomAyahIndex,
      time_spent: timeSpentInfo,
    });
  };
  //app state
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const filterAcheivements = () => {
    const currentDate = new Date().toLocaleDateString("en-GB"); // Get current date in DD-MM-YYYY format
    654;
    if (filterType === "today") {
      const objectsFilteredByCurrentDate = timeSpentInfo.filter((obj) => {
        const objDate = new Date(obj.date.split("-").reverse().join("-")); // Convert object date to Date object
        const objFormattedDate = objDate.toLocaleDateString("en-GB"); // Format object date in DD-MM-YYYY
        return objFormattedDate === currentDate; // Compare object date with current date
      });
      setFilteredAcheivements(objectsFilteredByCurrentDate);
    } else if (filterType === "week") {
      const date = new Date();
      const currentWeekStart = new Date(
        date.setDate(date.getDate() - date.getDay())
      ); // Get the start date of the current week
      console.log(currentWeekStart.toLocaleDateString("en-GB"), currentDate);
      const objectsFilteredByCurrentWeek = timeSpentInfo.filter((obj) => {
        const objDate = new Date(obj.date.split("-").reverse().join("-")); // Convert object date to Date object
        console.log(objDate.toLocaleDateString("en-GB"), currentDate);
        // Check if the object date falls within the current week
        return (
          objDate >= currentWeekStart &&
          objDate.toLocaleDateString("en-GB") <= currentDate
        );
      });
      setFilteredAcheivements(objectsFilteredByCurrentWeek);
    } else {
      setFilteredAcheivements(timeSpentInfo);
    }
  };

  const handleScreenTime = (obj) => {
    setTimeSpentInfo((prevArray) => {
      let found = false;
      const updatedArray = prevArray.map((item) => {
        if (item.date === obj.date) {
          found = true;
          return { ...item, seconds: (item.seconds += obj.seconds) };
        }
        return item;
      });
      if (!found) {
        updatedArray.push(obj);
      }
      return updatedArray;
    });
  };
  useEffect(() => {
    if (appStateVisible === "inactive") {
      saveState();
    }
  }, [appStateVisible]);

  useEffect(() => {
    const saveToAsync = async () => {
      try {
        await AsyncStorage.setItem("userState", JSON.stringify(userState));
        console.log("user state saved!");
      } catch (error) {
        console.log(error);
      }
    };
    if (canRun) {
      saveToAsync();
    }
  }, [userState]);

  useEffect(() => {
    setChapterIndex(userState.readingChapter);
    setAyahIndex(userState.readingVerse);
    setRandomAyahIndex(userState.randomReadingVerse);
    setRandomChapterIndex(userState.randomReadingChapter);
    setDailyGoal(userState.daily_goal);
    if (!canRun) {
      setTimeSpentInfo(userState.time_spent);
    }
    setStreak(userState.streak);
    setReciterId(userState.reciter_id);
    setIsGoalCompleted(userState.isDailyGoalCompleted);
    setTafsirInfo({
      ...tafsirInfo,
      id: userState.tafsir_id,
      name: userState.tafsir_name,
      author: userState.tafsir_author,
    });
  }, [userState]);
  console.log(userState);
  return (
    <AppContext.Provider
      value={{
        chapterIndex,
        setChapterIndex,
        ayahIndex,
        setAyahIndex,
        setUserState,
        userState,
        randomAyahIndex,
        setRandomAyahIndex,
        randomChapterIndex,
        setRandomChapterIndex,
        saveState,
        dailyGoal,
        setDailyGoal,
        streak,
        setStreak,
        reciterId,
        setReciterId,
        isGoalCompleted,
        setIsGoalCompleted,
        setCanRun,
        tafsirInfo,
        setTimeSpentInfo,
        timeSpentInfo,
        formattedDate,
        handleScreenTime,
        filterAcheivements,
        filteredAcheivements,
        filterType,
        setFilterType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { ContextProvider, AppContext };
