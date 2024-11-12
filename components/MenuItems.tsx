import React, {useContext} from 'react';
import { ThemedView } from './ThemedView';
import { StyleSheet, View, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '~/components/ui/card';
import { UserContext } from './UserContext';

const items = [
  {
    name: "Agadir airport transfer",
    price: "300 MAD",
    service: "Airport Transfer",
  },
  {
    name: "Beer",
    price: "40 MAD",
    service: "Drinks",
  },
  {
    name: "Breakfast",
    price: "70 MAD",
    service: "Food",
  },
  {
    name: "Dinner buffet",
    price: "90 MAD",
    service: "Food",
  },
  {
    name: "Hard top board",
    price: "150 MAD",
    service: "Surfing"
  },
  {
    name: "Lmsouane surf trip",
    price: "60 MAD",
    service: "Trips"
  },
  {
    name: "Sangria",
    price: "60 MAD",
    service: "Drinks"
  },
  {
    name: "Soda",
    price: "10 MAD",
    service: "Drinks"
  },
  {
    name: "Soft top board hire",
    price: "100 MAD",
    service: "Surfing"
  },
  {
    name: "Surfing lessons",
    price: "400 MAD",
    service: "Surfing"
  },
  {
    name: "Tea Big",
    price: "30 MAD",
    service: "Drinks"
  },
  {
    name: "Tea small",
    price: "20 MAD",
    service: "Drinks"
  },
  {
    name: "Trip/Tour/Ever",
    price: "400 MAD",
    service: "Trips"
  },
  {
    name: "Water",
    price: "10 MAD",
    service: "Drinks"
  },
  {
    name: "Wetsuit",
    price: "100 MAD",
    service: "Surfing"
  },
  {
    name: "Yoga 5 class pass",
    price: "700 MAD",
    service: "Yoga"
  },
  {
    name: "Yoga guest",
    price: "150 MAD",
    service: "Yoga"
  },
  {
    name: "Yoga outsider",
    price: "160 MAD",
    service: "Yoga"
  }
]

export default function MenuItems() {
  const [isPressed, setIsPressed] = React.useState(false);
  const { selectedItems, setSelectedItems } = useContext(UserContext);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePress = (item) => {
    // onPress();
    console.log("Pressed: ", item.name);
  };

  return (
    <ThemedView>
      <ThemedText type="subtitle">Menu Items</ThemedText>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 13, marginVertical: 15 }}>
        {items.map((item, index) => (
          // <Card key={index} style={{backgroundColor: "#333", ...styles.cardStyle}}>
          <Pressable key={index} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={() => handlePress(item)} 
            // style={{backgroundColor: "#333", ...styles.cardStyle}}>
            style={({ pressed }) => [
              {backgroundColor: pressed ? "#555" : "#333", elevation: pressed ? 2 : 5, ...styles.cardStyle}
            ]}>
            <CardHeader style={{height: 50}}>
              <CardTitle style={{ color: "white", textAlign: "center" }}>
                <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription style={{ color: "white", textAlign: "center", marginVertical: 15 }}>
                0
              </CardDescription>
            </CardContent>
            <CardFooter style={{height: 40, borderTopWidth: 2, borderTopColor: "#444"}}>
              <ThemedText style={{textAlign: "right", padding: 5}}>{item.price}</ThemedText>
            </CardFooter>
          {/* </Card> */}
          </Pressable>
        ))}
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  cardStyle: {
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'grey',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 20,
    width: "48%"
  }
});