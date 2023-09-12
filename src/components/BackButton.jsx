import { useNavigate } from 'react-router-dom';
import '../css/back_button.css';
import {BiArrowBack as BackArrow} from 'react-icons/bi';


const BackButton=()=>{

    const navigate=useNavigate();

    const goBack=()=>{
        navigate(-1);
    }

    return(
        <>
        <BackArrow className='back-arrow-btn' onClick={goBack}/>
        </>
    )
}

export default BackButton;