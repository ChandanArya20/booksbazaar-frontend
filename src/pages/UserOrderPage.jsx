import '../css/order_page.css'
import UserOrderItem from '../components/UserOrderItem';
import { getCurrentUserDetails } from '../Auth/loginFunc';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import Navbar from '../components/Navbar';
import {BiFilterAlt} from 'react-icons/bi'
import SellerOrderFilterModel from '../components/SellerOrderFilterModel';

const UserOrderPage = () => {

    const [originalOrders, setOriginalOrders]=useState([])
    const [orders, setOrders]=useState([])
    const navigate=useNavigate()
    const [showFilter, setShowFilter]=useState(false)
    const [filterStatus, setFilterStatus] = useState({
      Pending: false,
      Confirmed: false,
      Shipped: false,
      Delivered: false,
      Cancelled: false,
      Returned: false
    });

    const closeModel=(e)=>{
      e.stopPropagation(); 
      setShowFilter(false);
    }

    const applyFilter=(filteredStatus)=>{
      console.log(filteredStatus); 
      setFilterStatus(filteredStatus);
      const filteredOrders=originalOrders.filter(order=>filteredStatus[order.status]);

      if(filteredOrders.length===0){
        setOrders(originalOrders);
      }else{
        setOrders(filteredOrders);
      }
    };
  
    const fetchAllOrders=async ()=>{
        const userId=getCurrentUserDetails().id

        try {    
            const response=await fetch(`http://localhost:8080/api/order//user/${userId}/allOrders`)
        
            if(response.ok){
                const orderList=await response.json()
                setOriginalOrders(orderList)
                setOrders(orderList)
            }else{
                const errorObj={errorMessage:"Something went wrong, try later..."}
                navigate("/errorPage",{state:errorObj})
            }              
        } catch (error) {
          console.error(error)
          toast.error("Server is down, try again later", {
            position: 'top-center',
            theme: 'dark'
          });
        }
        
      }

      useEffect(()=>{
        fetchAllOrders()
      },[])
  

  return (
    <>
    {
      orders.length===0?<div className="empty-cart">
          <h1 className='empty-cart-heading'>There is no recent orders...</h1>
          <button className='empty-cart-btn' onClick={()=>navigate('/')}>Continue Shopping</button>
          </div> :
      <>
      <Navbar/> 
      <div className="order-page">
        <h2>My Orders</h2>
        <div className="filter-button" onClick={()=>setShowFilter(true)}>
          <BiFilterAlt/>
          <p>Filters </p>
        </div>
        {showFilter && <SellerOrderFilterModel 
                          setShowFilter={setShowFilter} 
                          applyFilter={applyFilter}
                          currentFilterStatus={filterStatus}/>
        }
        <div className="order-list">
          {orders?.map(order => (
            <UserOrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
      </>
    }
    </>
  );
};

export default UserOrderPage;