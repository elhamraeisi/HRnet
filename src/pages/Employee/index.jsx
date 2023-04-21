import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./Employee.css";
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useSelector } from "react-redux";

function Table() {
  const employees = useSelector((state) => state.employees.employees);


  const [globalFilter, setGlobalFilter] = useState(null);


  const template1 = {
    layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
  }

  const getHeader = () => {
    return (
      <div className="p-input-icon-left">
        <i className="pi pi-search"></i>
        <InputText id='globalSearch' data-testid='globalSearch' type="search" onInput={(e) => setGlobalFilter(e.target.value ? e.target.value : "")} placeholder="Global Search" size="50" />
      </div>
    );
  };

  const birthDayTemplate = (rowData) => {
    return <div>{new Date(rowData.birthday).toLocaleDateString()}</div>
  }

  const startDateTemplate = (rowData) => {
    return <div>{new Date(rowData.startdate).toLocaleDateString()}</div>
  }

  let header = getHeader();

  return (
    <div className='container'>
      <div className="card-table">
        <Link to="/" className='employee-button'>
          <Button icon="pi pi-arrow-left" />
        </Link>
        <h2>Current Employees</h2>
        <DataTable value={employees} removableSort paginator paginatorTemplate={template1} rowsPerPageOptions={[5, 10, 15, 20]} className="p-datatable-customers text-right" showGridlines rows={5} responsiveLayout="scroll" globalFilter={globalFilter} header={header}>
          <Column field="name" header="Name" sortable />
          <Column field="lastname" header="Last Name" sortable />
          <Column field="birthday" header="Birthday" body={birthDayTemplate} sortable />
          <Column field="startdate" header="Start Date" body={startDateTemplate} sortable />
          <Column field="street" header="Street" sortable />
          <Column field="state" header="State" sortable />
          <Column field="zipcode" header="Zipcode" sortable />
          <Column field="department.label" header="Department" sortable />
        </DataTable>
      </div>
    </div>

  );
}

export default Table;
