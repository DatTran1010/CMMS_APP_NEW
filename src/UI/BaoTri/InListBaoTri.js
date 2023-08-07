import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import React from "react";
import CustomTextInput from "../../components/TextInput";
import { windowWidth } from "../../Common/dimentions";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../Common/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
const InListBaoTri = ({ data, onDelete, animatedValue, id_MH, id_PT }) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          opacity:
            data.id === id_MH && data.id_PT === id_PT ? animatedValue : 1, // Áp dụng Animated.Value để điều khiển hiệu ứng
          transform: [
            {
              translateX:
                data.id === id_MH && data.id_PT === id_PT
                  ? animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    })
                  : 0,
            },
          ],
        }}
      >
        <Text>{data.TEN_PT}</Text>
        <View style={styles.input}>
          <View style={styles.textInput}>
            <CustomTextInput value={data.value1.toString()} height={35} />
          </View>
          <View style={styles.textInput}>
            <CustomTextInput value={data.value2.toString()} height={35} />
          </View>
          <TouchableOpacity
            style={[
              styles.trash,
              {
                marginLeft: 5,
                height: 35,
              },
            ]}
            onPress={() => onDelete(data)}
          >
            <Ionicons name="trash-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default InListBaoTri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: windowWidth / 7,
    marginLeft: 5,
  },
});
