import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import API from './src/api';

export default function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        API.get('items/')
            .then((response) => setItems(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Items from Backend:</Text>
            {items.map((item) => (
                <View key={item.id}>
                    <Text>Name: {item.name}</Text>
                    <Text>Description: {item.description}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
    },
});
