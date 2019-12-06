import React from 'react'

import { DeckList } from './DeckList'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { DeckForm } from './DeckForm'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { withLayout } from './Layout'

const client = new ApolloClient({
  uri: 'https://learn-stuff-gql.glitch.me'
})

const AppNavigator = createStackNavigator(
  {
    Home: { screen: withLayout(DeckList) },
    Create: { screen: withLayout(DeckForm) }
  },
  {
    initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  )
}
