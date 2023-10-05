import "../css/category_row.css";
import React, { useRef, useState, useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";

const CategoryRow = ({ categories, selectedCategoryId, onCategorySelect }) => {
    
    const categoryListRef = useRef(null);
    const [startX, setStartX] = useState(null);
    const [scrollLeft, setScrollLeft] = useState(0);


    // Function to handle scrolling in the category list
    const handleScroll = (direction) => {
        const scrollAmount = 200; // Adjust scroll distance
        if (direction === "left") {
            // Scroll left by reducing the scrollLeft property
            categoryListRef.current.scrollLeft -= scrollAmount;
        } else if (direction === "right") {
            // Scroll right by increasing the scrollLeft property
            categoryListRef.current.scrollLeft += scrollAmount;
        }
    };


    // Use useEffect for touch event handling
    useEffect(() => {
		
        const categoryList = categoryListRef.current;
        // Handle touch start event
        const handleTouchStart = (e) => {
            setStartX(e.touches[0].clientX);
        };
        // Handle touch move event
        const handleTouchMove = (e) => {
            if (!startX) return;

            const currentX = e.touches[0].clientX;
            const diffX = startX - currentX;

            // Adjust scrollLeft based on touch movement
            categoryList.scrollLeft = scrollLeft + diffX;
        };
        // Handle touch end event
        const handleTouchEnd = () => {
            setStartX(null);
            setScrollLeft(categoryList.scrollLeft);
        };
        // Add event listeners for touch events
        categoryList.addEventListener("touchstart", handleTouchStart);
        categoryList.addEventListener("touchmove", handleTouchMove);
        categoryList.addEventListener("touchend", handleTouchEnd);

        // Remove event listeners when component unmounts
        return () => {
            categoryList.removeEventListener("touchstart", handleTouchStart);
            categoryList.removeEventListener("touchmove", handleTouchMove);
            categoryList.removeEventListener("touchend", handleTouchEnd);
        };
    }, [scrollLeft, startX]);



    return (
        <div className="category-row">
            {/* Scroll left button */}
            <div className="scroll-button left" onClick={() => handleScroll("left")}>
                <MdArrowForwardIos />
            </div>
            {/* Category list */}
            <div className="category-list" ref={categoryListRef}>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`category-item ${
                            selectedCategoryId === category.id ? "selected" : ""
                        }`}
                        onClick={() => onCategorySelect(category)}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
            {/* Scroll right button */}
            <div className="scroll-button right" onClick={() => handleScroll("right")}>
                <MdArrowForwardIos />
            </div>
        </div>
    );
};

export default CategoryRow;
