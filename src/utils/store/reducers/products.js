import { CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCT, DELETE_PRODUCT } from '../actions/products';
import products from '../../models/Product';
import users from '../../data/users';
import Product from '../../models/Product';


const initState = {
    availableProducts: Product,
    userProducts: Product.filter(prod => prod.ownerId === 'name')
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                availableProducts: actions.products,
                userProducts: actions.products.filter(prod => prod.ownerId === 'name')
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.oid,
                'name',
                action.productData.title,
                action.productData.videoUrl,
                action.productData.description,
                action.productData.caption,
                action.productData.likes,
                action.productData.numComments
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };
        case UPDATE_PRODUCT:
            const updatedProduct = new Product(
                action.oid,
                action.productData.title,
                action.productData.videoUrl,
                action.productData.description,
                action.productData.caption,
                action.productData.likes,
                action.productData.numComments
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(
                prod => prod.ownerId === action.oid
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.ownerId !== action.oid
                ),
                availableProducts: state.availableProducts.filter(
                    product => product.ownerId !== action.oid
                )
            };
    }
    return state;
}