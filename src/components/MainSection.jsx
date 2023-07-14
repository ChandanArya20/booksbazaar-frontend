import { HiOutlineArrowLongRight as ArrowIcon} from "react-icons/hi2";
import book1 from "../Images/book1.png";
import book2 from "../Images/book2.jpg";
import '../css/main_section.css'

const MainSection=()=>{
    return (
        <div className="main-section">
            <div className="main-section-content">
                <div>
                    <h1 className="main-section-title">Buy <span style={{ color: 'red' }}>Your</span></h1>
                    <h1 className="main-section-title">favorite <span style={{ color: 'red' }}>Books</span></h1>
                    <h1 className="main-section-title">From <span style={{ color: 'red' }}>Here...</span></h1>
                    <div className="shop-now-btn">                 
                    <a href="#books">SHOP NOW</a>                       
                    <ArrowIcon style={{fontSize:"30px", marginTop:"3px"}} />
                    </div>
                </div>
            </div>
            <div className="main-section-img">
                <img src={book2} alt="" />
            </div>
        </div>
    )
}

export default MainSection;
