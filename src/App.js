import Navbar from "./components/Navbar";
import MainSection from "./components/MainSection";
import RecommendedBooks from "./components/RecommendedBooks";
import SearchBox from "./components/SearchBox";
import Footer from "./components/Footer";
import Services from "./components/Services";

const App = () => {
  return (
    <>
      <Navbar/>
      <MainSection/>
      <RecommendedBooks />
      <Services/>
      <Footer/>
    </>
  );
};

export default App;
