import React, { Component } from 'react';
import EmployeeService from '../service/EmployeeService';
import { withRouter } from '../withRouter/WithRouter'; // Make sure this HOC is adapted for React Router v6

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
    
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.viewEmployee = this.viewEmployee.bind(this); // Bind the viewEmployee method
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then(res => {
      this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
    });
  }

  addEmployee() {
    this.props.navigate('/add-employee/-1'); // Use navigate instead of history.push
  }

  editEmployee(id) {
    this.props.navigate(`/add-employee/${id}`); // Use navigate instead of history.push
  }

  viewEmployee(id) {
    this.props.navigate(`/view-employee/${id}`); // Use navigate instead of history.push
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Employees List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addEmployee} style={{ width: '200px' }}>Add Employee</button>
        </div>
        <br />
        <div className="row">
          <table className="table table-striped table-dark table-hover">
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.emailId}</td>
                  <td>
                    <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// Exporting withRouter adapted for React Router v6
export default withRouter(ListEmployeeComponent);
