import React, { useState, useEffect } from 'react';
import { SliderContainer, Slide } from '../styles/Slider';
import img1 from '../assets/Foto1.png';
import img2 from '../assets/foto2.png';
import img3 from '../assets/Foto3.jpg';
import img4 from '../assets/Foto4.jpg';

const slides = [
    { image: img1 },
    { image: img2 },
    { image: img3 },
    { image: img4 },
];

export const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <SliderContainer>
            {slides.map((slide, index) => (
                <Slide
                    key={index}
                    style={{
                        opacity: index === currentIndex ? 1 : 0,
                        position: index === currentIndex ? 'relative' : 'absolute',
                        transition: 'opacity 1s ease-in-out',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <img src={slide.image} alt={`slide-${index}`} />
                </Slide>
            ))}
        </SliderContainer>
    );
};
