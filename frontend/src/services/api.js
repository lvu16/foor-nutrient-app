const API_BASE_URL = 'http://localhost:8000/api';

// helper function to handle fetch responses
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || `HTTP Error: ${response.status}`);
    }
    return data;
};


// search for food by name
export const searchFoods = async (query, page = 1) => {
    try {
        const url = new URL(`${API_BASE_URL}/search`);
        url.searchParams.append('query', query);
        url.searchParams.append('page', page);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await handleResponse(response);
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new Error('Unable to connect to server. Please check if backend is running');
        }
        throw error;
    }
};

// get detailed nutritional information for a food item
export const getFoodDetail = async (fdcId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/food/${fdcId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 404) {
            throw new Error('Food not found');
        }

        return await handleResponse(response);
    } catch (error) {
         if (error.name === 'TypeError') {
            throw new Error('Unable to connect to server. Please check if backend is running');
        }
        throw error;
    }
};