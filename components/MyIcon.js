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
            fontSize: parseInt(size),
            marginRight: marginRight && parseInt(marginRight),
            textAlign: center && "center",
          }}
        />
      )}
      {ionIcon && (
        <IonIcon
          name={name}
          style={{
            color: color,
            fontSize: parseInt(size),
            marginRight: marginRight && parseInt(marginRight),
            textAlign: center && "center",
          }}
        />
      )}
    </>
  );
};
export default MyIcon;
