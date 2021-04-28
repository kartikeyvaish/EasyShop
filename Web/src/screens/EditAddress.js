import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context";
import { Formik } from "formik";
import SingleContainer from "../components/SingleContainer";
import Text from "../components/Text";
import ColorPallete from "../config/ColorPallete";
import AddressSchema from "../schema/AddressSchema";
import { toast } from "react-toastify";
import API from "../api/API";
import Link from "../components/Link";
import TextInput from "../components/TextInput";
import Picker from "../components/Picker";
import Button from "../components/Button";
import RadioButton from "../components/RadioButton";

const ValidationSchema = AddressSchema.AddressSchema();

function EditAddress({ history, location }) {
  const authContext = useContext(AuthContext);
  const [Loading, SetLoading] = useState(false);
  const [State, SetState] = useState("");
  const [AddressType, SetAddressType] = useState("Home");

  const InitialValues = location.state;

  useEffect(() => {
    if (authContext.User) {
      let string = location.state.AddressType;
      string = string.toLowerCase();
      SetAddressType(string.charAt(0).toUpperCase() + string.slice(1));
    }
    return () => {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onPickChange = (value) => {
    if (value === "Select State") {
      SetState("");
    } else {
      SetState(value);
    }
  };

  const EditAddress = async (values) => {
    SetLoading(true);
    try {
      if (State === "") {
        SetLoading(false);
        toast.error("Please select a State");
      } else {
        values.State = State;
        values.AddressType = AddressType;
        let FormattedPhone = values.Phone.replace(/-|\s/g, "");
        values.Phone = FormattedPhone;

        let Data = {
          ID: location.state._id,
          Edit: {
            ...values,
          },
        };
        const response = await API.EditAddress(Data);
        if (response.ok) {
          SetLoading(false);
          toast.success("Address Updated");
          history.replace("/Addresses");
        } else {
          SetLoading(false);
          toast.error("Server Error", "danger");
        }
      }
    } catch (error) {
      SetLoading(false);
      toast.error("SERVER Error", "danger");
    }
  };

  return (
    <SingleContainer
      boxStyle={styles.box}
      Loading={Loading}
      LoadingText="Adding Addresses..."
    >
      {authContext.User ? (
        <>
          <Text
            text="Add Address"
            size={25}
            marginTop={10}
            marginLeft={15}
            marginBottom={10}
          />

          <Formik
            initialValues={InitialValues}
            onSubmit={(values) => EditAddress(values)}
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
                  label="Name"
                  onChange={handleChange("Name")}
                  error={errors.Name}
                  defaultValue={values.Name}
                  onBlur={() => setFieldTouched("Name")}
                  ErrorVisibility={touched.Name === true ? true : false}
                />

                <TextInput
                  label="Phone"
                  error={errors.Phone}
                  onChange={handleChange("Phone")}
                  defaultValue={values.Phone}
                  onBlur={() => setFieldTouched("Phone")}
                  ErrorVisibility={touched.Phone === true ? true : false}
                />

                <TextInput
                  label="Pincode"
                  onChange={handleChange("Pincode")}
                  error={errors.Pincode}
                  defaultValue={values.Pincode}
                  onBlur={() => setFieldTouched("Pincode")}
                  ErrorVisibility={touched.Pincode === true ? true : false}
                />

                <TextInput
                  label="Address"
                  onChange={handleChange("Address")}
                  multiline={true}
                  error={errors.Address}
                  defaultValue={values.Address}
                  onBlur={() => setFieldTouched("Address")}
                  ErrorVisibility={touched.Address === true ? true : false}
                />

                <TextInput
                  label="Locality"
                  onChange={handleChange("Locality")}
                  error={errors.Locality}
                  defaultValue={values.Locality}
                  onBlur={() => setFieldTouched("Locality")}
                  ErrorVisibility={touched.Locality === true ? true : false}
                />

                <TextInput
                  label="City"
                  onChange={handleChange("City")}
                  error={errors.City}
                  defaultValue={values.City}
                  onBlur={() => setFieldTouched("City")}
                  ErrorVisibility={touched.City === true ? true : false}
                />

                <Picker
                  placeholder="Select State"
                  label="State"
                  handleChange={(e) => onPickChange(e.target.value)}
                  value={State}
                  SelectItems={AddressSchema.States}
                />

                <div style={styles.BTNS}>
                  <Text
                    text="Address Type"
                    size={18}
                    weight="bold"
                    marginRight={10}
                    marginTop={-5}
                    marginLeft={10}
                  />
                  <RadioButton
                    label="Home"
                    value="Home"
                    checked={AddressType === "Home" ? true : false}
                    onChange={(e) => SetAddressType("Home")}
                  />
                  <RadioButton
                    label="Work"
                    value="Work"
                    checked={AddressType === "Work" ? true : false}
                    marginLeft={10}
                    onChange={(e) => SetAddressType("Work")}
                  />
                </div>

                <div style={{ ...styles.BTNS, justifyContent: "center" }}>
                  <Button
                    Title="Edit"
                    marginLeft={10}
                    marginRight={10}
                    color="white"
                    style={{ maxWidth: 120 }}
                    onClick={handleSubmit}
                  />
                  <Button
                    Title="Cancel"
                    backgroundColor="orange"
                    color="white"
                    marginLeft={10}
                    marginRight={10}
                    onClick={() => history.replace("/")}
                    style={{ maxWidth: 120 }}
                  />
                </div>
              </>
            )}
          </Formik>
        </>
      ) : (
        <Link
          text="You need to Login to Edit your Profile"
          textDecoration="none"
          onClick={() => history.replace("/Login")}
          marginBottom={20}
        />
      )}
    </SingleContainer>
  );
}

export default EditAddress;

const styles = {
  box: {
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 50,
  },
  AddIcon: {
    backgroundColor: ColorPallete.primary,
    color: "white",
    borderRadius: "50%",
  },
  AddProductBTN: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: ColorPallete.primary,
    borderWidth: 1,
    borderStyle: "solid",
    maxWidth: 150,
    marginBottom: 10,
  },
  BTNS: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
};
