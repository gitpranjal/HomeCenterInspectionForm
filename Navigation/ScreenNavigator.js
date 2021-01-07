import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import FactoryMasters from "../Screens/FactoryMasters";
import ColorMasters from "../Screens/ColorMasters";
import BrandMasters from "../Screens/BrandMasters";
import SizeMasters from "../Screens/SizeMasters";
import StylesMasters from "../Screens/StylesMasters";
import DefectsMasters from "../Screens/DefectsMaster";
import OrderMasters from "../Screens/OrderMasters";
import UserMasters from "../Screens/UserMasters";
import ProcessMaster from "../Screens/ProcessMasters";
import Users from "../Screens/Users";
import Masters from "../Screens/Masters";
import SignIn from "../Screens/SignIn";
import SignOut from "../Screens/SignOut";
import SignUp from "../Screens/SignUp";
import Authcheck from "../Screens/Authcheck";
import InspectionResult from "../Screens/InspectionResult"
import  PDFScreen from "../Screens/PDFScreen"
import ImageDrawing from "../Screens/ImageDrawing"

import Home from "../Screens/Home";

import BulkOrderListScreen from "../Screens/BulkOrderListScreen"
import InspectionForm from "../Screens/InspectionForm"
import FactoryEdit from "../Screens/FactoryEdit";
import FloorEdit from "../Screens/FloorEdit";
import ColorEdit from "../Screens/ColorEdit";
import BrandEdit from "../Screens/BrandEdit";
import SizeEdit from "../Screens/SizeEdit";
import DefectsEdit from "../Screens/DefectsEdit";
import StyleEdit from "../Screens/StyleEdit";
import OrderEdit from "../Screens/OrderEdit";
import ProcessEdit from "../Screens/ProcessEdit";

import FactoryAdd from "../Screens/FactoryAdd";
import ColorAdd from "../Screens/ColorAdd";
import DefectsAdd from "../Screens/DefectsAdd";
import SizeAdd from "../Screens/SizeAdd";
import StylesAdd from "../Screens/StylesAdd";
import BrandAdd from "../Screens/BrandAdd";
import FloorAdd from "../Screens/FloorAdd";
import LineEdit from "../Screens/LineEdit";
import LineAdd from "../Screens/LineAdd";
import OrderAdd from "../Screens/OrderAdd";
import ProcessAdd from "../Screens/ProcessAdd";

import Reports from "../Screens/Reports";
import ReportFloors from "../Screens/ReportFloors";
import ReportLine from "../Screens/ReportLine";
import ReportLineStyle from "../Screens/ReportLineStyle";

import Colors from "../constants/colors";

const Navigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    FactoryEdits: {
      screen: FactoryEdit,
    },
    FactoryAdd: {
      screen: FactoryAdd,
    },
    FloorAdd: {
      screen: FloorAdd,
    },
    FloorEdits: {
      screen: FloorEdit,
    },
    LineEdits: {
      screen: LineEdit,
    },
    LineAdd: {
      screen: LineAdd,
    },
    FactoryMaster: {
      screen: FactoryMasters,
    },
    ColorMasters: {
      screen: ColorMasters,
    },
    BrandMasters: {
      screen: BrandMasters,
    },
    StylesMasters: {
      screen: StylesMasters,
    },
    SizeMasters: {
      screen: SizeMasters,
    },
    DefectsMasters: {
      screen: DefectsMasters,
    },
    ColorAdd: {
      screen: ColorAdd,
    },
    BrandAdd: {
      screen: BrandAdd,
    },
    SizeAdd: {
      screen: SizeAdd,
    },
    DefectsAdd: {
      screen: DefectsAdd,
    },
    ProcessAdd: {
      screen: ProcessAdd,
    },
    StylesAdd: {
      screen: StylesAdd,
    },
    ColorEdit: {
      screen: ColorEdit,
    },
    ProcessEdit: {
      screen: ProcessEdit,
    },
    BrandEdit: {
      screen: BrandEdit,
    },
    SizeEdit: {
      screen: SizeEdit,
    },
    DefectsEdit: {
      screen: DefectsEdit,
    },
    StyleEdit: {
      screen: StyleEdit,
    },
    OrderMasters: {
      screen: OrderMasters,
    },
    OrderAdd: {
      screen: OrderAdd,
    },
    OrderEdit: {
      screen: OrderEdit,
    },
    SignOut: {
      screen: SignOut,
    },
    ProcessMaster: {
      screen: ProcessMaster,
    },
    Masters: {
      screen: Masters,
    },

    UserMasters: {
      screen: UserMasters,
    },
    Reports: {
      screen: Reports,
    },
    ReportFloors: {
      screen: ReportFloors,
    },
    ReportLine: {
      screen: ReportLine,
    },
    ReportLineStyle: {
      screen: ReportLineStyle,
    },
    Users: {
      screen: Users,
    },
    BulkOrderListScreen: {
      screen: BulkOrderListScreen
    },
    InspectionForm: {
      screen: InspectionForm
    },
    PDFScreen: {
        screen: PDFScreen
    },
    InspectionResult : {
      screen: InspectionResult
    },
    ImageDrawing: {
      screen: ImageDrawing
    }
    
  },{
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColor,
      headerTitle: "A Screen",
    },
  }
);


const MainStack = createDrawerNavigator({
  Dashboard: {
    screen: Navigator,
    navigationOptions: {
      drawerLabel: "Home",
    },
  },
  SignOut: SignOut,
});


const FiltersNavigator = createStackNavigator(
  {
    Filters: Masters,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColor,
      headerTitle: "A Screen",
    },
  }
);
const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
  },{
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColor,
      headerTitle: "A Screen",
    },
  }
);

const ScreenNavigator = createSwitchNavigator(
  {
    Authcheck: Authcheck,
    AuthStack: AuthStack,
    MainStack: MainStack,
  },
  {
    initialRouteName: "Authcheck",
  }
);
export default createAppContainer(ScreenNavigator);
