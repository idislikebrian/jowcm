import React, { useState, useEffect } from "react";
import styles from "./Flash.module.css";

const Flash = ({ blinkFrequency, messageChangeFrequency, timeBetweenMessages, messages }) => {
    const [visible, setVisible] = useState(true);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setVisible(prev => !prev);
        }, blinkFrequency);

        return () => clearInterval(blinkInterval);
    }, [blinkFrequency]);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setCurrentMessageIndex(prev => (prev + 1) % messages.length);
        }, messageChangeFrequency + timeBetweenMessages);

        return () => clearInterval(messageInterval);
    }, [messageChangeFrequency, timeBetweenMessages, messages.length]);

    return (
        visible ? (
            <div className={styles.flashWrapper}>
                <p>{messages[currentMessageIndex]}</p>
            </div>
        ) : null
    );
};

export default Flash;
