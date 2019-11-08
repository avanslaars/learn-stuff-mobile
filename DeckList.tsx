import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const ALL_DECKS = gql`
  {
    decks {
      id
      name
      cardCount
      cards {
        id
        term
      }
    }
  }
`

export function DeckList() {
  const { loading, error, data } = useQuery(ALL_DECKS)

  return (
    <View style={styles.container}>
      {loading && (
        <>
          <ActivityIndicator color="#3796fc" />
          <Text style={styles.text}>loading the decks</Text>
        </>
      )}
      {data &&
        data.decks.map(deck => (
          <View key={deck.id}>
            <Text>{deck.name}</Text>
            {deck.cards.map(c => (
              <Text key={c.id}>{c.term}</Text>
            ))}
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#3796fc'
  }
})
