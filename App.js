import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import LoginScreen from './screens/LoginScreen';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  const [session, setSession] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setChargement(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (chargement) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <View style={styles.home}>
      <Text style={styles.homeText}>Connecté ! 🎉</Text>
      <Text style={styles.homeSub}>{session.user.phone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#6C47FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  home: {
    flex: 1,
    backgroundColor: '#6C47FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  homeSub: {
    color: '#D4C8FF',
    fontSize: 16,
    marginTop: 8,
  },
});
