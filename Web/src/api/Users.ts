import apiClient from "./Client";

const UserPrefix = "/api/user/auth/";

const ChangePassEndPoint = UserPrefix + "ChangePassword";
const LoginEndPoint = UserPrefix + "Login";
const GoogleLogin = UserPrefix + "LoginWithGoogle";
const LogoutEndPoint = UserPrefix + "Logout";
const RegisterEndPoint = UserPrefix + "Register";
const GetUserDataEndPoint = UserPrefix + "GetUserData";
const SendOTPEndpoint = UserPrefix + "SendOTP";
const VerifyOTPEndpoint = UserPrefix + "VerifyOTP";
const ResetPassEndpoint = UserPrefix + "ResetPassword";
const EmailCodeEndpoint = UserPrefix + "SendEmailCode";
const VerifyEmailEndpoint = UserPrefix + "VerifyEmail";

const ChangePassword = (DATA: any) => apiClient.post(ChangePassEndPoint, DATA);
const Login = (DATA: any) => apiClient.post(LoginEndPoint, DATA);
const Logout = (DATA: any) => apiClient.post(LogoutEndPoint, DATA);
const Register = (DATA: any) => apiClient.post(RegisterEndPoint, DATA);
const GetUserData = (DATA: any) => apiClient.post(GetUserDataEndPoint, DATA);
const SendOTP = (DATA: any) => apiClient.post(SendOTPEndpoint, DATA);
const VerifyOTP = (DATA: any) => apiClient.post(VerifyOTPEndpoint, DATA);
const ResetPassword = (DATA: any) => apiClient.post(ResetPassEndpoint, DATA);
const SendEmailCode = (DATA: any) => apiClient.post(EmailCodeEndpoint, DATA);
const VerifyEmail = (DATA: any) => apiClient.post(VerifyEmailEndpoint, DATA);
const LoginWithGoogle = (DATA: any) => apiClient.post(GoogleLogin, DATA);

const EndPoints = {
  Register,
  Login,
  ChangePassword,
  Logout,
  GetUserData,
  SendOTP,
  VerifyOTP,
  ResetPassword,
  SendEmailCode,
  VerifyEmail,
  LoginWithGoogle,
};

export default EndPoints;
