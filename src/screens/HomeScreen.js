import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const deleteNote = async (id) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const filtered = notes.filter(note => note.id !== id);
          setNotes(filtered);
          await AsyncStorage.setItem('notes', JSON.stringify(filtered));
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.noteCard}
      onPress={() => navigation.navigate('NoteDetail', { note: item })}
      onLongPress={() => deleteNote(item.id)}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.notePreview} numberOfLines={2}>{item.content}</Text>
      <Text style={styles.noteDate}>{new Date(item.date).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No notes yet. Tap + to add!</Text>}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddNote')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  noteCard: { backgroundColor: 'white', padding: 15, marginHorizontal: 16, marginTop: 12, borderRadius: 10, elevation: 2 },
  noteTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  notePreview: { fontSize: 14, color: '#666', marginTop: 5 },
  noteDate: { fontSize: 12, color: '#999', marginTop: 8 },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#FF3CAC', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});
