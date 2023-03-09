import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import logo from "../../assets/images/logo.jpeg";
import "./Home.css";
import Modal from '../../components/Modal';
import { Link } from 'react-router-dom'


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

  let minBirthday = new Date()
    ;

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
    console.log(formData);
    if (validateForm()) {
      let employees = JSON.parse(localStorage.getItem("employees")) || [];

      employees.push(formData);

      localStorage.setItem("employees", JSON.stringify(employees));
      setIsOpenModal(true)
    }

  };

  return (
    <div className='container'>
      <div className="card-form">
        <div className="p-fluid grid">
          <img src={logo} alt="logo" className="logo" />
          <br />
          <h3>Create Employee</h3>
          <br />
          <form onSubmit={handleSubmit}>
            <div className='gap-2'>
              <label htmlFor="inputtext">First Name</label>
              <br /><br />
              <InputText name='name' type='text' id="inputtext" className={formData.nameError?.length > 0 ? "p-invalid block" : "block"} value={formData.name} onChange={handleChange} />
              {formData.nameError && <small className="p-error block">{formData.nameError}</small>}
              <br /><br />
            </div>
            <div className="gap-2">
              <label htmlFor="inputtext">Last Name</label>
              <br /><br />
              <InputText name='lastname' type='text' id="inputtext" className={formData.lastnameError ? "p-invalid block" : "block"} value={formData.lastname} onChange={handleChange} />
              {formData.lastnameError && <small className="p-error block">{formData.lastnameError}</small>}
            </div>
            <br />
            <div className="gap-2">
              <label htmlFor="calenderselect">Date of Birth</label>
              <br /><br />
              <Calendar minDate={minBirthday} maxDate={maxBirthday} name='birthday' inputId="calenderselect" className={formData.birthdayError ? "p-invalid block" : "block"} value={formData.birthday} onChange={handleChange} dateFormat="yy-mm-dd" showIcon={true} />
              {formData.birthdayError && <small className="p-error block">{formData.birthdayError}</small>}
            </div>
            <br />
            <div className="gap-2">
              <label htmlFor="calenderselect">Start Date</label>
              <br /><br />
              <Calendar name='startdate' inputId="calenderselect" value={formData.startdate} onChange={handleChange} className={formData.startdateError ? "p-invalid block" : "block"} dateFormat="yy-mm-dd" showIcon={true} />
              {formData.startdateError && <small className="p-error block">{formData.startdateError}</small>}
            </div>
            <br />
            <h3>Address</h3>
            <br />
            <div className="gap-2">
              <label htmlFor="inputtext">Street</label>
              <br /><br />
              <InputText name='street' type='text' id="inputtext" value={formData.street} className={formData.streetError ? "p-invalid block" : "block"} onChange={handleChange} />
              {formData.streetError && <small className="p-error block">{formData.streetError}</small>}
            </div>
            <br />
            <div className="gap-2">
              <label htmlFor="dropdown">State</label>
              <br /><br />
              <Dropdown inputId="dropdown" name="state" options={states} value={formData.state} onChange={handleChange} className={formData.stateError?.length > 0 ? "p-invalid block" : "block"} />
              {formData.stateError && <small className="p-error block">{formData.stateError}</small>}
            </div>
            <br />
            <div className="gap-2">
              <label htmlFor="inputtext">Zip Code</label>
              <br /><br />
              <InputText name='zipcode' type='number' id="inputtext" value={formData.zipcode} onChange={handleChange} className={formData.zipcodeError?.length > 0 ? "p-invalid block" : "block"} />
              {formData.zipcodeError && <small className="p-error block">{formData.zipcodeError}</small>}
            </div>
            <br />
            <div className="gap-2">
              <label htmlFor="dropdown">Department</label>
              <br /><br />
              <Dropdown inputId="dropdown" name="department" options={departments} value={formData.department} onChange={handleChange} className={formData.departmentError?.length > 0 ? "p-invalid block" : "block"} />
              {formData.departmentError && <small className="p-error block">{formData.departmentError}</small>}
            </div>
            <br /><br />
            <Button label="Submit" type="submit" className="p-button-success" />
            <br /><br />
          </form>
          <Link to="/employee" className="employee-button">
            <Button icon="pi pi-eye" className="p-button-info mr-2 p-button-outlined" label='View All Employee' />
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
