import '../css/category_row.css';
import React, { useRef } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

const categories = [
  // ... your categories data ...
];

const CategoryRow = ({ categories, selectedCategory, onCategorySelect }) => {

  const categoryListRef = useRef(null);


  const handleScroll = direction => {
    const scrollAmount = 200; // Adjust scroll distance
    if (direction === 'left') {
      categoryListRef.current.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      categoryListRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleClick = (categoryId) => {
    onCategorySelect(categoryId);
    
  };

  return (
    <div className="category-row">
      <div className="scroll-button left" onClick={() => handleScroll('left')}>
        <MdArrowForwardIos />
      </div>
      <div className="category-list" ref={categoryListRef}>
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => handleClick(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="scroll-button right" onClick={() => handleScroll('right')}>
        <MdArrowForwardIos />
      </div>
    </div>
  );
};

export default CategoryRow;
