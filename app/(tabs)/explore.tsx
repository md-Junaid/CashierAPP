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
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function TabTwoScreen() {
  const { value, selectedItems, setValue, setSelectedItems } = useContext(UserContext);
  const [allOrders, setAllOrders] = useState([]);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const items = querySnapshot.docs.map(doc => ({
      ...doc.data()
    }));

    setAllOrders(items[0]);
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
      console.log("Order saved with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    onCancel();
  }

  const onPaySave = async () => {
    const order = {
      customer: value,
      items: selectedItems,
      paid: true
    }

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Order saved with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    onCancel();
  }

  const onCancel = () => {
    setValue("");
    setSelectedItems([]);
  }

  return (
    <ThemedView style={{paddingTop: StatusBar.currentHeight, flex: 1, padding: 26, overflow: "hidden", gap: 16, marginTop: 10}}>
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Shopping Cart</ThemedText>
        <Ionicons size={32} name="cart-outline" color="white" />
      </ThemedView>
      <Card style={{backgroundColor: "#333", padding: 18, borderRadius: 25, borderWidth: 1, borderColor: "grey", marginVertical: 20}}>
        <CardContent>
          <ThemedText type="defaultSemiBold"><Text style={{color: "#8ddcf2"}}>{value.length===0?"___________": value}</Text> buys the following items:</ThemedText>
          {selectedItems.map((item, index) => (
            <View key={index} style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 7}}>
              <ThemedText type="defaultSemiBold">{item.name} (x{item.count})</ThemedText>
              <ThemedText type="defaultSemiBold">{item.count * item.price} MAD</ThemedText>
            </View>
          ))}
        </CardContent>
        <CardFooter style={{flexDirection:"row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 20}}>
          <View style={{flexDirection:"row", flexWrap: "wrap"}}>
            <Button
              style={{borderRadius: 10, borderRadius: 15, padding: 5, paddingHorizontal: 10}}
              onPress={onCancel}
            >
              <ThemedText type="defaultSemiBold">Cancel</ThemedText>
            </Button>
            <Button
              style={{backgroundColor: selectedItems.length === 0 || value.length === 0 ? "grey" : "#00b253", 
                borderRadius: 10, borderRadius: 15, padding: 5, paddingHorizontal: 10
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
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
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
      </Collapsible>
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
  },
});
