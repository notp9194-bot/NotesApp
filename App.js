import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddNoteScreen from './src/screens/AddNoteScreen';
import NoteDetailScreen from './src/screens/NoteDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Notes' }} />
        <Stack.Screen name="AddNote" component={AddNoteScreen} options={{ title: 'Add Note' }} />
        <Stack.Screen name="NoteDetail" component={NoteDetailScreen} options={{ title: 'Note Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
