import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, SafeAreaView, StatusBar,View, ScrollView, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { UserContext } from '@/components/UserContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function TabTwoScreen() {
  const { value, selectedItems, setValue, setSelectedItems } = useContext(UserContext);
  const [allOrders, setAllOrders] = useState([]);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setAllOrders(items);
  };

  useEffect(() => {
    fetchOrders();
  }, [])

  // useEffect(() => {
  //   console.log("all orders: ", allOrders);
  // }, [allOrders])

  const onSave = async () => {
    const order = {
      customer: value,
      items: selectedItems,
      paid: false
    }

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      // console.log("Order saved with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    fetchOrders();
    onCancel();
  }

  const onPaySave = async () => {
    const order = {
      customer: value,
      items: selectedItems,
      paid: true,
      time: new Date().getTime()
    }

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      // console.log("Order saved with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    fetchOrders();
    onCancel();
  }

  const onJustPay = async (order) => {
    order.paid = true;
    order.time = new Date().getTime();
    // update the order in the database
    try {
      const docRef = doc(db, "orders", order.id);
      await updateDoc(docRef, order);
    }
    catch (e) {
      console.error("Error updating document: ", e);
    }
    fetchOrders();
  }

  const onCancel = () => {
    setValue("");
    setSelectedItems([]);
  }

  const convertUnixTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  }

  return (
    <ThemedView style={{paddingTop: StatusBar.currentHeight, flex: 1, padding: 26, overflow: "hidden", gap: 16}}>
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Shopping Cart</ThemedText>
        <Ionicons size={32} name="cart-outline" color="white" />
      </ThemedView>
      <Card style={{backgroundColor: "#333", padding: 18, borderRadius: 25, borderWidth: 1, borderColor: "grey", marginVertical: 10}}>
        <CardContent>
          <ThemedText type="defaultSemiBold"><Text style={{color: "#8ddcf2"}}>{value.length===0?"___________": value}</Text> buys the following items:</ThemedText>
          <View style={{marginTop:8}}>
            {selectedItems.map((item, index) => (
              <View key={index} style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 2}}>
                <ThemedText type="defaultSemiBold">{item.name} (x{item.count})</ThemedText>
                <ThemedText type="defaultSemiBold">{item.count * item.price} MAD</ThemedText>
              </View>
            ))}
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 8}}>
            <ThemedText type="defaultSemiBold" style={{color: "#00b253"}}>Total:</ThemedText>
            <ThemedText type="defaultSemiBold" style={{color: "#00b253"}}>{selectedItems.reduce((acc, item) => acc + item.count * item.price, 0)} MAD</ThemedText>
          </View>
        </CardContent>
        <CardFooter style={{flexDirection:"row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 15}}>
          <View style={{flexDirection:"row", flexWrap: "wrap"}}>
            <Button
              style={{borderRadius: 10, borderRadius: 15, padding: 5, paddingHorizontal: 8}}
              onPress={onCancel}
            >
              <ThemedText type="defaultSemiBold">Cancel</ThemedText>
            </Button>
            <Button
              style={{backgroundColor: selectedItems.length === 0 || value.length === 0 ? "grey" : "#00b253", 
                borderRadius: 10, borderRadius: 15, padding: 5, paddingHorizontal: 15
              }}
              onPress={onSave}
              disabled={selectedItems.length === 0 || value.length === 0}
            >
              <ThemedText type="defaultSemiBold">Save</ThemedText>
            </Button>
          </View>
          <Button
            style={{backgroundColor: selectedItems.length === 0 || value.length === 0 ? "grey" : "#00b253", 
              borderRadius: 10, borderRadius: 15, padding: 5, paddingHorizontal: 10
            }}
            onPress={onPaySave}
            disabled={selectedItems.length === 0 || value.length === 0}
          >
            <ThemedText type="defaultSemiBold">Pay & Save</ThemedText>
          </Button>
        </CardFooter>
      </Card>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Order History</ThemedText>
        <Ionicons size={32} name="document-text-outline" color="white" />
      </ThemedView>
      <Collapsible title="Not Paid Orders">
          {allOrders.filter(order => !order.paid).map((order, index) => (
            <Card key={index} style={{backgroundColor: "#333", padding: 18, borderRadius: 25, borderWidth: 1, borderColor: "grey", marginVertical: 10}}>
              <CardContent>
                <ThemedText type="defaultSemiBold">{order.customer} bought the following items:</ThemedText>
                <View style={{marginTop:8}}>
                  {order.items.map((item, j) => (
                    <View key={j} style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 2}}>
                      <ThemedText type="defaultSemiBold">{item.name} (x{item.count})</ThemedText>
                      <ThemedText type="defaultSemiBold">{item.count * item.price} MAD</ThemedText>
                    </View>
                  ))}
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 8}}>
                  <ThemedText type="defaultSemiBold" style={{color: "#00b253"}}>Total:</ThemedText>
                  <ThemedText type="defaultSemiBold" style={{color: "#00b253"}}>{order.items.reduce((acc, item) => acc + item.count * item.price, 0)} MAD</ThemedText>
                </View>
              </CardContent>
              <CardFooter style={{marginTop: 10}}>
                <Button
                  style={{backgroundColor: "#00b253", borderRadius: 10, borderRadius: 15, padding: 5, paddingHorizontal: 10}}
                  onPress={() => onJustPay(order)}
                >
                  <ThemedText type="defaultSemiBold" style={{textAlign:"center"}}>Pay</ThemedText>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </Collapsible>

      <Collapsible title="Paid Orders">
        {allOrders.filter(order => order.paid).map((order, index) => (
          <Card key={index} style={{backgroundColor: "#333", padding: 18, borderRadius: 25, borderWidth: 1, borderColor: "grey", marginVertical: 10}}>
            <CardContent>
              <ThemedText type="defaultSemiBold">{order.customer} bought the following items:</ThemedText>
              <View style={{marginTop:8}}>
                {order.items.map((item, j) => (
                  <View key={j} style={{flexDirection: "row", justifyContent: "space-between", marginTop: 2}}>
                    <ThemedText type="defaultSemiBold">{item.name} (x{item.count})</ThemedText>
                    <ThemedText type="defaultSemiBold">{item.count * item.price} MAD</ThemedText>
                  </View>
                ))}
              </View>
              <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 8}}>
                <ThemedText type="defaultSemiBold" style={{color: "#00b253"}}>Total:</ThemedText>
                <ThemedText type="defaultSemiBold" style={{color: "#00b253"}}>{order.items.reduce((acc, item) => acc + item.count * item.price, 0)} MAD</ThemedText>
              </View>
            </CardContent>
            <CardFooter style={{marginTop: 0}}>
              <ThemedText type="default" style={{fontSize:13, color: "lightgrey"}}>Paid on: {convertUnixTime(order.time)}</ThemedText>
            </CardFooter>
          </Card>
        ))}
      </Collapsible>
      
      {/* <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
          to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible> */}

    </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20
  },
});
