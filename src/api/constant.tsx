export const API_URLS = {
    GET_PRODUCTS:'/api/product',
    GET_PRODUCT: (id : string) => `/api/product/${id}`,
    GET_CATEGORIES:'/api/category',
    GET_CATEGORY: (id : string) => `/api/category/${id}`,
}


export const API_BASE_URL = 'http://localhost:8080';