import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  FlatList,
  TouchableNativeFeedback,
  Switch,
} from "react-native";
import Colors from "../constants/colors";

class OrderSuperItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      status: props.status,
      color: props.color,
      onSelect: props.onSelect,
    };
  }

  render() {
    const state = this.state;
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
    }
    return (
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          flex: 1,
          margin: 5,
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          elevation: 3,
          borderRadius: 3,
          overflow: "hidden",
        }}
        onPress={state.onSelect}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={state.onSelect}>
          <View style={styles.container2}>
            <Text style={styles.color} numberOfLines={1}>
              {state.name}
            </Text>
            <Text style={styles.status} numberOfLines={1}>
              {""}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    padding: 5,
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  color: {
    marginLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    fontSize: 20,
    textAlign: "left",
    fontFamily: "robotoRegular",
    fontWeight: "bold",
    maxWidth: Dimensions.get("window").width / 1.5,
    color: Colors.accentColor,
  },
  status: {
    marginTop: 4,
    marginLeft: 15,
    marginRight: 10,
    fontSize: 15,
    color: Colors.accentColor,
    textAlign: "center",
    fontFamily: "robotoRegular",
  },
});

export default OrderSuperItem;
