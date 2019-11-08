import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { DeckList } from './DeckList'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { DeckForm } from './DeckForm'

const client = new ApolloClient({
  uri: 'https://learn-stuff-gql.glitch.me'
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <DeckForm />
        <DeckList />
      </SafeAreaView>
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
