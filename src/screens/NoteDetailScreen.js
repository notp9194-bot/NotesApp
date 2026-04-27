import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function NoteDetailScreen({ route }) {
  const { note } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>{new Date(note.date).toLocaleString()}</Text>
      <Text style={styles.content}>{note.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  date: { fontSize: 14, color: '#999', marginBottom: 20 },
  content: { fontSize: 16, lineHeight: 24 }
});
