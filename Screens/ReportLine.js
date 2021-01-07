import React from "react"
import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View,Dimensions,TouchableOpacity } from "react-native"
 
import Colors from "../constants/colors";

import * as ScreenOrientation from 'expo-screen-orientation';
import colors from "../constants/colors";
import { CheckBox } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons'; 

const NUM_COLS = 9
const CELL_WIDTH = 150
const CELL_HEIGHT = 35

const black = "#000"
const white = "#fff"

const styles = StyleSheet.create({
  container: {marginLeft:10,marginRight:10},
  header: { flexDirection: "row",},
  buyer: { position: "absolute", width: CELL_WIDTH },
  stylecol: { position: "absolute", width: CELL_WIDTH ,marginLeft:CELL_WIDTH },
  style: { position: "absolute", width: CELL_WIDTH ,marginLeft:CELL_WIDTH*2},
  body: { marginLeft: 250 },
  cell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    paddingRight:5,
  },
  cellorder: {
    width: CELL_WIDTH+50,
    height: CELL_HEIGHT,
    paddingRight:5,
  },
  cellHeader: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
  },

  cellHeaderOrder: {
    width: CELL_WIDTH+50,
    height: CELL_HEIGHT,
  },
  cellHeaderOSB: {
    width: CELL_WIDTH,
    height:  CELL_HEIGHT,
  },
  cellHeaderStyle: {
    width: 100,
    height:  CELL_HEIGHT,
  },
  cellOSB: {
    width: CELL_WIDTH,
    height:  CELL_HEIGHT,
  },
  headerText: {
    fontSize:17,
    textAlign:"right",
    paddingLeft:5,
    paddingRight:8,
    textAlignVertical:"center",
    // fontWeight:"bold",
    color:Colors.primaryColor,
    marginVertical:3
  },
  headerTextOSB: {
    fontSize:17,
    textAlign:"left",
    paddingLeft:5,
    textAlignVertical:"center",
    // fontWeight:"bold",
    color:Colors.primaryColor,
    marginVertical:3
  },
  cellText: {
    fontSize:17,
    textAlign:"right",
    paddingLeft:5,  
    paddingRight:8,
    textAlignVertical:"top",
    fontWeight:"bold",
    color:Colors.primaryColor,
    marginVertical:1
  },
  cellTextOSB: {
    fontSize:17,
    textAlign:"left",
    paddingLeft:10, 
    textAlignVertical:"center",
    fontWeight:"bold",
    color:Colors.primaryColor,
    marginVertical:1
  },
  column: { flexDirection: "column" },
})

class ReportLine extends React.Component {
  constructor(props) {
    super(props);
    this.headerScrollView = null
    this.scrollPosition = new Animated.Value(0)
    this.scrollEvent = Animated.event(
      [{ nativeEvent: { contentOffset: { x: this.scrollPosition } } }],
      { useNativeDriver: false },
    )
    this.state = {
      loading: false,
      count:0,
      dataSource: [],
      cards:[],
      floor:[],
      style:[],
      data:[],
      FromDate:props.navigation.state.params.FromDate,
      ToDate:props.navigation.state.params.ToDate,
      FromDatex:null,
      OrderDatePickerVis:false,
      OrderDatePickerVis2:false,
      today:props.navigation.state.params.today,
      userID: props.navigation.state.params.userID,
      companyID: props.navigation.state.params.companyID,
      factoryname: props.navigation.state.params.factory,
      factoryid: props.navigation.state.params.id,
    };
    
  }
  handleScroll = e => {
    if (this.headerScrollView) {
      let scrollX = e.nativeEvent.contentOffset.x
      this.headerScrollView.scrollTo({ x: scrollX, animated: false })
    }
  }
  
  // scrollLoad = () => this.setState({ loading: false, count: this.state.count})
  
  // handleScrollEndReached = () => {
  //   if (!this.state.loading) {
  //     this.setState({ loading: true }, () => setTimeout(this.scrollLoad, 500))
  //   }
  // }

  formatCell(value,Id,index) {
    //console.log(value+Id+index)
    return (
      <View key={index} style={styles.cell}>
        <Text style={styles.cellText} numberOfLines={1}>{value}</Text>
      </View>
    )
  }

  formatCellOrder(value,Id,index) {
    //console.log(value+Id+index)
    return (
      <View key={index} style={styles.cellorder}>
        <Text style={styles.cellText} numberOfLines={1}>{value}</Text>
      </View>
    )
  }

  formatFact(factory,factoryid,index) {
    return (
      <View key={factoryid+index} style={styles.cellOSB}>
        <TouchableOpacity>
        <Text style={styles.cellTextOSB} numberOfLines={1}>{factory}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  formatStyle(factory,factoryid,index) {
      console.log(factoryid)
    return (
      <View key={factoryid+index} style={styles.cellOSB}>
         <TouchableOpacity onPress={()=> {
          this.props.navigation.navigate({
            routeName: "ReportLineStyle",
            params: {
              style: factory,
              companyID: this.state.companyID,
              userID: this.state.userID,
              id:factoryid,
              from:this.state.FromDate,
              to:this.state.ToDate,
              today:this.state.today,
              lineID:this.state.floor[index].id,
              lineName:this.state.floor[index].val
            },
          });
        }}>
        <Text style={styles.cellTextOSB} numberOfLines={1}>{factory}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  formatHeaderCell(value) {
    return (
      <View key={value} style={styles.cellHeader}>
        <Text style={styles.headerText} numberOfLines={1}>{value}</Text>
      </View>
    )
  }

  formatHeaderCellOrder(value) {
    return (
      <View key={value} style={styles.cellHeaderOrder}>
        <Text style={styles.headerText} numberOfLines={1}>{value}</Text>
      </View>
    )
  }

  formatHeaderCellOSB(value) {
    return (
      <View key={value} style={styles.cellHeaderOSB}>
        <Text style={styles.headerTextOSB} numberOfLines={1}>{value}</Text>
      </View>
    )
  }
  formatHeaderCellStyle(value) {
    return (
      <View key={value} style={styles.cellHeaderStyle}>
        <Text style={styles.headerTextOSB} numberOfLines={1}>{value}</Text>
      </View>
    )
  }
  formatColumn = (section) => {
    let { item } = section
    let cells = []

    for (let i = 0; i < this.state.count; i++) {
      if(section.index==1){
        
        cells.push(this.formatCellOrder(item[i].val,item[i].val,i))
      }
      else{
        cells.push(this.formatCell(item[i].val,item[i].val,i))
      }
    }

    return <View  key={item.Index} style={styles.column}>{cells}</View>
  }

  formatHeader() {
    let cols = []
    var headers=["Buyer","Order","Order Qty","Pending","Balance","Passed","OK","Altered","Defective","Rejected","DHU%"]
    for (let i = 0; i < headers.length; i++) {
      if(headers[i]=="Order"){
        cols.push(this.formatHeaderCellOrder(headers[i]))
      }
      else{
        cols.push(this.formatHeaderCell(headers[i]))
      }
      
    }

    return (
      <View style={styles.header}>
        {this.formatHeaderCellOSB("Line")}
        {this.formatHeaderCellStyle("Style")}
        <ScrollView
          ref={ref => (this.headerScrollView = ref)}
          horizontal={true}
          scrollEnabled={false}
          scrollEventThrottle={0}
        >
          {cols}
        </ScrollView>
      </View>
    )
  }
  
 FactoryColumn() {
    let cells = []
    for (let i = 0; i < this.state.count; i++) {
      cells.push(this.formatFact(this.state.floor[i].val,this.state.floor[i].id,i))
    }
    
    return <View style={styles.buyer}>{cells}</View>
  }

  StyleColumn() {
    let cells = []
    for (let i = 0; i < this.state.count; i++) {
      cells.push(this.formatStyle(this.state.style[i].val,this.state.style[i].id,i))
    }
    
    return <View style={styles.stylecol}>{cells}</View>
  }
  
  formatBody() {
    return (
      <View>
        {this.FactoryColumn()}
        {this.StyleColumn()}
        <FlatList
          style={styles.body}
          horizontal={true}
          data={this.state.data}
          renderItem={this.formatColumn}
          stickyHeaderIndices={[0]}
          onScroll={this.scrollEvent}
          keyExtractor={(item, index) => index}
          scrollEventThrottle={0}
          extraData={this.state}
        />
      </View>
    )
  }
  
  formatRowForSheet = (section) => {
    let { item } = section
  
    return item.render
  }

  getData=()=>{
    this.setState({
      loading: true,
    });
    fetch(
      "https://qualitylite.bluekaktus.com/api/bkQuality/reports/getLocationLevelOrderQtyReport",
      {
        method: "POST",
        body: JSON.stringify({
          basicparams: {
            companyID: this.state.companyID,
            userID: this.state.userID,
          },
          reportParams:{
            fromDate: this.state.FromDate+" 00:00:00",
            toDate:this.state.ToDate+" 23:59:59",
            locationID: this.state.factoryid,
            locationLevel:"LINE"
          }
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        var orderQty=[]
        var passed=[]
        var pending=[]
        var Ok=[]
        var Alter=[]
        var Defect=[]
        var Reject=[]
        var j
        var floor=[]
        var buyer=[]
        var style=[]
        var order=[]
        var dhu=[]
        var data=[]
        var balance=[]
        for(j of responseJson.result){
        var i 
        for(i of j.locationDetails){
            floor.push({val:j.locationName,id:j.locationID})
            style.push({val:i.styleNo,id:i.styleID})
            order.push({val:i.orderNo})
            buyer.push({val:i.brandName})
            balance.push({val:i.balancePieces})
            orderQty.push({val:i.orderQty})
            passed.push({val:i.passedPieces})
            pending.push({val:i.pendingPieces})
            Ok.push({val:i.okPieces})
            Alter.push({val:i.alteredPieces})
            Defect.push({val:i.defectedPieces})
            Reject.push({val:i.rejectedPieces})
            dhu.push({val:i.dhu})
        }  
        }
        data.push(buyer)
        data.push(order)
        data.push(orderQty)
        data.push(pending)
        data.push(balance)
        data.push(passed)
        data.push(Ok)
        data.push(Alter)
        data.push(Defect)
        data.push(Reject)
        data.push(dhu)
        console.log(style)
        this.setState({
          loading: false,
          count:floor.length,
          floor:floor,
          style:style,
          data:data
        });
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  };

    componentDidMount() {
    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
      }
      this.listener = this.scrollPosition.addListener(position => {
        this.headerScrollView.scrollTo({ x: position.value, animated: false })
      })
    changeScreenOrientation()
    this.getData()
  }


  render () {
    let body = this.formatBody()
    
    let data = [{ key: "body", render: body }]

    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
      );
    }else{
      return (
        <View>
          <View style={{flexDirection:"row"}}>
             <Text style={{
                    fontSize:22,
                    marginLeft:10,
                    paddingLeft:5,  
                    paddingRight:8,
                    textAlignVertical:"center",
                    fontWeight:"bold",
                    borderRadius:10,
                    backgroundColor:Colors.primaryColor,
                    color:"#fff",
                    marginVertical:1}}>{this.state.factoryname}</Text>
                        <CheckBox
                          title={"Today"}
                          containerStyle={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            margin: 0,
                            // width: "45%",
                          }}
                          textStyle={{ color: "#00334eBB", fontSize: 18 }}
                          checkedColor={Colors.primaryColor}
                          checked={this.state.today}
                          onPress={() => {
                            if(!this.state.today){
                              var monthNames= [
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                              ]
                              var today = new Date();
                              var date=today.getDate() + "-"+ monthNames[(today.getMonth())] +"-"+ today.getFullYear();
                              this.getData(date,date)
                            }
                            this.setState({
                              today:!this.state.today
                            })
                          }}
                        />
                        <View style={{flexDirection:"row"}}>
                        {!this.state.today ? (
                          <View style={{flexDirection:"row"}}>
                            <View style={{fontWeight:"bold",fontSize:25,backgroundColor:Colors.primaryColor,color:"#FFFFFF",
                                          borderRadius:10,width:200,marginLeft:5,marginVertical:5,
                                          justifyContent:"center"}}>
                              <View style={{flexDirection:"row", justifyContent:"space-evenly",}}>
                                  <Text  style={{
                                              fontSize: 16,
                                              fontWeight: "bold",
                                              color:"#FFFFFF"
                                              }}>From:
                                  </Text>
                                  <Text style={{
                                          fontSize: 16,
                                          fontWeight: "bold",
                                          color:"#FFFFFF"
                                          }}>{this.state.FromDate}
                                  </Text>
                                  <TouchableOpacity style={{alignContent:"flex-end",alignItems:"flex-end",alignSelf:"center",}} onPress={()=>{
                                      this.setState({OrderDatePickerVis:true})
                                  }}>
                                      <AntDesign name="calendar" size={20} color={"#FFFFFF"} />
                                  </TouchableOpacity>
                                </View>
                            </View>

                              <View style={{fontWeight:"bold",fontSize:25,backgroundColor:Colors.primaryColor,color:"#FFFFFF",
                                                        borderRadius:10,width:200,marginLeft:5,marginVertical:5,
                                                        paddingLeft:8,paddingRight:8,justifyContent:"center"}}>
                                            <View style={{flexDirection:"row", justifyContent:"space-evenly",}}>
                                                <Text  style={{
                                                            fontSize: 16,
                                                            fontWeight: "bold",
                                                            color:"#FFFFFF"
                                                            }}>To:
                                                </Text>
                                                <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: "bold",
                                                        color:"#FFFFFF"
                                                        }}>{this.state.ToDate}
                                                </Text>
                                                <TouchableOpacity style={{alignContent:"flex-end",alignItems:"flex-end",alignSelf:"center",}} onPress={()=>{
                                                    this.setState({OrderDatePickerVis2:true})
                                                }}>
                                                    <AntDesign name="calendar" size={20} color={"#FFFFFF"} />
                                                </TouchableOpacity>
                                  </View>
                              </View>
                            </View>
                          ):null}
                        </View>


          </View>
         
          <View style={styles.container}>
          {this.formatHeader()}
          <FlatList
            data={data}
            style={{marginBottom:20}}
            renderItem={this.formatRowForSheet}
            onEndReached={this.handleScrollEndReached}
            onEndReachedThreshold={.005}
            keyExtractor={(item, index) => index}
          />
          {this.state.loading && <ActivityIndicator />}
        </View>
        <DateTimePickerModal
          isVisible={this.state.OrderDatePickerVis}
          mode="date"
          onConfirm={(date)=>{
              var monthNames= [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ]
              this.setState({
                  OrderDatePickerVis:false,
                  FromDatex:date,
                  FromDate:date.getDate()+"-"+monthNames[date.getMonth()]+"-"+date.getFullYear(),
              })
          }}
          onCancel={()=>{
              this.setState({OrderDatePickerVis:false})
          }}
      />

<DateTimePickerModal
          isVisible={this.state.OrderDatePickerVis2}
          minimumDate={this.state.FromDatex}
          mode="date"
          onConfirm={(date)=>{
              var monthNames= [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ]
              this.setState({
                  OrderDatePickerVis2:false,
                  FromDateX:date,
                  ToDate:date.getDate()+"-"+monthNames[date.getMonth()]+"-"+date.getFullYear(),
              })
              this.getData(this.state.FromDate,date.getDate()+"-"+monthNames[date.getMonth()]+"-"+date.getFullYear())
          }}
          onCancel={()=>{
              this.setState({OrderDatePickerVis2:false})
          }}
      />

        </View>
        
      )
    }
  }
}
 
ReportLine.navigationOptions = (navData) => {
  return {
    headerTitle: "Reports",
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTintColor: Colors.accentColor,
  };
};

export default ReportLine;
