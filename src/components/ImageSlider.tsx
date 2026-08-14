import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  alt?: string;
  height?: string;
  autoPlay?: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  alt = 'Image',
  height = '220px',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure there are always at least 2-3 images to slide through if only 1 is provided
  const defaultFallbackPool = [
    '/images/hospital_construction.png',
    '/images/radiation_shielding.png',
    '/images/medical_equipment.png',
    '/images/scrub_sink.png',
    '/images/pass_box.png',
    '/images/hero_background.png'
  ];

  const slideList = (images && images.length > 1) 
    ? images 
    : [
        images[0] || '/images/hospital_construction.png',
        ...defaultFallbackPool.filter(img => img !== images[0]).slice(0, 2)
      ];

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? slideList.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === slideList.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(index);
  };

  return (
    <div
      className="image-slider-container"
      style={{
        position: 'relative',
        width: '100%',
        height: height,
        backgroundColor: 'var(--bg-secondary)',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Active Image */}
      <img
        src={slideList[currentIndex]}
        alt={`${alt} - ${currentIndex + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'all 0.4s ease-in-out',
        }}
      />

      {/* Prev Arrow */}
      {slideList.length > 1 && (
        <button
          onClick={prevSlide}
          title="Previous Image"
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 5,
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.9)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.65)'}
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Next Arrow */}
      {slideList.length > 1 && (
        <button
          onClick={nextSlide}
          title="Next Image"
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 5,
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.9)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.65)'}
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Dot Indicators */}
      {slideList.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '6px',
            zIndex: 5,
            padding: '4px 8px',
            borderRadius: '12px',
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {slideList.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => goToSlide(e, idx)}
              style={{
                width: idx === currentIndex ? '16px' : '6px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: idx === currentIndex ? '#0EA5E9' : 'rgba(255, 255, 255, 0.6)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
