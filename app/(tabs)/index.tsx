import { Image, StyleSheet, Platform } from 'react-native';
import React, { useContext } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { UserContext } from '@/components/UserContext';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import MenuItems from '@/components/MenuItems';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '~/components/ui/card';

export default function HomeScreen() {
  // const [value, setValue] = React.useState('');
  const { value, setValue } = useContext(UserContext);
  // const { checked, setChecked } = React.useState(false);
  // const { disbaleInput, setDisableInput } = React.useState(false);

  const onChangeText = (text: string) => {
    setValue(text);
  };

  // const onSetName = () => {
  //   setDisableInput(true);
  // }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      {/* <ThemedView style={styles.inputContainer}> */}
        <Input
          placeholder='Enter a name....'
          value={value}
          onChangeText={onChangeText}
          aria-labelledby='inputLabel'
          aria-errormessage='inputError'
          placeholderTextColor={'grey'}
          style={{ color: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 10, padding: 10 }}
          multiline
        />
        {/* <Button
          onPress={() => console.log(value)}
          style={{ width: "10%" }}
          disabled={value.length === 0}
        >
          <Ionicons name="checkmark-sharp" size={32} style={{color: value.length===0? "lightgrey":"lightgreen"}} />
        </Button> */}
        {/* <Ionicons name="close-sharp" size={24} color="lightgrey" /> */}
      {/* </ThemedView> */}
      <MenuItems />
      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus facere nam dolores atque quam facilis delectus est, necessitatibus ullam corporis, modi velit et, recusandae aspernatur soluta itaque quibusdam. Culpa dicta blanditiis molestiae ad facilis ullam quis odio, perferendis officiis? Corporis numquam repudiandae ullam eius ratione repellendus exercitationem nemo, illo, distinctio explicabo ut. Architecto aut iure commodi voluptate odio placeat eius.
        </ThemedText>
      </ThemedView> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:4,
    alignItems: 'center',
  },
  cardStyle: {
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
