import {
    View,
    Text,
    StyleSheet,
    LayoutAnimation,
    Animated,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import colors from "../../Common/colors";
import CustomTextInput from "../../components/TextInput";
import DropDown from "../../components/DropDown";
import CalendarCustom from "../../components/Calendar";
import { windowHeight } from "../../Common/dimentions";

const HeaderMyEcomaint = ({ dataDiaDiem, dataMachine }) => {
   

    return (
        <View style={styles.container}>
            
            
        </View>
    );
};

export default HeaderMyEcomaint;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
    },
    filterCenter: {
        flex: 1,
    },
    filter: {},
    arrowView: {
        justifyContent: "center",
        alignItems: "center",
    },

    controlHeader: {
        flex: 1,
        marginHorizontal: 10,
    },
});
