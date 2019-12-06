import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text
} from 'react-native'

export function Layout({ children }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

export function withLayout(Component) {
  return function(props) {
    return (
      <Layout>
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Create')}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <Component {...props} />
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
