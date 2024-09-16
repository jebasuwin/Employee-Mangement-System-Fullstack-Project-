import React, { Component } from 'react';
import EmployeeService from '../service/EmployeeService';
import { withRouter } from '../withRouter/WithRouter'; // Assuming you save the withRouter HOC as withRouter.js

class CreateEmployeeComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: this.props.params.id, // Using params from React Router v6
        firstName: '',
        lastName: '',
        emailId: ''
      };
      this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
      this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
      this.changeEmailHandler = this.changeEmailHandler.bind(this);
      this.saveEmployee = this.saveOrUpdateEmployee.bind(this);
      this.cancel = this.cancel.bind(this);
    }
  
    componentDidMount() {
      if (this.state.id === '-1') {
        return;
      } else {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
          let employee = res.data;
          this.setState({
            firstName: employee.firstName,
            lastName: employee.lastName,
            emailId: employee.emailId
          });
        });
      }
    }
  
    saveOrUpdateEmployee = (e) => {
      e.preventDefault();
      let employee = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailId: this.state.emailId
      };
  
      if (this.state.id === '-1') {
        EmployeeService.createEmployee(employee).then((res) => {
          this.props.navigate('/employees');
        });
      } else {
        EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
          this.props.navigate('/employees');
        });
      }
    };
  
    changeFirstNameHandler(event) {
      this.setState({ firstName: event.target.value });
    }
  
    changeLastNameHandler(event) {
      this.setState({ lastName: event.target.value });
    }
  
    changeEmailHandler(event) {
      this.setState({ emailId: event.target.value });
    }
  
    cancel() {
      this.props.navigate('/employees');
    }
    
    getTitle(){
        if(this.state.id === '-1'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
      return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
          <div className="card text-white bg-secondary mb-3 col-md-6 col-lg-4 ">
                {this.getTitle()}
            <div className="card-body">
              <form>
                <div className="form-group">
                  <input
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={this.changeFirstNameHandler}
                  />
                </div>
                <div className="form-group">
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={this.state.lastName}
                    onChange={this.changeLastNameHandler}
                  />
                </div>
                <div className="form-group">
                  <input
                    placeholder="Email Address"
                    name="emailId"
                    className="form-control"
                    value={this.state.emailId}
                    onChange={this.changeEmailHandler}
                  />
                </div>
                <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: "10px" }}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default withRouter(CreateEmployeeComponent);
  