import { getToken } from '../utils/utilFunctions';

export const apiAddBook = async (successCallback, errorCallback, reqData) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {

        console.log('Req data:----------', reqData);
        const formData = new FormData();

        formData.append('title', reqData.title);
        formData.append('author', reqData.author);
        formData.append('description', reqData.description);
        formData.append('language', reqData.language);
        formData.append('quantity', reqData.quantity);
        formData.append('publisher', reqData.publisher);
        formData.append('number_of_pages', reqData.numberOfPages);

        if (reqData.photo) {
            formData.append('photo', reqData.photo); // Make sure `reqData.image_path` is a File object
        }
        const response = await fetch(`${apiUrl}/api/books/addBook`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        const data = await response.json();
        if (!data.success) {
            errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to add book" });
    }
};

export const apiUpdateBook = async (successCallback, errorCallback, bookId, reqData) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {

        console.log('reqData', reqData);
        const formData = new FormData();
        formData.append('title', reqData.title);
        formData.append('author', reqData.author);
        formData.append('description', reqData.description);
        formData.append('language', reqData.language);
        formData.append('quantity', reqData.quantity);
        formData.append('publisher', reqData.publisher);
        formData.append('number_of_pages', reqData.numberOfPages);

        if (reqData.photo) {
            formData.append('photo', reqData.photo); // Make sure `reqData.image_path` is a File object
        }
        const response = await fetch(`${apiUrl}/api/books/updateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        const data = await response.json();
        if (!data.success) {
            errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to update book" });
    }
};

export const apiDeleteBook = async (successCallback, errorCallback, bookId) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/books/deleteBook/${bookId}`, {
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
        errorCallback({ success: false, message: "Failed to delete book" });
    }
};


export const apiGetBookById = async (successCallback, errorCallback, bookId) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/books/getBook/${bookId}`, {
            method: 'GET',
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
        errorCallback({ success: false, message: "Failed to fetch book" });
    }
};

export const apiGetBooks = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/books/getBooks`, {
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
        errorCallback({ success: false, message: "Failed to fetch books" });
    }
};
