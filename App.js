import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {MaterialCommunityIcons} from '@expo/vector-icons'
 
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
 
    getBarCodeScannerPermissions();
  }, []);
 
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
    alert(`Codigo de barra com o tipo ${type} e o dado ${data} foi escaneado`);
  };
 
  const handleOpenLink = () => {
    Linking.openURL(data);
  };
 
 
  if (hasPermission === null) {
    return <Text>Permissao para usar a camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a camera</Text>;
  }
 
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
      name='qrcode-scan'
      size={100}
      color='orange'/>
      <Text style={styles.titulo} >Leitor de QR Code</Text>
      <View style={styles.cameraContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      </View>
      {scanned && <Button title={'Aperte para escanear denovo '} onPress={() => setScanned(false)} />}
      {scanned && <View style={styles.segBotao} ><Button title={'Abrir link: '+data} onPress={handleOpenLink} /></View>}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  },
  cameraContainer: {
  width: '90%',
  aspectRatio: 1,
  overflow: 'hidden',
  borderRadius: 10,
  marginBottom: 40,
  },
  titulo: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  color: 'darkorange',
  },
  segBotao: {
  marginTop: 15,
  },
  
});