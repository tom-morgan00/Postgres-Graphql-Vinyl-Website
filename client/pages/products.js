import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_ORDER_BY } from '../graphql/queries/getProducts.graphql';
import classes from '../styles/components/Others.module.css';
import Layout from '../components/Layout';
import Filters from '../components/Filters';
import PaginationButtons from '../components/PaginationButtons';
import Products from '../components/Products/Products';

export default function albums() {
  const [selected, setSelected] = useState(1);
  const [column, setColumn] = useState('artist');
  const [order, setOrder] = useState('');
  const limit = 24;
  const [index, setIndex] = useState(0);

  console.log(limit);
  const { loading, error, data } = useQuery(GET_PRODUCTS_ORDER_BY, {
    skip: column === undefined,
    variables: { column, order },
  });

  const setSelectOptions = (col, order, index) => {
    setColumn(col);
    setOrder(order);
    setSelected(index);
    setIndex(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={classes.app}>
      <Layout>
        <main className={classes.main}>
          <div className={classes.banner}>
            <h1>Products</h1>
            <Filters setSelectOptions={setSelectOptions} selected={selected} />
          </div>
          <Products
            products={data.getProductsOrderBy.slice(
              index * limit,
              (index + 1) * limit
            )}
          />

          <PaginationButtons
            index={index}
            setIndex={setIndex}
            maxPages={Math.ceil(data.getProductsOrderBy.length / limit)}
          />
        </main>
      </Layout>
    </div>
  );
}
