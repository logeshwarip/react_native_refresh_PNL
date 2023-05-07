import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ApplicationColors, ApplicationStrings, ApplicationImages } from '../../src/config/configIndex';
import DropDownPicker from 'react-native-dropdown-picker';
import details from '../../src/details.json';

const Timer = ({ duration }) => {                        // Timer is called for updating the pnl value in the list for every 500ms using interval
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft + 1);
    }, 500);
    return () => clearInterval(intervalId);             // Unmounts the interval
  }, []);

  return (
    <View>
      {(()=> {
        if(timeLeft < 0) {
          return(
            <Text style={{color:ApplicationColors.red,fontWeight:'400',fontSize:13}}>{timeLeft}</Text>
          )
        } else {
          return(
            <Text style={{color:ApplicationColors.green,fontWeight:'400',fontSize:13}}>{timeLeft}</Text>
          )
        }
      })()}
    </View>
  );
};

const SummaryPNL = ({ pnlVal }) => {              //   SummaryPNL is called for updating the p&l value for every 500ms using interval
  const [pnlValue, setPNLValue] = useState(pnlVal);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPNLValue(pnlValue => pnlValue + 1);
    }, 500);
    return () => clearInterval(intervalId);         // Unmounts the interval
  }, []);

  return (
    <View>
    <Text style={{color:ApplicationColors.white,marginTop:5,fontSize:13}}>₹ {pnlValue.toFixed(2)}k ({details.percent})</Text>
    </View>
  );
};

function Dashboard(props) {
  const { navigation } = props
  const [data, setData] = useState(details.data)          // to set the data array in the sate from details json file
  const [opendays, setDaysOpen] = useState(false);
  const [valuedays, setDaysValue] = useState(null);
  const [days, setDays] = useState([]);

  useEffect(() => {
  }, []);

  const toggleExpand = (index) => {
    setData(
      data.map((item, i) => {
        if (index === i) {
          return { ...item, expanded: !item.expanded };           // checks whether particular list is expanded or not, returns true if expanded otherwise false.
        }
        return item;
      })
    );
  };
  const Separator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: ApplicationColors.grey,
          marginTop: 10,
          marginBottom: 10,
        }}
      />
    );
  };
  const renderGroupHeader = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => toggleExpand(index)}>
        <Text style={{color:ApplicationColors.lightblue,fontWeight:'700'}}>{item.name}</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          {(()=> {
            if(item.status == 'Live-Entered') {
              return( <Text style={{color:ApplicationColors.grey,fontWeight:'400'}}>{item.status}</Text>)
            } else {
              return( <Text style={{color:ApplicationColors.lightorange,fontWeight:'400'}}>{item.status}</Text>)
            }
          })()}
          {(()=> {
            if(item.rate.includes('-')){
              return(
                <Text style={{color:ApplicationColors.red,fontWeight:'400'}}><Text style={{color:ApplicationColors.black,fontWeight:'400'}}>₹</Text> {item.rate} ({item.percent})</Text>
              )
            } else {
              return(
                <Text style={{color:ApplicationColors.green,fontWeight:'400'}}><Text style={{color:ApplicationColors.black,fontWeight:'400'}}>₹</Text> {item.rate} ({item.percent})</Text>
              )
            }
          })()}
        </View>
      </TouchableOpacity>
    );
  };

  const renderGroupItem = ({ item, index}) => {
    return (
      <View key={item.id}>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <Text style={{color:ApplicationColors.black,fontWeight:'700'}}>{ApplicationStrings.qty}</Text>
            <Text style={{color:ApplicationColors.black,fontWeight:'700'}}>{ApplicationStrings.ltp}</Text>
            <Text style={{color:ApplicationColors.black,fontWeight:'700'}}>{ApplicationStrings.val}</Text>
            <Text style={{color:ApplicationColors.black,fontWeight:'700'}}>{ApplicationStrings.pnl}</Text>
          </View>
            <Text style={{textDecorationLine:'underline',color:ApplicationColors.black,fontSize:13,fontWeight:'400'}}>{item.name}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:4}}>
            <Text style={{color:ApplicationColors.black,fontSize:13,fontWeight:'400'}}>{item.qty}</Text>
            <Text style={{color:ApplicationColors.black,fontSize:13,fontWeight:'400'}}>{item.ltp}</Text>
            <Text style={{color:ApplicationColors.black,fontSize:13,fontWeight:'400'}}>{item.val}</Text>
            <Timer duration={item.pnl} />
          </View>
      </View>
    );
  };

  return (
    <View style={{flex:1}}>
        <View style={{flexDirection:'row',marginLeft:15,marginTop:15,justifyContent:'flex-start',alignItems:'center'}}>
        <TouchableOpacity onPress = {() => navigation.openDrawer()}>
                  <Image
                  source={ApplicationImages.drawer}
                  style={{width:20,height:20,resizeMode:'contain'}} />
            </TouchableOpacity>
          <Text style={{color:ApplicationColors.black,fontWeight:'700',fontSize:20,marginLeft:Dimensions.get('window').width / 4}}>{ApplicationStrings.heading}</Text>
        </View>
        <View style={{backgroundColor:ApplicationColors.lightblue,margin:15,padding:8,borderRadius:8}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                <Text style={{color:ApplicationColors.white,fontWeight:'700',fontSize:18}}>{ApplicationStrings.summary}</Text>
                <DropDownPicker
                  open={false}
                  value={valuedays}
                  items={days}
                  setOpen={setDaysOpen}
                  setValue={setDaysValue}
                  setItems={setDays}
                  placeholder={ApplicationStrings.expiry}
                  style={{minHeight: 35,backgroundColor:ApplicationColors.lightblue,borderRadius:8,borderWidth:0.5,fontSize:15,borderColor:ApplicationColors.white}}
                  containerStyle={{width: 120}}
                  textStyle={{color: ApplicationColors.white}}
                  arrowStyle={{color: ApplicationColors.black}}
                  onChangeValue={(value, index) => {console.log("value",value)} }
                  dropDownDirection="DOWN"
                  listMode="SCROLLVIEW"
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:10,marginBottom:15}}>
                <View>
                <Text style={{color:ApplicationColors.white,fontWeight:'700',fontSize:15}}>{ApplicationStrings.capital}</Text>
                <Text style={{color:ApplicationColors.white,marginTop:5,fontSize:13}}>₹ {details.capital}</Text>
                </View>
                <View>
                <Text style={{color:ApplicationColors.white,fontWeight:'700',fontSize:15}}>{ApplicationStrings.pndl}</Text>
                <SummaryPNL pnlVal={details.pndl} />     
                </View>
                <View>
                <Text style={{color:ApplicationColors.white,fontWeight:'700',fontSize:15}}>{ApplicationStrings.val}</Text>
                <Text style={{color:ApplicationColors.white,marginTop:5,fontSize:13}}>₹ {details.val}</Text>
                </View>
            </View>
        </View>
      <FlatList
      data={data}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }) => {
        return (
          <View>
            {renderGroupHeader({ item, index })}
            {item.expanded && item.data.length != 0 && (          // checks item expanded is true and inner data array size is not null
              <FlatList
                data={item.data}
                keyExtractor={(item) => item.id}
                renderItem={renderGroupItem}
                style={{margin:15}}
              />
            )}
          </View>
        );
      }}
      ItemSeparatorComponent={Separator}
      style={{margin:15}}
    />
    </View>
  );
};

export default Dashboard;