import Navbar from "./Navbar"
import MainSection from "./MainSection"
import RecommendedBooks from "./RecommendedBooks"
import Services from "./Services"
import Footer from "./Footer"
import CategoryRow from "./CategoryRow"
import { useState } from "react"

const HomePage=()=>{

const [selectedCategory, setSelectedCategory] = useState(null);

const categories = [
    { id: 1, name: 'Sceince & Mathematics' },
    { id: 2, name: 'Computer & internet' },
    { id: 3, name: 'Technology & Engineering' },
    { id: 4, name: 'Society & Social Science' },
    { id: 5, name: 'Bussiness $ Echonomics' },
    { id: 6, name: 'History & Humanities' },
    { id: 7, name: 'Arts & Photography' },
    { id: 8, name: 'Boigrphy $ Memories' },
    { id: 9, name: 'Exam Preparation' },
    { id: 10, name: 'Mystery/Thriller' },
    { id: 11, name: 'Cooking' },
    { id: 12, name: 'Dictionaries & Language' },
    { id: 13, name: 'Religion/Spirituality' },
    { id: 14, name: 'Health/Fitness' },
    { id: 15, name: 'Family/Lifestyle & Parenting' },
    { id: 16, name: 'Medicine' },
    { id: 17, name: 'Fictional' },
    { id: 18, name: 'Non-Fictional' },
    { id: 19, name: 'Literature' },
    { id: 20, name: 'Childrenn & Teens' },
  ];
  
  const handleCategorySelect = categoryId => {
    setSelectedCategory(categoryId);
    // Perform any additional actions when a category is selected
  };
    return(
        <>
        <Navbar/>
        <CategoryRow
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}/>     
        <RecommendedBooks/>
        <Services/>
        <Footer/>
        </>
    )
}

export default HomePage