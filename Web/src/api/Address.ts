import apiClient from "./Client";

const AddressPrefix = "/api/address/";

const NewAddressEndPoint = AddressPrefix + "NewAddress";
const DelAddressEndPoint = AddressPrefix + "DeleteAddress";
const EditAddressEndPoint = AddressPrefix + "EditAddress";
const GetAddressesEndPoint = AddressPrefix + "GetUserAddress";
const MakeDefaultEndPoint = AddressPrefix + "MakeDefault";

const NewAddress = (DATA: any) => apiClient.post(NewAddressEndPoint, DATA);
const DeleteAddress = (DATA: any) => apiClient.post(DelAddressEndPoint, DATA);
const EditAddress = (DATA: any) => apiClient.post(EditAddressEndPoint, DATA);
const GetAddresses = (DATA: any) => apiClient.post(GetAddressesEndPoint, DATA);
const MakeDefault = (DATA: any) => apiClient.post(MakeDefaultEndPoint, DATA);

const EndPoints = {
  NewAddress,
  DeleteAddress,
  EditAddress,
  GetAddresses,
  MakeDefault,
};

export default EndPoints;
