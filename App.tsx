import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DeckList } from './DeckList'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'https://nebulous-toque.glitch.me/'
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <DeckList />
      </View>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
