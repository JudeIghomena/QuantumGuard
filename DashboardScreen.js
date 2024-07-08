import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const DashboardScreen = () => {
  const [networkStatus, setNetworkStatus] = useState('');

  useEffect(() => {
    const fetchNetworkStatus = async () => {
      try {
        const response = await axios.get('/network/status');
        setNetworkStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching network status:', error);
      }
    };

    fetchNetworkStatus();

    // Example: WebSocket for real-time updates
    const ws = new WebSocket('ws://localhost:3000/api/network/status-stream');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNetworkStatus(data.status);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QuantumGuard Dashboard</Text>
      <Text style={styles.status}>Network Status: {networkStatus}</Text>
      {/* Add more real-time monitoring components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DashboardScreen;
