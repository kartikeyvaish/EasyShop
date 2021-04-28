import apiClient from "./Client";

const ProfilePrefix = "/api/profile/";

const EditProfileEndPoint = ProfilePrefix + "EditProfile";
const ChangeDPEndPoint = ProfilePrefix + "ChangeDP";

const EditProfile = (DATA: any) => apiClient.post(EditProfileEndPoint, DATA);
const ChangeDP = (DATA: any) => apiClient.post(ChangeDPEndPoint, DATA);

const EndPoints = {
  EditProfile,
  ChangeDP,
};

export default EndPoints;
