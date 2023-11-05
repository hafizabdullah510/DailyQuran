import { StyleSheet, Text, View } from "react-native";
import FilterContainer from "./FilterContainer";
import QuranReadInfoContainer from "./QuranReadInfoContainer";
import MyIcon from "./MyIcon";
import MyText from "./MyText";
const QuranReadInfo = () => {
  const infoData = [
    {
      icon: <MyIcon name="flower" size="48" color="#fc6493" center material />,
      text: "hasanat",
      count: 0,
      border: "#fc6493",
    },
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
  const acheivementsData = [
    {
      icon: <MyIcon name="flower" size="48" color="#fc6493" center material />,
      text: "hasanat",
      count: 0,
      border: "#fc6493",
    },
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
  return (
    <View style={styles.container}>
      <FilterContainer />
      <View style={styles.infoContainer}>
        <QuranReadInfoContainer data={infoData} />
      </View>
      <View style={{ marginTop: 20 }}>
        <MyText
          text="acheivements"
          color="#fff"
          weight="bold"
          size="24"
          capitalize
          align="left"
          marginBottom="5%"
        />
        <View style={styles.infoContainer}>
          <QuranReadInfoContainer data={acheivementsData} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 20,
  },
});

export default QuranReadInfo;
