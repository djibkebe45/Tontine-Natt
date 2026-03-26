import { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const [telephone, setTelephone] = useState('');
  const [code, setCode] = useState('');
  const [etape, setEtape] = useState('telephone');
  const [chargement, setChargement] = useState(false);

  async function envoyerOTP() {
    setChargement(true);
    const numero = '+221' + telephone.replace(/\s/g, '');
    const { error } = await supabase.auth.signInWithOtp({
      phone: numero,
    });
    if (error) Alert.alert('Erreur', error.message);
    else setEtape('code');
    setChargement(false);
  }

  async function verifierCode() {
    setChargement(true);
    const numero = '+221' + telephone.replace(/\s/g, '');
    const { error } = await supabase.auth.verifyOtp({
      phone: numero,
      token: code,
      type: 'sms',
    });
    if (error) Alert.alert('Code incorrect', error.message);
    setChargement(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Tontine Natt</Text>
      <Text style={styles.sous}>La tontine digitale du Sénégal</Text>

      {etape === 'telephone' ? (
        <>
          <View style={styles.inputRow}>
            <Text style={styles.prefix}>+221</Text>
            <TextInput
              style={styles.input}
              placeholder="77 000 00 00"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={telephone}
              onChangeText={setTelephone}
              maxLength={9}
            />
          </View>
          <TouchableOpacity
            style={styles.bouton}
            onPress={envoyerOTP}
            disabled={chargement}
          >
            <Text style={styles.boutonTexte}>
              {chargement ? 'Envoi...' : 'Recevoir le code SMS'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.info}>
            Code envoyé au +221{telephone}
          </Text>
          <TextInput
            style={styles.inputCode}
            placeholder="_ _ _ _ _ _"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
            maxLength={6}
            textAlign="center"
          />
          <TouchableOpacity
            style={styles.bouton}
            onPress={verifierCode}
            disabled={chargement}
          >
            <Text style={styles.boutonTexte}>
              {chargement ? 'Vérification...' : 'Confirmer'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEtape('telephone')}>
            <Text style={styles.retour}>Changer de numéro</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C47FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titre: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  sous: {
    fontSize: 15,
    color: '#D4C8FF',
    marginBottom: 48,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
  },
  prefix: {
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    borderRightWidth: 1,
    borderRightColor: '#eee',
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 16,
    color: '#333',
    letterSpacing: 2,
  },
  inputCode: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    fontSize: 32,
    padding: 20,
    color: '#333',
    marginBottom: 16,
    letterSpacing: 12,
  },
  bouton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    width: '100%',
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  boutonTexte: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    color: '#D4C8FF',
    marginBottom: 20,
    fontSize: 14,
  },
  retour: {
    color: '#D4C8FF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
