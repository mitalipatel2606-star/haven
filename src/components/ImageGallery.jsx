import { useState } from 'react';

export default function ImageGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img
          src={images[activeIndex]}
          alt={`${title} — photo ${activeIndex + 1} of ${images.length}`}
          className="gallery__main-image"
        />
      </div>
      <div className="gallery__thumbs" role="tablist" aria-label={`${title} photos`}>
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`gallery__thumb${index === activeIndex ? ' gallery__thumb--active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >

            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
      >
        Next
      </button>
      <button
        type="button"
        onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
      >
        Prev
      </button>

    </div>
  );
}
