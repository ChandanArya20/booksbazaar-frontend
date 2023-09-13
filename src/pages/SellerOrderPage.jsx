import '../css/order_page.css';
import '../css/order_filter_model.css';
import SellerOrderItem from '../components/SellerOrderItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import Navbar from '../components/Navbar';
import { getCurrentSellerDetails } from '../Auth/sellerLoginFunc';
import {BiFilterAlt as FilterIcon} from 'react-icons/bi';
import SellerOrderFilterModel from '../components/SellerOrderFilterModel';

const SellerOrderPage = () => {

    const [originalOrders, setOriginalOrders]=useState([]);
    const [orders, setOrders]=useState([]);
    const navigate=useNavigate();
    const [showFilter, setShowFilter]=useState(false);
    const [filterStatus, setFilterStatus] = useState({
      Pending: false,
      Confirmed: false,
      Shipped: false,
      Delivered: false,
      Cancelled: false,
      Returned: false
    });

    const applyFilter=(filteredStatus)=>{

      setFilterStatus(filteredStatus);
      const filteredOrders=originalOrders.filter(order=>filteredStatus[order.status]);

      if(filteredOrders.length===0){
        setOrders(originalOrders);
      }else{
        setOrders(filteredOrders);
      }
    };

    const fetchAllOrders=async ()=>{
        const sellerId=getCurrentSellerDetails().id;
        try {    
            const response=await fetch(`http://localhost:8080/api/order/seller/${sellerId}/allOrders`)
        
            if(response.ok){
                const orderList=await response.json();
                setOriginalOrders(orderList);
                setOrders(orderList);
            }else{
                const errorObj={errorMessage:"Something went wrong, try later..."};
                navigate("/errorPage",{state:errorObj});
            }              
        } catch (error) {
          console.error(error);
          toast.error("Server is down, try again later", {
            position: 'top-center',
            theme: 'dark'
          });
        }     
    }

    useEffect(()=>{
      fetchAllOrders();
    },[]);

    
  return (
    <div className='seller_order-page_container'>
    {
      orders.length===0?<div className="empty-cart">
          <h1 className='empty-cart-heading'>There is no recent orders...</h1>
          <button className='empty-cart-btn' onClick={()=>navigate(-1)}>Go Back</button>
          </div> :
      <>
      <Navbar backButton={true}/> 
      <div className="order-page">
        <h2>Users Order</h2>
        <div className="filter-button" onClick={()=>setShowFilter(true)}>
          <FilterIcon/>
          <p>Filters </p>
        </div>
        {showFilter && <SellerOrderFilterModel 
                          setShowFilter={setShowFilter} 
                          currentFilterStatus={filterStatus}
                          applyFilter={applyFilter} />}
        <div className="order-list">
          {
            orders?.map(order => (
              <SellerOrderItem key={order.id} order={order} />
            ))
          }
        </div>
      </div>
      </>
    }
    </div>
  );
};

export default SellerOrderPage;
