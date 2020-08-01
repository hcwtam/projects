import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../Navbar/Navbar';
import styles from './Shop.module.css';
import Card from './Card/Card';
import Sidebar from './Sidebar/Sidebar';
import { RootState } from '../../reducers';

function Shop() {
  const [category, setCategory] = useState('all');

  const items = useSelector((state: RootState) => state.shop.items);

  let cards = null;
  cards = items
    .filter((item) => (category === 'all' ? item.type : item.type === category))
    .map((card) => (
      <Card
        id={card.id}
        key={card.name}
        name={card.name}
        shortDescription={card.shortDescription}
        price={card.price}
        imageURL={card.imageURL}
      />
    ));

  return (
    <div className={styles.Shop}>
      <Navbar />
      <h1>
        {category === 'all'
          ? `Fruits`
          : category[0].toUpperCase() + category.slice(1)}
      </h1>
      <Sidebar setActive={(selected) => setCategory(selected)} />
      <div className={styles.CardContainer}>{cards}</div>
    </div>
  );
}

export default Shop;
