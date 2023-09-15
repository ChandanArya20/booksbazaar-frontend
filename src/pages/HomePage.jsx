import Navbar from "../components/Navbar";
import RecommendedBooks from "../components/RecommendedBooks";
import Services from "../components/Services";
import Footer from "../components/Footer"
import CategoryRow from "../components/CategoryRow"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CategoryResultPage from "../pages/CategoryResultPage"

const HomePage=()=>{

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const navigate=useNavigate();

  const categories = [
    { id: 17, name: 'Fictional' },
    { id: 10, name: 'Mystery/Thriller' },
    { id: 14, name: 'Health/Fitness' },
    { id: 1, name: 'Sceince & Mathematics' },
    { id: 2, name: 'Computer & Internet' },
    { id: 3, name: 'Technology & Engineering' },
    { id: 4, name: 'Society & Social-Science' },
    { id: 5, name: 'Business & Echonomics' },
    { id: 6, name: 'History & Humanities' },
    { id: 7, name: 'Arts & Photography' },
    { id: 8, name: 'Boigrphy & Memories' },
    { id: 9, name: 'Exam Preparation' },
    { id: 11, name: 'Cooking' },
    { id: 12, name: 'Dictionaries & Language' },
    { id: 13, name: 'Religion/Spirituality' },
    { id: 15, name: 'Family/Lifestyle & Parenting' },
    { id: 16, name: 'Medical' },
    { id: 18, name: 'Non-Fictional' },
    { id: 19, name: 'Literature' },
    { id: 20, name: 'Childrenn & Teens' },
  ];
  
  const handleCategorySelect = async(category) => {
    setSelectedCategoryId(category.id);
    let selectedCategoryName=category.name.replace('&',"");
    setSelectedCategoryName(selectedCategoryName)
  };

  return(
      <>
      <Navbar />     
      <CategoryRow
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
      />          
      {selectedCategoryName ? <CategoryResultPage categoryName={selectedCategoryName}/> :
        <>  
        <RecommendedBooks/>
        <Services/>
        <Footer/>
        </>   
      }
      </>
    )
}

export default HomePage