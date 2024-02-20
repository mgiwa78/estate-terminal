import Fonts from "@constants/Fonts";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/selectors/auth";

import { useFonts } from "expo-font";
import { Slot, router } from "expo-router";
import { useEffect } from "react";

export default function () {
  const [fontsLoaded] = useFonts(Fonts);

  return <Slot />;
}
