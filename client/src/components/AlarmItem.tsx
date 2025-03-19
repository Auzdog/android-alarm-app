import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-paper';
import type { Alarm } from '@shared/schema';

interface AlarmItemProps {
  alarm: Alarm;
  onToggle: (id: number, enabled: boolean) => void;
  onPress: (alarm: Alarm) => void;
}

const AlarmItem: React.FC<AlarmItemProps> = ({ alarm, onToggle, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(alarm)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.time}>{alarm.time}</Text>
          <Text style={styles.name}>{alarm.name}</Text>
          {alarm.location && (
            <Text style={styles.location}>{alarm.location}</Text>
          )}
        </View>
        <Switch
          value={alarm.isEnabled}
          onValueChange={(value) => onToggle(alarm.id, value)}
          color="#FF9432"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  time: {
    fontSize: 24,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    color: '#6B7280',
  },
  location: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
});

export default AlarmItem;
