import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
  }

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(
        email,
        password,
      )
      .then(() => {
        Alert.alert('Usuário criado com sucesso!');
      })
      .catch((err) => {
        // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#error-codes_9
        switch (err.code) {
          case 'auth/email-already-in-use':
            Alert.alert(
              'Não foi possível criar usuário!',
              'Esse e-mail já está sendo utilizado por outro usuário.'
            );

            break;

          case 'auth/invalid-email':
            Alert.alert(
              'Não foi possível criar usuário!',
              'E-mail é inválido.'
            );

            break;

          case 'auth/weak-password':
            Alert.alert(
              'Não foi possível criar usuário!',
              'Senha muito fraca.'
            );

            break;

          default:
            Alert.alert('Não foi possível criar usuário!');

            break;
        }
      });
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInAnonymously} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => { }} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}