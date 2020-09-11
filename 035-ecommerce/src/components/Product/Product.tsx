import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import firebase from '../../firebase/firebaseIndex';
import Collapsible from 'react-collapsible';

import './product.css';
import Navbar from '../Navbar/Navbar';
import styles from './Product.module.css';
import Spinner from '../UI/Spinner';
import Quantity from '../forms/Quantity';
import nutrition from '../../assets/nutrition.png';
import Table from './Table';

const storage = firebase.storage();

const columns = [
  {
    Header: 'Typical values',
    accessor: 'value'
  },
  {
    Header: 'Per 100g',
    accessor: 'per100g'
  },
  {
    Header: 'A serving contains',
    accessor: 'contains'
  }
];

const data = [
  {
    value: 'Energy',
    per100g: '189kJ',
    contains: '152 kJ'
  },
  {
    per100g: '45kcal',
    contains: '36 kcal'
  },
  {
    value: 'Fat',
    per100g: '<0.5g',
    contains: '<0.5 g'
  },
  {
    value: 'Carbohydrate',
    per100g: '9.1g',
    contains: '7.3 g'
  },
  {
    value: 'Fibre',
    per100g: '1.5g',
    contains: '1.2 g'
  },
  {
    value: 'Protein',
    per100g: '0.9g',
    contains: '0.7 g'
  },
  {
    value: 'Salt',
    per100g: '<0.01g',
    contains: '<0.01 g'
  }
];

function Product() {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [item, setItem] = useState({
    id: '',
    name: '',
    price: 0,
    imageURL: ''
  });
  const location = useLocation();

  useEffect(() => {
    const dbUrl = `https://ecommerce-5bec3.firebaseio.com/shop/${location.pathname.slice(
      9
    )}.json`;

    axios.get(dbUrl).then((res) => {
      setItem(res.data);
    });
  }, [location]);

  useEffect(() => {
    if (item.imageURL) {
      storage
        .ref(item.imageURL)
        .getDownloadURL()
        .then((URL) => {
          setUrl(URL);
        });
      setLoading(false);
    }
  }, [item]);

  return (
    <div className={styles.Product}>
      <Navbar />
      {loading ? (
        <div style={{ position: 'relative', top: '30vh' }}>
          {' '}
          <Spinner />{' '}
        </div>
      ) : (
        <>
          <div className={styles.containers}>
            <div className={styles.imageContainer}>
              {url ? <img src={url} alt={item.name} /> : null}
            </div>
            <div className={styles.detailContainer}>
              <div className={styles.nameContainer}>
                <h1>{item.name[0].toUpperCase() + item.name.slice(1)}</h1>
                <div className={styles.rating}>
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                </div>
              </div>
              <div className={styles.priceContainer}>
                <h3>{`$${item.price.toFixed(2)}`}</h3>
                <div className={styles.quantity}>
                  <Quantity
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    imageURL={item.imageURL}
                    notify={() => {}}
                  />
                </div>
              </div>
              <hr />
              <article>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus praesentium voluptatem, cumque adipisci nesciunt illum
                totam eos. Architecto saepe modi culpa iure, neque aliquam
                beatae veniam sit optio quidem soluta vel alias mollitia
                numquam? Autem repellendus assumenda modi illo.
              </article>
              <div className={styles.nutrition}>
                <img src={nutrition} alt="nutrition" />
              </div>
            </div>
          </div>
          <section>
            <Collapsible trigger="Nutrition">
              <p>Typical values as sold. Contains 2 Servings</p>
              <Table columns={columns} data={data} />
            </Collapsible>
          </section>
        </>
      )}
    </div>
  );
}

export default Product;
