import React from 'react';
import styles from './index.less';
import { ServantClass } from '../../global';
let test:ServantClass = '1'
export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
