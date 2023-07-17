
export const doSellerLogin=(data,next)=>{
    localStorage.setItem("sellerData",JSON.stringify(data))
    next()
}
export const isSellerLoggedin=()=>{
    let data=localStorage.getItem("sellerData")
    if(data!=null)
        return true
    else
        return false
}

export const doSellerLogout=(next)=>{
    localStorage.removeItem("sellerData")
    next()
}

export const getCurrentSellerDetails = () => {
    if (isSellerLoggedin()) {
      const sellerData = localStorage.getItem("sellerData");
      const parsedData = JSON.parse(sellerData);
      return parsedData.seller;
    } else {
      return undefined;
    }
  };
  