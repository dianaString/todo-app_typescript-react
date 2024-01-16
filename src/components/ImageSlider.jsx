import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const currentSlide = slides[currentIndex];

    return (
        <div className="slider-container">
            <Link to={`/${slides[(currentIndex - 1 + slides.length) % slides.length].title}`}>
                <span onClick={goToPrevious} className="arrowLeft-icon"></span>
            </Link>
                <h4 className='pageTitle'>{currentSlide ? currentSlide.title : null}</h4>
            <Link to={`/${slides[(currentIndex + 1) % slides.length].title}`}>
                <span onClick={goToNext} className="arrowRight-icon"></span>
            </Link>
        </div>
    );
};

ImageSlider.propTypes = {
    slides: PropTypes.array.isRequired,
};

export default ImageSlider;

// Otro método para cambiar de rutas, más sencillo pero con bugs? a veces las flechas no redirigen
{/* <span className='leftArrow' onClick={goToPrevious}>
    <Link to={`/${currentIndex > 0 ? slides[currentIndex - 1].title : slides[slides.length - 1].title}`}>🡨</Link>
        </span>
            {currentSlide ? currentSlide.title : null}
        <span className='rightArrow' onClick={goToNext}>
    <Link to={`/${currentIndex < slides.length - 1 ? slides[currentIndex + 1].title : slides[0].title}`}>🡪</Link>
</span> */}