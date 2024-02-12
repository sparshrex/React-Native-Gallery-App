// App.js
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GalleryApp from "./GalleryApp";
import { Image,TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          
          component={GalleryApp}
          options={({ navigation }) => ({
            headerTitle: "Home",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Home", { refresh: true })}>
                <Image
                  style={{ width: 30, height: 30, marginLeft: 10 }}
                  source={require("./assets/home.png")} 
                />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
