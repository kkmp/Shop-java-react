import axios from "axios";

export const postRequest = async (url, data, callback, errorCallback = null) => {
    try {
        const response = await axios.post(url, data);
        if (response.status === 200) {
            callback(response);
        }
    } catch (e) {
        if (e.response.status === 401) {
            localStorage.removeItem("token");
            window.location = '/login'
        }
        else if (e.response.status >= 300 && e.response.status <= 500) {
            if (errorCallback != null) {
                errorCallback(e.response);
            }
        }
    }
}

export const getRequest = async (url, callback, errorCallback = null) => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            callback(response);
        }
    } catch (e) {
        if (e.response.status === 401) {
            localStorage.removeItem("token");
            window.location = '/login'
        }
        else if (e.response.status >= 300 && e.response.status <= 500) {
            if (errorCallback != null) {
                errorCallback(e.response);
            }
        }
    }
}

export const authorizedPostRequest = async (url, data, callback, errorCallback = null) => {
    const tokenRead = localStorage.getItem("token");
    if (tokenRead == null || tokenRead === '') {
        window.location = '/login'
    }
    const config = {
        headers: {
            'Authorization': 'Bearer ' + tokenRead,
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.post(url, data, config)
        if (response.status === 200) {
            callback(response);
        }
    } catch (e) {
        if (e.response.status === 401) {
            localStorage.removeItem("token");
            window.location = '/login'
        }
        else if (e.response.status >= 300 && e.response.status <= 500) {
            if (errorCallback != null) {
                errorCallback(e.response);
            }
        }
    }
}

export const authorizedGetRequest = async (url, callback, errorCallback = null) => {
    const tokenRead = localStorage.getItem("token");
    if (tokenRead == null || tokenRead === '') {
        window.location = '/login'
    }
    const config = {
        headers: {
            'Authorization': 'Bearer ' + tokenRead,
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.get(url, config)
        if (response.status === 200) {
            callback(response);
        }
    } catch (e) {
        if (e.response.status === 401) {
            localStorage.removeItem("token");
            window.location = '/login'
        }
        else if (e.response.status >= 300 && e.response.status <= 500) {
            if (errorCallback != null) {
                errorCallback(e.response);
            }
        }
    }
}

export const authorizedDeleteRequest = async (url, callback, errorCallback = null) => {
    const tokenRead = localStorage.getItem("token");
    if (tokenRead == null || tokenRead === '') {
        window.location = '/login'
    }
    const config = {
        headers: {
            'Authorization': 'Bearer ' + tokenRead,
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.delete(url, config)
        if (response.status === 200) {
            callback(response);
        }
    } catch (e) {
        if (e.response.status === 401) {
            localStorage.removeItem("token");
            window.location = '/login'
        }
        else if (e.response.status >= 300 && e.response.status <= 500) {
            if (errorCallback != null) {
                errorCallback(e.response);
            }
        }
    }
}

export const authorizedPutRequest = async (url, data, callback, errorCallback = null) => {
    const tokenRead = localStorage.getItem("token");
    if (tokenRead == null || tokenRead === '') {
        window.location = '/login'
    }
    const config = {
        headers: {
            'Authorization': 'Bearer ' + tokenRead,
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.put(url, data, config)
        if (response.status === 200) {
            callback(response);
        }
    } catch (e) {
        if (e.response.status === 401) {
            localStorage.removeItem("token");
            window.location = '/login'
        }
        else if (e.response.status >= 300 && e.response.status <= 500) {
            if (errorCallback != null) {
                errorCallback(e.response);
            }
        }
    }
}