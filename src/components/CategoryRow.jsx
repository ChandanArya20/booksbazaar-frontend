import '../css/category_row.css';
import React, { useRef, useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';


const CategoryRow = ({ categories, selectedCategoryId, onCategorySelect }) => {

  const categoryListRef = useRef(null);

  const handleScroll = direction => {
    
    const scrollAmount = 200; // Adjust scroll distance
    if (direction === 'left') {
      categoryListRef.current.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      categoryListRef.current.scrollLeft += scrollAmount;
    }
  };


  return (
    <div className="category-row">
      <div className='scroll-button left' onClick={() => handleScroll('left')}>
        <MdArrowForwardIos />
      </div>
      <div className="category-list" ref={categoryListRef}>
        {categories.map(category => (
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
