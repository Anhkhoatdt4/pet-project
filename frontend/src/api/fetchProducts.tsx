import { API_BASE_URL , API_URLS } from "./constant";
import axios from "axios";

export const getAllProducts = async (id : string , typeId?: string) => {
    try {
        let url = `${API_BASE_URL}${API_URLS.GET_PRODUCTS}` + `?categoryId=${id}`;
        
        if (typeId) {
            url += `&typeId=${typeId}`;
        }
        console.log("URL", url);
        const response = await axios.get(url);
        console.log("Response", response?.data);
        return response?.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export const getProductBySlug = async (slug: string) => {
    try {
        let url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?slug=${slug}`;
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}

export const createProductDataBE = async (data: any) => {
    try {
        const response = await axios.post(API_BASE_URL + "/api/product", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response?.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

// const testData = {
//     newArrival: true,
//     variants: [
//         { color: "Gray", size: "M", stockQuantity: 1 },
//         { color: "Blue", size: "S", stockQuantity: 2 }
//     ],
//     productResources: [
//         { name: "shorts1", url: "https://res.cloudinary.com/dwcyphdkc/image/upload/v1746798819/bdxlbwxhjhv0efbweoc5.jpg", type: "image", isPrimary: true },
//         { name: "shorts2", url: "https://res.cloudinary.com/dwcyphdkc/image/upload/v1746798818/oodudtq7mqsbpeokla1o.jpg", type: "image", isPrimary: false }
//     ],
//     name: "Denim Shorts",
//     slug: "Denim-shorts",
//     description: "Crafted from premium-quality denim, these stylish blue jeans offer exceptional comfort, durability, and a modern fit.",
//     price: 39.99,
//     brand: "SummerVibes",
//     categoryId: "e6a7d133-ac23-437e-9773-8df7cbc97bdd",
//     categoryTypeId: "fdf5eb03-28fe-45ec-81bc-249ca111073a",
//     thumbnail: "https://res.cloudinary.com/dwcyphdkc/image/upload/v1746798817/fkajiqlnqp8iintd9zjb.jpg",
//     rating: 4.8
// };

// // Gọi hàm tạo sản phẩm với test data
// CreateProduct(testData).then(response => {
//     console.log("Product created successfully:", response);
// }).catch(error => {
//     console.error("Error:", error);
// });