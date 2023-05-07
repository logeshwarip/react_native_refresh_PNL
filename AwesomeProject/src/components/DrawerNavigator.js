import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import DashBoard from "../../src/components/Dashboard";
import { DrawerContent } from "../../src/components/DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator 
    initialRouteName="DashBoard"
    drawerContent={props => <DrawerContent {...props} />}
    screenOptions={() => ({
        headerShown: false,
        drawerStyle: {
            width: 320,
            borderTopRightRadius: 20,
        }
    })}
      >
      <Drawer.Screen name="DashBoard" component={DashBoard}/>
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;