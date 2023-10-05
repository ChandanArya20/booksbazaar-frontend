// Seller login function
export const doSellerLogin=(data,next)=>{
    localStorage.setItem("sellerData",JSON.stringify(data));
    next();
}

// Check if the seller is logged in
export const isSellerLoggedin=()=>{
    let data=localStorage.getItem("sellerData");
    if(data!=null){
        return true;
	}else{
        return false;
	}
};

// Seller logout function
export const doSellerLogout=(next)=>{
    localStorage.removeItem("sellerData");
    next();
};

// Get the current seller's details if they are logged in
export const getCurrentSellerDetails = () => {
    if (isSellerLoggedin()) {

      const sellerData = localStorage.getItem("sellerData");
      const parsedData = JSON.parse(sellerData);

      return parsedData.seller;

    }else{
      return null;
    }
  };
  