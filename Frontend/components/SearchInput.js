import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchInput = ({ value, onChangeText, onMenuPress }) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleClear = () => {
        onChangeText('');
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
                <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#fff"
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                <Ionicons name="close-circle" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222745',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        margin: 10,
    },
    menuButton: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        padding: 10
    },
    clearButton: {
        marginLeft: 10,
    },
});




export default SearchInput