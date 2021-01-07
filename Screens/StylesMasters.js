import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Platform,
  RefreshControl,
  Switch,
  ScrollView,
} from "react-native";

import Colors from "../constants/colors";
import StyleSuperItem from "../components/StyleSuperItem";
import { CheckBox } from "react-native-elements";
import { SearchBar } from "react-native-elements";

class StylesMasters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      fullData: [],
      showinactive:false,
      userID: props.navigation.state.params.userID,
      companyID: props.navigation.state.params.companyID,
    };
  }

  fetchdata = () => {
    fetch(
      "https://qualitylite.bluekaktus.com/api/bkQuality/masters/getStyleList",
      {
        method: "POST",
        body: JSON.stringify({
          basicparams: {
            companyID: this.state.companyID,
            userID: this.state.userID,
            showInactive:this.state.showinactive
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson.result,
          fullData: responseJson.result,

        });
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  };

  searchFilterFunction = (text) => {
    this.setState({
      search: text,
    });
    if (!text || text == "") {
      this.setState({
        dataSource: this.state.fullData,
      });
    } else {
      const newData = this.state.fullData.filter((item) => {
        const itemData = `${item.styleNo.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.includes(textData); // this will return true if our itemData contains the textData
      });

      this.setState({
        dataSource: newData,
      });
    }
  };

  renderGridItem = (itemData) => {
    function colorcheck(state) {
      if (state === "INACTIVE") {
        return Colors.inactiveColor;
      } else {
        return Colors.primaryColor;
      }
    }

    return (
      <StyleSuperItem
        name={itemData.item.styleNo}
        id={itemData.item.styleID}
        status={itemData.item.status}
        desc={itemData.item.styleDesc}
        color={colorcheck(itemData.item.status)}
        uri={itemData.item.faImageURI}
        onSelect={() => {
          this.props.navigation.navigate({
            routeName: "StyleEdit",
            params: {
              name: itemData.item.styleNo,
              companyID: this.state.companyID,
              userID: this.state.userID,
              id: itemData.item.styleID,
              desc: itemData.item.styleDesc,
              status: itemData.item.status,
            },
          });
        }}
      />
    );
  };

  componentDidMount() {
    this.fetchdata();
  }

  render() {
    let { dataSource } = this.state;
    if (this.state.loading) {
      return (
        <View style={styles.screen}>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.topaddbar}
                onPress={() => {
                  this.props.navigation.navigate({
                    routeName: "StylesAdd",
                    params: {
                      title: "Add Color",
                      companyID: this.state.companyID,
                      userID: this.state.userID,
                    },
                  });
                }}
              >
                <View style={styles.addbutton}>
                <Text style={styles.title} numberOfLines={1}>
                  +
                </Text>
              </View>
              <Text style={styles.des} numberOfLines={1}>
                Add New Style
              </Text>
            </TouchableOpacity>
            <CheckBox
                  size={25}
                  title="Inactive"
                  containerStyle={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    margin: 0,
                    width: "45%",
                  }}
                  textStyle={{
                    color: "#00334eBB",
                    fontSize: 24,
                    margin: 0,
                  }}
                  checkedColor={Colors.primaryColor}
                  checked={this.state.showinactive}
                  onPress={() => {
                    this.setState({
                      showinactive: !this.state.showinactive,
                    },()=>{this.fetchdata()});
                  }}
            />
            </View>
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.screen}>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.topaddbar}
                onPress={() => {
                  this.props.navigation.navigate({
                    routeName: "StylesAdd",
                    params: {
                      title: "Add Color",
                      companyID: this.state.companyID,
                      userID: this.state.userID,
                    },
                  });
                }}
              >
                <View style={styles.addbutton}>
                <Text style={styles.title} numberOfLines={1}>
                  +
                </Text>
              </View>
              <Text style={styles.des} numberOfLines={1}>
                Add New Style
              </Text>
            </TouchableOpacity>
            <CheckBox
                  size={25}
                  title="Inactive"
                  containerStyle={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    margin: 0,
                    width: "45%",
                  }}
                  textStyle={{
                    color: "#00334eBB",
                    fontSize: 24,
                    margin: 0,
                  }}
                  checkedColor={Colors.primaryColor}
                  checked={this.state.showinactive}
                  onPress={() => {
                    this.setState({
                      showinactive: !this.state.showinactive,
                    },()=>{this.fetchdata()});
                  }}
            />
            </View>
        <SearchBar
          placeholder="Search Here..."
          placeholderTextColor={Colors.primaryColor}
          round
          containerStyle={{
            backgroundColor: "#f6f5f5",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          inputContainerStyle={{
            backgroundColor: "#b5b5b580",
            marginHorizontal: 5,
            color:Colors.primaryColor
          }}
          editable={true}
          value={this.state.search}
          onChangeText={this.searchFilterFunction}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.fetchdata}
            />
          }
        >
          <FlatList
            style={styles.gridItem}
            keyExtractor={(item, index) => item.styleID}
            data={dataSource}
            renderItem={this.renderGridItem}
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 5,
  },
  screen: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f6f5f5",
  },
  title: {
    paddingBottom: 2,
    fontSize: 25,
    textAlign: "center",
    fontFamily: "effra-heavy",
    color: Colors.accentColor,
  },
  des: {
    paddingLeft: 15,
    fontSize: 22,
    textAlign: "center",
    paddingBottom: 5,
    textAlignVertical: "center",
    color: Colors.primaryColor,
  },
  topaddbar: {
    marginHorizontal: 10,
    marginTop:10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#f6f5f5",
  },
  addbutton: {
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderRadius: 15,
    width: 30,
    height: 30,
  },
});

StylesMasters.navigationOptions = (navData) => {
  return {
    headerTitle: "Styles",
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTintColor: Colors.accentColor,
  };
};

export default StylesMasters;
