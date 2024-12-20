import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import{  useSafeAreaInsets} from "react-native-safe-area-context"
interface HeaderProps {
  userName?: string;
}



export default function Header({ userName = 'J' }: HeaderProps) {

  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { marginTop: insets.top }]}>
      <Text style={styles.logo}>Snap-Civic</Text>
      <Link href="/profile" asChild>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',

  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffc700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});