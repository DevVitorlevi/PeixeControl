import React, { useEffect } from 'react';
import { Message } from '../styles/FlashMessage';

export const FlashMessage = ({ type, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 4000); // fecha após 4s
        return () => clearTimeout(timer);
    }, [onClose]);

    return <Message type={type}>{message}</Message>;
};