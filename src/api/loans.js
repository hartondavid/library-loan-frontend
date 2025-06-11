import { getToken } from '../utils/utilFunctions';

export const apiAddLoan = async (successCallback, errorCallback, bookId, quantity, start_date, end_date) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/loans/addLoan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ book_id: bookId, quantity: quantity, start_date: start_date, end_date: end_date })
        });
        const data = await response.json();
        if (!data.success) {
            errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to add loan" });
    }
};

export const apiUpdateLoanStatus = async (successCallback, errorCallback, loanId, status) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/loans/updateLoanStatus/${loanId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: status })
        });
        const data = await response.json();
        if (!data.success) {
            errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to update loan status" });
    }
};



export const apiGetLoansByStudentId = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/loans/getLoansByStudentId`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!data.success) {
            // errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to fetch loans" });
    }
};

export const apiDeleteLoan = async (successCallback, errorCallback, loanId) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/loans/deleteLoan/${loanId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!data.success) {
            errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to delete loan" });
    }
};

export const apiGetLoans = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/loans/getLoans`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!data.success) {
            // errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to fetch loans" });
    }
};


export const apiGetPastLoans = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/loans/getPastLoans`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!data.success) {
            // errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to fetch loans" });
    }
};

export const apiGetPastLoansByStudentId = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/loans/getPastLoansByStudentId`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!data.success) {
            // errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to fetch loans" });
    }
};




