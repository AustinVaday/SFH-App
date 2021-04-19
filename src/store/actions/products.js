import Product from '../../models/Product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';


export const fetchProduct = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://sfh-mobile-app.firebaseio.com/products.json'
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseData = await response.json();
            const loadedProduct = [];
            for (const key in responseData) {
                loadedProduct.push(
                    new Product(
                        key,
                        responseData[key].id,
                        responseData[key].title,
                        responseData[key].description,
                        responseData[key].videoUrl,
                        responseData[key].caption,
                        responseData[key].likes,
                        responseData[key].numComments
                    )
                );
            }
            dispatch({ type: SET_PRODUCT, products: loadedProduct });
        } catch (err) {
            // send to custom analytics server
            throw err;
        }
    };
};

export const deleteProduct = ownerId => {
    return async dispatch => {
        const response = await fetch(
            `https://sfh-mobile-app.firebaseio.com/${ownerId}.json`,
            {
                method: 'DELETE'
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({ type: DELETE_PRODUCT, oid: ownerId });
    };
};

export const createProduct = (title, description, videoUrl, caption, likes, numComments) => {
    return async dispatch => {
        const response = await fetch(
            'https://sfh-mobile-app.firebaseio.com/products.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    videoUrl,
                    caption,
                    likes,
                    numComments
                })
            }
        );
        const responseData = await response.json();
        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: responseData.name,
                title,
                description,
                videoUrl,
                caption,
                likes,
                numComments
            }
        });
    };
};


export const updateProduct = (id, title, description, videoUrl, caption, likes, numComments) => {
    return async dispatch => {
        const response = await fetch(
            `https://sfh-mobile-app.firebaseio.com/${ownerId}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    videoUrl,
                    caption,
                    likes,
                    numComments
                })
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({
            type: UPDATE_PRODUCT,
            oid: id,
            productData: {
                title,
                description,
                videoUrl,
                caption,
                likes,
                numComments
            }
        });
    };
};