import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const ImageCarousel = () => {
  const images = [
    'https://i.ibb.co/qCkd9jS/img1.jpg',
    'https://i.ibb.co/jrRb11q/img2.jpg',
    'https://i.ibb.co/NSwVv8D/img3.jpg',
    'https://i.ibb.co/Bq4Q0M8/img4.jpg',
    'https://i.ibb.co/jTQfmTq/img5.jpg',
    'https://i.ibb.co/RNkk6L0/img6.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const slideCount = images.length;

  const handleNext = () => {
    const nextSlide = (currentSlide + 1) % slideCount;
    setCurrentSlide(nextSlide);
    const slideWidth = slideRef.current.offsetWidth;
    slideRef.current.scrollTo({ left: nextSlide * slideWidth, behavior: 'smooth' });
  };

  const handlePrev = () => {
    const prevSlide = (currentSlide - 1 + slideCount) % slideCount;
    setCurrentSlide(prevSlide);
    const slideWidth = slideRef.current.offsetWidth;
    slideRef.current.scrollTo({ left: prevSlide * slideWidth, behavior: 'smooth' });
  };

  // Ensuring that on resize, the scroll snaps to the correct slide
  useEffect(() => {
    const slideWidth = slideRef.current.offsetWidth;
    slideRef.current.scrollTo({ left: currentSlide * slideWidth, behavior: 'smooth' });
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden w-full mx-auto">
      <div className="relative w-full flex overflow-x-scroll no-scrollbar" ref={slideRef}>
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-96 rounded-2xl shadow-lg bg-cover bg-center transition-transform duration-500 ease-in-out"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white bg-black bg-opacity-50">
              <h2 className="text-4xl font-bold uppercase">Name {index + 1}</h2>
              <p className="mt-4 mb-8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              <button className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">See More</button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          className="px-4 py-2 border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white"
          onClick={handlePrev}
        >
          <ArrowLeft />
        </button>
        <button
          className="px-4 py-2 border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white"
          onClick={handleNext}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
