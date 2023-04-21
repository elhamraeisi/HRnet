import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import logo from "../../assets/images/logo.jpeg";
import "./Home.css";
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addEmployee } from '../../store/reducers/employeesReducer';
import { Modal } from 'super-modal-react'

const states = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
]

const departments = [
  { label: 'Sales' },
  { label: 'Marketing' },
  { label: 'Engineering' },
  { label: 'Human Resources' },
  { label: 'Legal' },
]

function Form() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    birthday: null,
    startdate: null,
    street: '',
    state: null,
    zipcode: '',
    department: null,
  });


  const [isOpenModal, setIsOpenModal] = useState(false);

  let minBirthday = new Date();

  minBirthday.setFullYear(1900)
  minBirthday.setMonth(0)
  minBirthday.setDate(1)

  let maxBirthday = new Date()

  const handleChange = event => {
    const { name, value } = event.target;

    if ((name === "name" || name === "lastname") && value.length < 3) {
      setFormData({
        ...formData,
        [name]: value,
        [name + 'Error']: "Invalid input. Input must be at least 3 characters long."
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        [name + 'Error']: ""
      });
    }
  };

  const validateForm = () => {
    let isFormValid = true;
    let fieldValide = {
      name: true,
      lastname: true,
      birthday: true,
      startdate: true,
      street: true,
      state: true,
      zipcode: true,
      department: true
    }

    if (formData.name.length < 3) {
      fieldValide.name = false
      isFormValid = false;
    }

    if (formData.lastname.length < 3) {
      fieldValide.lastname = false
      isFormValid = false;
    }

    if (!formData.birthday) {
      fieldValide.birthday = false
      isFormValid = false;
    }

    if (!formData.startdate) {
      fieldValide.startdate = false
      isFormValid = false;
    }

    if (formData.street.length < 3) {
      fieldValide.street = false
      isFormValid = false;
    }

    if (!formData.state) {
      fieldValide.state = false
      isFormValid = false;
    }

    if (!formData.zipcode) {
      fieldValide.zipcode = false
      isFormValid = false;
    }

    if (!formData.department) {
      fieldValide.department = false
      isFormValid = false;
    }

    setFormData({
      ...formData,
      'nameError': !fieldValide.name ? "Name must be filled out ! Input must be at least 3 characters long." : "",
      'lastnameError': !fieldValide.lastname ? "Last Name must be filled out ! Input must be at least 3 characters long." : "",
      'birthdayError': !fieldValide.birthday ? "Birthdate must be filled out !" : "",
      'startdateError': !fieldValide.startdate ? "Startdate must be filled out !" : "",
      'streetError': !fieldValide.street ? "Street must be filled out !" : "",
      'stateError': !fieldValide.state ? "State must be filled out !" : "",
      'zipcodeError': !fieldValide.zipcode ? "Zipcode must be filled out !" : "",
      'departmentError': !fieldValide.department ? "Department must be filled out !" : ""
    });

    return isFormValid
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (validateForm()) {

      dispatch(addEmployee(formData))
      setIsOpenModal(true)
    }
  };


  return (
    <div className='container'>
      <div className="card-form">
        <div className="p-fluid grid">
          <img src={logo} alt="logo" className="logo" width={'60%'} height={'auto'} />
          <br />
          <h3>Create Employee</h3>
          <br />
          <form onSubmit={handleSubmit}>
            <div className='gap-2'>
              <label htmlFor="firstName-input" id='firstName-label'>First Name</label>
              <br /><br />
              <InputText name='name' type='text' id="firstName-input" data-testid="firstName-input" className={formData.nameError?.length > 0 ? "p-invalid block" : "block"} value={formData.name} onChange={handleChange}
                aria-labelledby="firstName-label" aria-describedby="firstName-error" />
              {formData.nameError && <small id="firstName-error" className="p-error block">{formData.nameError}</small>}
              <br /><br />
            </div>
            <div className="gap-2">
              <label htmlFor="lastName-input" id='lastName-label'>Last Name</label>
              <br /><br />
              <InputText name='lastname' type='text' id="lastName-input" data-testid="lastName-input" className={formData.lastnameError ? "p-invalid block" : "block"} value={formData.lastname} onChange={handleChange}
                aria-labelledby="lastName-label" aria-describedby="lastName-error" />
              {formData.lastnameError && <small id="lasttName-error" className="p-error block">{formData.lastnameError}</small>}
            </div>
            <br />
            <div className="gap-2">
              <label htmlFor="birthday-input" id='birthday-label'>Date of Birth</label>
              <br /><br />
              <Calendar name='birthday' id='birthday-input' data-testid="birthday-input" minDate={minBirthday} maxDate={maxBirthday} inputId="calenderselect" className={formData.birthdayError ? "p-invalid block" : "block"} value={formData.birthday} onChange={handleChange} dateFormat="yy-mm-dd" showIcon={true}
                aria-labelledby="birthday-label" aria-describedby="birthday-error" />
              {formData.birthdayError && <small id='birthday-error' className="p-error block">{formData.birthdayError}</small>}
            </div>
            <br />
            <div className="gap-2">
              <label htmlFor="calender-input" id='calender-label'>Start Date</label>
              <br /><br />
              <Calendar name='calender' id="calender-input" data-testid="calender-input" value={formData.startdate} onChange={handleChange} className={formData.startdateError ? "p-invalid block" : "block"} dateFormat="yy-mm-dd" showIcon={true}
                aria-labelledby="calender-label" aria-describedby="calender-error" />
              {formData.startdateError && <small id='calender-error' className="p-error block">{formData.startdateError}</small>}
            </div>
            <br />
            <h3>Address</h3>
            <br />
            <div className="gap-2">
              <label htmlFor="street-input" id='street-label'>Street</label>
              <br /><br />
              <InputText name='street' type='text' id="street-input" data-testid="street-input" value={formData.street} className={formData.streetError ? "p-invalid block" : "block"} onChange={handleChange}
                aria-labelledby="street-label" aria-describedby="street-error" />
              {formData.streetError && <small id='street-error' className="p-error block">{formData.streetError}</small>}
            </div>
            <br />
            <div className="gap-2">
              <label htmlFor="state-input" id='state-label'>State</label>
              <br /><br />
              <Dropdown id="state-input" data-testid="state-input" name="state" options={states} value={formData.state} onChange={handleChange} className={formData.stateError?.length > 0 ? "p-invalid block" : "block"}
                aria-labelledby="state-label" aria-describedby="state-error" />
              {formData.stateError && <small id='state-error' className="p-error block">{formData.stateError}</small>}
            </div>
            <br />
            <div className="gap-2">
              <label htmlFor="zipcode-input" id='zipcode-label'>Zip Code</label>
              <br /><br />
              <InputText name='zipcode' type='number' id="zipcode-input" data-testid="zipcode-input" value={formData.zipcode} onChange={handleChange} className={formData.zipcodeError?.length > 0 ? "p-invalid block" : "block"}
                aria-labelledby="zipcode-label" aria-describedby="zipcode-error" />
              {formData.zipcodeError && <small id='zipcode-error' className="p-error block">{formData.zipcodeError}</small>}
            </div>
            <br />
            <div className="gap-2">
              <label htmlFor="department-input" id='department-label'>Department</label>
              <br /><br />
              <Dropdown id="department-input" data-testid="department-input" name="department" options={departments} value={formData.department} onChange={handleChange} className={formData.departmentError?.length > 0 ? "p-invalid block" : "block"}
                aria-labelledby="department-label" aria-describedby="department-error" />
              {formData.departmentError && <small id='department-error' className="p-error block">{formData.departmentError}</small>}
            </div>
            <br /><br />
            <Button type="submit" name='submitForm' className="p-button-success" aria-label="Submit Form" label='Submit' />
            <br /><br />
          </form>
          <Link to="/employee" className="employee-button" aria-label='View All Employee'>
            <Button icon="pi pi-eye" name='viewAllEmployee' className="p-button-info mr-2 p-button-outlined" label='View All Employee' />
          </Link>

          <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} title={'Submission Received'} content={() => <p className="modal-text" >Thank you, we have received your submission.</p>
          }>
          </Modal>
        </div>
      </div >
    </div >
  );
}

export default Form;
