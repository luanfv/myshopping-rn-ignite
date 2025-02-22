import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

import { shoppingListExample } from '../../utils/shopping.list.data';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('products')
      // .where('quantity', '>', 6)
      // .limit(1)
      .orderBy('quantity', 'asc')
      // .startAt(2)
      // .endAt(12)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });

    return () => subscribe();

    // firestore()
    //   .collection('products')
    //   .get()
    //   .then((response) => {
    //     const data = response.docs.map((doc) => {
    //       return {
    //         id: doc.id,
    //         ...doc.data(),
    //       };
    //     }) as ProductProps[];

    //     setProducts(data);
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   });
  }, []);

  // useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .doc('x8GL2eo6hKMOO1gCrM46')
  //     .get()
  //     .then((response) => console.log(response.id, response.data()))
  // }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
