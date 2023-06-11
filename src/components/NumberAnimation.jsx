
import React, { useState, useEffect } from 'react';
import styles from '../css/NumberAnimation.module.css';

const NumberAnimation = ({ startNumber, endNumber, intervalDuration }) => {
  const [currentNumber, setCurrentNumber] = useState(startNumber);

  useEffect(() => {
    let intervalId;
    if (currentNumber < endNumber) {
      intervalId = setInterval(() => {
        setCurrentNumber((prevNumber) => {
          const nextNumber = prevNumber + 10;
          return nextNumber > endNumber ? endNumber : nextNumber;
        });
      }, intervalDuration);
    } else if (currentNumber > endNumber) {
      intervalId = setInterval(() => {
        setCurrentNumber((prevNumber) => {
          const nextNumber = prevNumber - 10;
          return nextNumber < endNumber ? endNumber : nextNumber;
        });
      }, intervalDuration);
    }

    return () => clearInterval(intervalId);
  }, [currentNumber, endNumber, intervalDuration]);

  return <div className={styles.numberAnimation}>{currentNumber}</div>;
};

export default NumberAnimation;
