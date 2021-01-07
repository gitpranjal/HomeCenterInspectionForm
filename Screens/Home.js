import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Platform,
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Dashlets from "../components/Dashlets";
import HeaderButton from "../components/HeaderButton";

import Colors from "../constants/colors";

import { DASHLETS } from "../data/dashletDummyData";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this._retrieveData()
    this.state = {
      loading: true,
      cards:[],
      dataSource: [],
      companyID:null,
      userID:null,
      loading:true
    };
  }

  getCards=()=>{
    this.setState({
      loading: true,
    });
    fetch(
      "https://qualitylite.bluekaktus.com/api/bkQuality/users/getHomeCards",
      {
        method: "POST",
        body: JSON.stringify({
          basicparams: {
            companyID: this.state.companyID,
            userID: this.state.userID,
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
          cards: responseJson.result.cardDetails,
        });
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  };

  _retrieveData = async () => {
   
    try {
      const loginstatus = await AsyncStorage.getItem("LoginParams");
      const data = JSON.parse(loginstatus);
      if (data !== null) {
        this.setState({
          companyID: data.companyID,
          userID: data.userID,
          loading:false
        });
        this.getCards()
      }
    } catch (error) {}
  };



  renderGridItem = (itemData) => {
    function pathcheck(title) {
      if (title === "Factory Details") {
        return "FactoryMaster";
      }
      if (title === "Masters") {
        return "Masters";
      }
      if (title === "Orders") {
        return "OrderMasters";
      }
      if (title === "Users") {
        return "Users";
      }
      if (title === "Users2") {
        return "User2";
      }
      if (title === "Reports") {
        return "Reports";
      }
      if (title === "Audit")
      {
        return "BulkOrderListScreen"
      }
      else {
        return "Masters";
      }
    }

    return (
      <Dashlets
        title={itemData.item.screenCode}
        key={itemData.item.screenNo}
        id={itemData.item.screenNo}
        description={itemData.item.screenName}
        onSelect={() => {
          this.props.navigation.navigate({
            routeName: pathcheck(itemData.item.screenName),
            params: {
              id: itemData.item.screenNo,
              title: itemData.item.screenName,
              companyID : this.state.companyID,
              userID : this.state.userID
            },
          });
        }}
      />
    );
  };

  render() {
    let { gridItem } = styles;
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
      );
    }else{
      return (
        <View style={styles.screen}>
          <FlatList
            style={styles.gridItem}
            keyExtractor={(item, index) => item.screenNo}
            data={this.state.cards}
            renderItem={this.renderGridItem}
            numColumns={2}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#f6f5f5",
  },
  gridItem: {
    flex: 1,
    margin: 5,
    height: 150,
  },
});

Home.navigationOptions = (navData) => {
  return {
    headerTitle: "  Home",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTintColor: Colors.accentColor,
  };
};

export default Home;
