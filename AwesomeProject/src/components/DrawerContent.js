import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import {
    Drawer
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

export function DrawerContent(props) {
    const { navigation } = props

    useEffect(() => {
    }, []);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label="DashBoard"
                            onPress={() => props.navigation.navigate('DashBoard')}
                        />
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    drawerSection: {
      marginTop: 10,
    },
  });
