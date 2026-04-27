import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddNoteScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const saveNote = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    try {
      const existingNotes = await AsyncStorage.getItem('notes');
      const notes = existingNotes ? JSON.parse(existingNotes) : [];
      const newNote = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        date: new Date().toISOString()
      };
      notes.push(newNote);
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save note');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Write your note here..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titleInput: { fontSize: 24, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 20, padding: 10 },
  contentInput: { fontSize: 16, flex: 1, padding: 10, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#FF3CAC', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
