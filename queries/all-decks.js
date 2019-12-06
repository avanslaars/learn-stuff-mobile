import { gql } from 'apollo-boost'

export const ALL_DECKS = gql`
  query allDecks {
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
