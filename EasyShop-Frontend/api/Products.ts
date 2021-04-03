import apiClient from "./Client";

const ProductPrefix = "/api/products/";

const AddProductEndPoint = ProductPrefix + "AddProduct";
const GetProductsEndPoint = ProductPrefix + "GetProducts";
const RemoveProdEndPoint = ProductPrefix + "RemoveProduct";
const EditProductEndPoint = ProductPrefix + "EditProduct";
const RemoveFileEndPoint = ProductPrefix + "RemoveFileFromProduct";
const AddFileEndPoint = ProductPrefix + "AddFileToProduct";
const ProdDetEndPoint = ProductPrefix + "GetProductDetails";
const SearchResEndPoint = ProductPrefix + "GetSearchResults";
const CatProdEndPoint = ProductPrefix + "GetCategoryProducts";
const RecProdEndPoint = ProductPrefix + "GetRecentProducts";

const AddProduct = (DATA: any) => apiClient.post(AddProductEndPoint, DATA);
const GetProducts = (DATA: any) => apiClient.post(GetProductsEndPoint, DATA);
const RemoveProduct = (DATA: any) => apiClient.post(RemoveProdEndPoint, DATA);
const EditProduct = (DATA: any) => apiClient.post(EditProductEndPoint, DATA);
const RemoveFile = (DATA: any) => apiClient.post(RemoveFileEndPoint, DATA);
const AddFile = (DATA: any) => apiClient.post(AddFileEndPoint, DATA);
const GetProductDetails = (DATA: any) => apiClient.post(ProdDetEndPoint, DATA);
const GetSearchResults = (DATA: any) => apiClient.post(SearchResEndPoint, DATA);
const GetCategoryRes = (DATA: any) => apiClient.post(CatProdEndPoint, DATA);
const GetRecentProducts = () => apiClient.get(RecProdEndPoint);

export default {
  AddProduct,
  GetProducts,
  RemoveProduct,
  EditProduct,
  RemoveFile,
  AddFile,
  GetProductDetails,
  GetSearchResults,
  GetCategoryRes,
  GetRecentProducts,
};
