import React from "react";
import {
  Admin,
  fetchUtils,
  Resource,
  withLifecycleCallbacks,
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import ProductList from "../Product/ProductList";
import EditProduct from "../Product/EditProduct";
import CategoryList from "../Category/CategoryList";
import CategoryEdit from "../Category/CategoryEdit";
import CategoryCreate from "../Category/CategoryCreate";
import CreateProduct from "../Product/CreateProduct";
import { createProductDataBE } from "~/api/fetchProducts";

const AdminPanel = () => {
  const cloud_name = "dwcyphdkc";
  const upload_preset = "react-upload";
  const [image, setImage] = React.useState("");

  const httpClient = (url: any, options: any = {}) => {
    const token = localStorage.getItem("authToken");
    if (!options.headers) {
      options.headers = new Headers();
    }
    options.headers.set("Authorization", `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
  };

  const baseDataProvider = simpleRestProvider(
    "http://localhost:8080/api",
    httpClient
  );

  const customDataProvider = {
    ...baseDataProvider,
    create: async (resource: string, params: any) => {
      if (resource === "product") {
        let data = { ...params };
        data = data.data; // data đã được chứa trong params.data

        if (data.thumbnail && data.thumbnail.rawFile) {
          const thumbnailFormData = new FormData();
          thumbnailFormData.append("file", data.thumbnail.rawFile);
          thumbnailFormData.append("upload_preset", upload_preset);

          try {
            const thumbnailUploadRes = await fetch(
              `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
              {
                method: "POST",
                body: thumbnailFormData,
              }
            );

            const thumbnailUploadData = await thumbnailUploadRes.json();
            console.log("Thumbnail Upload response:", thumbnailUploadData);

            // Cập nhật thumbnail URL
            data.thumbnail.src = thumbnailUploadData.secure_url;
          } catch (error) {
            console.error("Error uploading thumbnail image:", error);
            throw new Error("Error uploading thumbnail image");
          }
        }

        // Upload tất cả ảnh trong productResources lên Cloudinary
        if (data.productResources && data.productResources.length > 0) {
          data.productResources = await Promise.all(
            data.productResources.map(async (productResource: any) => {
              if (productResource.url && productResource.url.rawFile) {
                const productFormData = new FormData();
                productFormData.append("file", productResource.url.rawFile);
                productFormData.append("upload_preset", upload_preset);

                try {
                  const productUploadRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                    {
                      method: "POST",
                      body: productFormData,
                    }
                  );

                  const productUploadData = await productUploadRes.json();
                  console.log(
                    "Product Image Upload response:",
                    productUploadData
                  );

                  productResource.url.src = productUploadData.secure_url;
                } catch (error) {
                  console.error("Error uploading product image:", error);
                  throw new Error("Error uploading product image");
                }
              }
              return productResource;
            })
          );
        }
        // console.log("data : ", data);

        const createProductData = {
          ...data,
          thumbnail: data.thumbnail.src,
          productResources: data.productResources.map((item: any) => ({
            ...item,
            url: item.url.src,
          })),
        };

        // console.log("createProductData : ", createProductData);
        try {
          const responseData = await createProductDataBE(createProductData);
          console.log("Response data:", responseData);
          if (!responseData || !responseData.id) {
            throw new Error("Response from backend is missing required 'id' field.");
            }

          return {
                data: { id: responseData.id, ...responseData },
            };
        } catch (error) {
          console.error("Error creating product:", error);
          throw new Error("Error creating product");
        }
      } else {
        return baseDataProvider.create(resource, params);
      }
    },

    delete: (resource: string, params: any) => {
      // console.log("resource:", resource);

      // console.log("prams:", params);

      if (resource === "category") {
        console.log("prams-id:", params.id);
        return fetch(`http://localhost:8080/api/category?id=${params.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Xóa thất bại");
            }
            return response.json();
          })
          .then((json) => {
            console.log("Xóa thành công", json);
            return { data: json };
          })
          .catch((error) => {
            console.error("Lỗi khi xóa:", error);
            throw new Error("Lỗi khi xóa");
          });
      }
      return baseDataProvider.delete(resource, params);
    },
  };

  return (
    <Admin dataProvider={customDataProvider} basename="/admin">
      <Resource
        name="product"
        list={ProductList}
        edit={EditProduct}
        create={CreateProduct}
      ></Resource>
      <Resource
        name="category"
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
      ></Resource>
    </Admin>
  );
};

export default AdminPanel;
