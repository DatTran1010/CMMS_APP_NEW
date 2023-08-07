import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import globalstyle from "../../Common/globalstyle";
import colors from "../../Common/colors";
const Visual = () => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const flastListRef = useRef();
    const currentIndexRef = useRef(0);
    const [data, setData] = useState([
        require("../../../assets/fashion1.jpg"),
        require("../../../assets/fashion2.jpg"),
    ]);
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[]}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View style={{ flex: 1 }}>
                                    <Image
                                        source={require("../../../assets/homefashion.jpg")}
                                        style={{ width: width, height: height }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        keyExtractor={(item, index) => item.key}
                                        horizontal
                                        data={data}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={[styles.image]}>
                                                    <Image
                                                        source={item}
                                                        style={{
                                                            width: width,
                                                            height: height,
                                                        }}
                                                        key={index}
                                                    />
                                                </View>
                                            );
                                        }}
                                        ref={flastListRef}
                                    />
                                </View>
                            </>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default Visual;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        borderWidth: 10,
        borderColor: "white",
    },
});
