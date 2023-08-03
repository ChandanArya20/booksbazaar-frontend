import { useForm } from 'react-hook-form';
import '../css/address_form_page.css'


const AddressFormPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitAddress = (data) => {
    console.log(data);
  };

  return (
    <div className="address-form-container">
      <h2>Address Details</h2>
      <form onSubmit={handleSubmit(submitAddress)}>
        <div className="form-group">
          <label>Name</label>
          <input
          {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Length should not be less than 3"
              }
            })}
            />
        </div>
        <p className="error-message">{errors.name?.message}</p>

        <div className="form-group">
          <label>Phone</label>
          <input
          {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^[6-9][0-9]*$/,
                message: 'Invalid pincode'
              },
              minLength: {
                value: 10,
                message: 'Number must be exactly 10 digits'
              },
              maxLength: {
                value: 10,
                message: 'Number must be exactly 10 digits'
              }
            })}
            />
        </div>
        <p className="error-message">{errors.phone?.message}</p>

        <div className="form-group">
          <label>Pincode</label>
          <input
          {...register('pincode', {
            required: 'Pincode is required',
            pattern: {
              value: /^[1-9][0-9]{5}$/,
              message: 'Only digits 0-9 are allowed'
            },
            minLength: {
              value: 6,
              message: 'Number must be exactly 6 digits'
            },
            maxLength: {
              value: 6,
              message: 'Number must be exactly 6 digits'
            }
          })}
          />
        </div>
        <p className="error-message">{errors.pincode?.message}</p>

        <div className="form-group">
          <label>Street Name</label>
          <input
          {...register("streetName", {
            required: "Street name is required",
            minLength: {
              value: 3,
              message: "Length should not be less than 3"
            },
          })}
          />
        </div>
        <p className="error-message">{errors.streetName?.message}</p>

        <div className="form-group">
          <label>City</label>
          <input
          {...register("city", {
            required: "City is required",
            minLength: {
              value: 3,
              message: "Length should not be less than 3"
            },
          })} 
          />        
        </div>
        <p className="error-message">{errors.city?.message}</p>

        <div className="form-group">
          <label>State</label>
          <input
          {...register("state", {
            required: "State is required",
            minLength: {
              value: 3,
              message: "Length should not be less than 3"
            },
          })}  
          />   
        </div>
        <p className="error-message">{errors.state?.message}</p>

        <div className="form-group">
          <label>Address Type</label>
          <select {...register('addressType', {
            required: 'Please choose one',
          })}>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
          </select>
        </div>
        <p className="error-message">{errors.addressType?.message}</p>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddressFormPage;
