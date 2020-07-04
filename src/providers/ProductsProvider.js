import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {useAuth} from './AuthProvider';
import {Product} from '../models/schemas';

const ProductsContext = React.createContext(null);

const ProductsProvider = ({children}) => {
  const {user} = useAuth();

  const [products, setProducts] = useState([]);

  const realmRef = useRef(null);

  useEffect(() => {
    if (user == null) {
      console.warn('ProductsView must be authenticated!');
      return;
    }

    const config = {
      schema: [Product.schema],
      sync: {
        user,
        partitionValue: 'Loopr',
      },
    };

    console.log(
      `Attempting to open Realm for user ${user} with config: ${JSON.stringify(config)}...`,
    );

    let canceled = false;

    Realm.open(config)
      .then(openedRealm => {
        if (canceled) {
          openedRealm.close();
          return;
        }
        realmRef.current = openedRealm;
        const syncProducts = openedRealm.objects('Product');
        openedRealm.addListener('change', () => {
          setProducts([...syncProducts]);
        });
        setProducts([...syncProducts]);
      })
      .catch(error => console.warn('Failed to open realm:', error));

    return () => {
      canceled = true;
      const realm = realmRef.current; 
      if (realm != null) {
        realm.removeAllListeners();
        realm.close();
        realmRef.current = null;
      }
    };
  }, [user]);

  const setProductFeedback = (product, relevance) => {
    if (
      ![
        Product.SCORE_OFF_TOPIC,
        Product.SCORE_ACCEPTABLE,
        Product.SCORE_GOOD,
        Product.SCORE_EXCELLENT
      ].includes(relevance)
    ) {
      throw new Error(`Invalid Score ${relevance}`);
    }
    const realm = realmRef.current;

    realm.write(() => {
      product.relevance = relevance;
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProductFeedback,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  const value = useContext(ProductsContext);
  if (value == null) {
    throw new Error('useProducts() called outside of a ProductsProvider?');
  }
  return value;
};

export {ProductsProvider, useProducts};
