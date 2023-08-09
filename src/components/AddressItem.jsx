import '../css/address_item.css'
import '../css/address_selector_page.css'; 

const AddressItem=({address, handleAddressSelection, isSelected})=>{

    return(
        <>
        <div className='address-card'>
          <p><span>Name: </span>{address.name}</p>
          <p><span>Phone: </span>{address.phone}</p>
          <p>
          <span>Address: </span>{address.streetName}, {address.city}, {address.state} - {address.pincode}
          </p>
          <p><span>AddressType: </span>{address.addressType}</p>
        </div>
        </>
    )
}

export default AddressItem