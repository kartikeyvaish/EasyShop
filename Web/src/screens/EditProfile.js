import { useContext, useEffect, useRef, useState } from "react";

import AuthContext from "../auth/context";
import { Formik } from "formik";
import Avatar from "../components/Avatar";
import Configuration from "../config/Configuration";
import SingleContainer from "../components/SingleContainer";
import TextInput from "../components/TextInput";
import EditProfileSchema from "../schema/EditProfile";
import Button from "../components/Button";
import Link from "../components/Link";
import API from "../api/API";
import { toast } from "react-toastify";

const BaseURL = Configuration.BaseURL;
const ValidationSchema = EditProfileSchema.EditProfileSchema();

function EditProfile({ history }) {
  const { User, SetUser } = useContext(AuthContext);
  const [Loading, SetLoading] = useState(false);
  const [File, SetFile] = useState(BaseURL + User?.ProfilePicture);
  const [ChangedDP, SetChangedDP] = useState(null);
  const InputRef = useRef();

  useEffect(() => {
    return () => {};
  }, []);

  const InitialValues = {
    Name: User?.Name,
    Email: User?.Email,
    Phone: User?.Phone,
  };

  const SaveProfile = async (values) => {
    try {
      const Data = {
        Edit: values,
        _id: User._id,
      };
      const response = await API.EditProfile(Data);
      if (response.ok) {
        SaveImage();
      } else {
        toast.error(response.data);
        SetLoading(false);
      }
    } catch (error) {
      toast.error("Server Error");
      SetLoading(false);
    }
  };

  const SaveImage = async () => {
    if (ChangedDP !== null) {
      const form = new FormData();
      form.append("_id", User._id);
      form.append("ProfilePicture", ChangedDP);
      const response = await API.ChangeDP(form);
      if (response.ok) {
        GetUserData();
      } else {
        toast.error("Error in Changing Profile Picture");
      }
    } else {
      GetUserData();
    }
  };

  const GetUserData = async () => {
    try {
      const response = await API.GetUserData({
        _id: User._id,
      });
      if (response.ok) {
        SetLoading(false);
        localStorage.setItem("AuthToken", response.data.token);
        SetUser(response.data.User);
        toast.success("Profile Saved");
        history.goBack();
      }
    } catch (error) {}
  };

  const GetFile = async (file) => {
    try {
      var reader = new FileReader();
      reader.onload = function (e) {
        SetChangedDP(file);
        SetFile(e.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {}
  };

  return (
    <SingleContainer
      boxStyle={styles.box}
      Loading={Loading}
      LoadingText="Saving Profile..."
    >
      {User ? (
        <>
          <Avatar uri={File} size={150} marginTop={20} marginBottom={20} />

          <input
            type="file"
            style={{ display: "none" }}
            ref={InputRef}
            accept="image/x-png,image/jpeg, image/jpg"
            onChange={(e) => GetFile(e.target.files[0])}
          />

          <Link
            text="Change Profile Picture"
            textDecoration={"none"}
            onClick={() => InputRef.current.click()}
            marginBottom={20}
          />

          <Formik
            initialValues={InitialValues}
            onSubmit={(values) => SaveProfile(values)}
            validationSchema={ValidationSchema}
          >
            {({
              handleChange,
              setFieldTouched,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <>
                <TextInput
                  defaultValue={values.Name}
                  label="Name"
                  onChange={handleChange("Name")}
                  onBlur={() => setFieldTouched("Name")}
                  style={{ maxWidth: 500 }}
                  error={errors.Name}
                  ErrorVisibility={touched.Name === true ? true : false}
                />

                <TextInput
                  defaultValue={values.Email}
                  label="Email"
                  onChange={handleChange("Email")}
                  onBlur={() => setFieldTouched("Email")}
                  disabled={User.Email_Verified === true}
                  style={{ maxWidth: 500 }}
                  error={errors.Email}
                  ErrorVisibility={touched.Email === true ? true : false}
                  NormalText={
                    User.Email_Verified === true ? "Email is verified!" : null
                  }
                />

                <TextInput
                  defaultValue={values.Phone.toString()}
                  label="Phone"
                  onChange={handleChange("Phone")}
                  onBlur={() => setFieldTouched("Phone")}
                  style={{ maxWidth: 500 }}
                  error={errors.Phone}
                  ErrorVisibility={touched.Phone === true ? true : false}
                />

                <div style={styles.BTNS}>
                  <Button
                    marginLeft={20}
                    marginRight={20}
                    Title="Save"
                    color="white"
                    onClick={handleSubmit}
                  />
                  <Button
                    marginLeft={20}
                    marginRight={20}
                    Title="Cancel"
                    backgroundColor="transparent"
                    onClick={() => history.push("/Profile")}
                  />
                </div>
              </>
            )}
          </Formik>
        </>
      ) : (
        <Link
          text="You need to Login to Edit your Profile"
          textDecoration={"none"}
          onClick={() => history.replace("/Login")}
          marginBottom={20}
        />
      )}
    </SingleContainer>
  );
}

export default EditProfile;

const styles = {
  box: {
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
  },
  BTNS: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    maxWidth: 500,
    marginTop: 20,
  },
};
