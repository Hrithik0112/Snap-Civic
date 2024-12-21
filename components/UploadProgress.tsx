import { View, Text, StyleSheet } from 'react-native';

interface UploadProgressProps {
  progress: number[];
}

export function UploadProgress({ progress }: UploadProgressProps) {
  const averageProgress = progress.reduce((a, b) => a + b, 0) / progress.length;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${averageProgress}%` }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>
        Uploading: {Math.round(averageProgress)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#666',
  },
});