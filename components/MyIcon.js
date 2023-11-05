import { StyleSheet, Text, View } from "react-native";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
const MyIcon = ({
  name,
  color,
  size,
  marginRight,
  center,
  ionIcon,
  material,
}) => {
  return (
    <>
      {material && (
        <Material
          name={name}
          style={{
            color: color,
            fontSize: size,
            marginRight: marginRight,
            textAlign: center,
          }}
        />
      )}
      {ionIcon && (
        <IonIcon
          name={name}
          style={{
            color: color,
            fontSize: size,
            marginRight: marginRight,
            textAlign: center,
          }}
        />
      )}
    </>
  );
};
export default MyIcon;
