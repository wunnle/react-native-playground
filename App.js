import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginBottom: 8 }}>Hello world!</Text>
      <Text style={{ fontSize: 16, opacity: 0.5 }}>
        This is my first React Native app
      </Text>
      <TouchableHighlight style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            alert('You tapped the button!');
          }}
        >
          Press on me
        </Text>
      </TouchableHighlight>
    </View>
  );
}
