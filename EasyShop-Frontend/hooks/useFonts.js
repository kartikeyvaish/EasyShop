import * as Font from "expo-font";
import { Inter_300Light, Inter_400Regular } from "@expo-google-fonts/inter";
import {
  Montserrat_300Light,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import {
  Muli_300Light,
  Muli_400Regular,
  Muli_800ExtraBold,
  Muli_900Black,
} from "@expo-google-fonts/muli";
import {
  Poppins_300Light,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { Roboto_300Light, Roboto_400Regular } from "@expo-google-fonts/roboto";

export default useFonts = async () => {
  await Font.loadAsync({
    Inter: Inter_300Light,
    InterBold: Inter_400Regular,
    Montserrat: Montserrat_300Light,
    MontserratBold: Montserrat_400Regular,
    Muli: Muli_300Light,
    MuliRegular: Muli_400Regular,
    MuliBold: Muli_800ExtraBold,
    MuliExtraBold: Muli_900Black,
    Poppins: Poppins_300Light,
    PoppinsRegular: Poppins_400Regular,
    Roboto: Roboto_300Light,
    Roboto_medium: Roboto_400Regular,
  });
};
