import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Container, ThemeButtonText } from '../styles/style' 
import { useDispatch } from 'react-redux';
import { setViewMenuBar } from '../redux/features/app/appSlice';
import { useEffect, useState } from 'react';




export default function ModalScreen() {


  const dispatch= useDispatch()

  return (
    <Container>
      <Pressable onPress={() => {
        dispatch(setViewMenuBar(false))
        }}
        >
          <ThemeButtonText>Close</ThemeButtonText>
      </Pressable>

    

    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
