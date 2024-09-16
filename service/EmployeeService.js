import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";
class EmployeeService{

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }
    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }
    
    getEmployeeById(employeeId) {
        console.log("Fetching employee by ID:", employeeId); // Log to check if ID is passed correctly
        return axios.get(EMPLOYEE_API_BASE_URL, employeeId)
            .catch(error => {
                console.error("Error fetching employee:", error); // Log the error
                throw error; // Re-throw the error after logging
            });
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

const employeeService = new EmployeeService();
export default employeeService;