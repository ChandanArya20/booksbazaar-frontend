import { HiOutlineArrowLongRight } from "react-icons/hi2";
import book1 from "../Images/book1.png";
import book2 from "../Images/book2.jpg";

const MainSection=()=>{
    return (
        <div className="main-section">
            <div className="main-section-content">
                <h1 className="main-section-title">Buy <span style={{ color: 'red' }}>Your</span></h1>
                <h1 className="main-section-title">favorite <span style={{ color: 'red' }}>Books</span></h1>
                <h1 className="main-section-title">From <span style={{ color: 'red' }}>Here...</span></h1>
                <div className="shop-now-btn">
                <p>SHOP NOW</p>
                <HiOutlineArrowLongRight style={{fontSize:"30px"}}></HiOutlineArrowLongRight>
            </div>
            </div>
            <div className="main-section-img">
                <img src={book1} alt="" />
                <img src={book2} alt="" />
            </div>
        </div>
    )
}

export default MainSection;
