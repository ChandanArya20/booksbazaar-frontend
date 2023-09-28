import '../css/category_row.css';
import React, { useRef, useState, useEffect } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

const CategoryRow = ({ categories, selectedCategoryId, onCategorySelect }) => {
  
  const categoryListRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = direction => {
    
    const scrollAmount = 200; // Adjust scroll distance
    if (direction === 'left') {
      categoryListRef.current.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      categoryListRef.current.scrollLeft += scrollAmount;
    }
  };
  
  useEffect(() => {
    const categoryList = categoryListRef.current;

    const handleTouchStart = (e) => {
      setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      if (!startX) return;

      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      categoryList.scrollLeft = scrollLeft + diffX;
    };

    const handleTouchEnd = () => {
      setStartX(null);
      setScrollLeft(categoryList.scrollLeft);
    };

    categoryList.addEventListener('touchstart', handleTouchStart);
    categoryList.addEventListener('touchmove', handleTouchMove);
    categoryList.addEventListener('touchend', handleTouchEnd);

    return () => {
      categoryList.removeEventListener('touchstart', handleTouchStart);
      categoryList.removeEventListener('touchmove', handleTouchMove);
      categoryList.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollLeft, startX]);

  return (
    <div className="category-row">
       <div className='scroll-button left' onClick={() => handleScroll('left')}>
        <MdArrowForwardIos />
      </div>
      <div className="category-list" ref={categoryListRef}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-item ${selectedCategoryId === category.id ? 'selected' : ''}`}
            onClick={() => onCategorySelect(category)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className='scroll-button right' onClick={() => handleScroll('right')}>
        <MdArrowForwardIos />
      </div>
    </div>
  );
};

export default CategoryRow;
