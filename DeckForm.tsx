import React, { useState, useEffect } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { ALL_DECKS } from './queries/all-decks'

const CREATE_DECK = gql`
  mutation AddDeck($input: DeckInput!) {
    addDeck(deck: $input) {
      deck {
        id
        name
        description
        cardCount
        cards {
          id
          term
        }
      }
    }
  }
`

function onDeckUpdate(cache, { data: { addDeck } }) {
  const { deck } = addDeck
  const { decks } = cache.readQuery({
    query: ALL_DECKS
  })
  cache.writeQuery({
    query: ALL_DECKS,
    data: { decks: decks.concat(deck) }
  })
}

export function DeckForm({ navigation }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [createDeck, { loading, data }] = useMutation(CREATE_DECK, {
    update: onDeckUpdate,
    onCompleted() {
      clearForm()
      navigation.goBack()
    }
  })

  // useEffect(() => {
  //   if (data) {
  //     clearForm()
  //   }
  // }, [data])

  function clearForm() {
    setName('')
    setDescription('')
  }

  function saveDeck() {
    createDeck({
      variables: { input: { name, description } }
      // refetchQueries: ['allDecks']
    })
  }

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput
        style={[styles.input, { height: 40 }]}
        placeholder="Enter term"
        onChangeText={setName}
        value={name}
      />
      <Text>Description</Text>
      <TextInput
        style={[styles.input, { height: 40 }]}
        placeholder="Enter answer"
        onChangeText={setDescription}
        value={description}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveDeck}>
          {loading ? (
            <ActivityIndicator color="whitesmoke" />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearForm}>
          <Text style={styles.buttonText}>cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ddd',
    padding: 10
  },
  input: {
    padding: 5,
    marginTop: 4,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 4,
    backgroundColor: '#049bce'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'whitesmoke'
  }
})
