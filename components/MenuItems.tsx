import React, {useContext} from 'react';
import { ThemedView } from './ThemedView';
import { StyleSheet, View, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { UserContext } from './UserContext';
import { database } from '@/firebaseConfig';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function MenuItems() {
  const [isPressed, setIsPressed] = React.useState(false);
  const { selectedItems, setSelectedItems } = useContext(UserContext);
  const [data, setData] = React.useState(null);
  const [menuItems, setMenuItems] = React.useState([]);
  const [addNewItem, setAddNewItem] = React.useState(false);
  const [nameNewItem, setNameNewItem] = React.useState("");
  const [priceNewItem, setPriceNewItem] = React.useState(0);
  const [serviceNewItem, setServiceNewItem] = React.useState("");

  const fetchData = async () => {
    console.log("Fetching data...");
    const querySnapshot = await getDocs(collection(db, "menuItems"));
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // console.log("Menu Items: ", items);
    setMenuItems(items);
  };

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

  const handleAddItem = async () => {
    console.log("Adding new item...", nameNewItem, priceNewItem, serviceNewItem);
    let menuItem = {
      name: nameNewItem,
      price: priceNewItem,
      service: serviceNewItem
    };
    try {
      const docRef = await addDoc(collection(db, "menuItems"), menuItem);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setNameNewItem("");
    setPriceNewItem("");
    setServiceNewItem("");
    setAddNewItem(false);
    fetchData();
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemedView>
      <ThemedText type="subtitle">Menu Items</ThemedText>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 13, marginVertical: 15 }}>
        {menuItems.map((item, index) => (
          // <Card key={index} style={{backgroundColor: "#333", ...styles.cardStyle}}>
          <Pressable key={index} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={() => handlePress(item)} 
            // style={{backgroundColor: "#333", ...styles.cardStyle}}>
            style={({ pressed }) => [
              {backgroundColor: pressed ? "#555" : "#333", elevation: pressed ? 2 : 5, ...styles.cardStyle}
            ]}>
            <CardHeader style={{height: 70}}>
              <CardTitle style={{ textAlign: "center" }}>
                <ThemedText type="defaultSemiBold" style={{color:"#ffd337"}}>{item.name}</ThemedText>
              </CardTitle>
              <View>
                <ThemedText type="default" style={{color:"grey", textAlign: "center"}}>{item.service}</ThemedText>
              </View>
            </CardHeader>
            <CardContent>
              <CardDescription style={{ color: "white", textAlign: "center", marginVertical: 15 }}>
                0
              </CardDescription>
            </CardContent>
            <CardFooter style={{height: 40, borderTopWidth: 2, borderTopColor: "#444"}}>
              <ThemedText style={{textAlign: "right", padding: 5}}>{item.price} MAD</ThemedText>
            </CardFooter>
          {/* </Card> */}
          </Pressable>
        ))}
        {!addNewItem && menuItems.length !==0 &&
          <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={() => setAddNewItem(true)}
            style={({ pressed }) => [
              {backgroundColor: pressed ? "#555" : "#333", ...styles.cardStyle}
            ]}>
            <CardContent style={{minHeight:100}}>
              <CardDescription style={{textAlign: "center", marginVertical: 66}}>
                <Ionicons name="add" size={24} color="#ffd337" />
              </CardDescription>
            </CardContent>
          </Pressable>
        }
      </View>
      {menuItems.length === 0 && 
          <ThemedView style={{flex: 1, justifyContent: "center", alignItems: "center", height: "100%"}}>
            <ThemedText type="defaultSemiBold">Getting Menu Items from Database...</ThemedText>
          </ThemedView>
        }
      {addNewItem &&
        <ThemedView style={{marginVertical: 10, borderWidth: 2, borderColor: "#8ddcf2", borderRadius: 15, padding: 20 }}>
          <ThemedText type="subtitle" style={{textAlign: "center"}}>Add New Item:</ThemedText>
          <ThemedText type="defaultSemiBold">name:</ThemedText>
          <Input
            placeholder='Enter a name....'
            value={nameNewItem}
            onChangeText={setNameNewItem}
            aria-labelledby='inputLabel'
            aria-errormessage='inputError'
            placeholderTextColor={'grey'}
            style={{ color: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 10, padding: 10 }}
            multiline
          />
          <ThemedText type="defaultSemiBold">price:</ThemedText>
          <Input
            placeholder='Enter a price....'
            value={priceNewItem}
            onChangeText={setPriceNewItem}
            aria-labelledby='inputLabel'
            inputMode='numeric'
            aria-errormessage='inputError'
            placeholderTextColor={'grey'}
            style={{ color: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 10, padding: 10 }}
            multiline
          />
          <ThemedText type="defaultSemiBold">service:</ThemedText>
          <Input
            placeholder='Enter a service....'
            value={serviceNewItem}
            onChangeText={setServiceNewItem}
            aria-labelledby='inputLabel'
            aria-errormessage='inputError'
            placeholderTextColor={'grey'}
            style={{ color: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 10, padding: 10 }}
            multiline
          />
          <View style={{flexDirection: "row", justifyContent: "center", gap: 10, marginVertical: 25}}>
            <Button
              onPress={() => setAddNewItem(false)}
              style={{ borderRadius: 15, padding: 10, paddingHorizontal: 20 }}
            >
              <ThemedText type="defaultSemiBold">Cancel</ThemedText>
            </Button>
            <Button
              onPress={handleAddItem}
              style={{ backgroundColor:(nameNewItem.length === 0 || priceNewItem.length === 0 || serviceNewItem.length === 0)? "grey" :"#00b253",
                borderRadius: 15, padding: 10, paddingHorizontal: 30 
              }}
              disabled={nameNewItem.length === 0 || priceNewItem.length === 0 || serviceNewItem.length === 0}
            >
              <ThemedText type="defaultSemiBold">Add</ThemedText>
            </Button>
          </View>
        </ThemedView>
      }
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