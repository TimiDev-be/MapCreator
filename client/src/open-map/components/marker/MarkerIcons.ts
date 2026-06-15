import type { ComponentType, SVGProps } from "react";
import PointIcon from "../../../assets/tabler_point.svg?react";
import WaterIcon from "../../../assets/mynaui_sea-waves-solid.svg?react";
import ParkingIcon from "../../../assets/mingcute_parking-line.svg?react";
import ShopIcon from "../../../assets/mage_shop.svg?react";
import HostpitalIcon from "../../../assets/mingcute_hospital-line.svg?react";
import SchoolIcon from "../../../assets/material-symbols_school-outline.svg?react";
import FoodIcon from "../../../assets/fluent_food-20-regular.svg?react";
import SignIcon from "../../../assets/fluent_street-sign-20-regular.svg?react";
import CityIcon from "../../../assets/iconoir_city.svg?react";
import FootballPitchIcon from "../../../assets/hugeicons_football-pitch.svg?react";
import ParkLogo from "../../../assets/material-symbols_park-outline.svg?react";
import PoliceLogo from "../../../assets/map_police.svg?react";
import BusLogo from "../../../assets/carbon_bus.svg?react";
import TrainLogo from "../../../assets/material-symbols_train-outline-rounded.svg?react";
import DogLogo from "../../../assets/tabler_dog.svg?react";
import HorseLogo from "../../../assets/tabler_horse.svg?react";
import GasStationLogo from "../../../assets/mdi_gas-station.svg?react";
import CrossLogo from "../../../assets/mdi_cross-outline.svg?react";
import RoundAboutLogo from "../../../assets/material-symbols_roundabout-left.svg?react";
import PackageLogo from "../../../assets/boxicons_package.svg?react";
import FactoryLogo from "../../../assets/mdi-light_factory.svg?react";

export const MarkerIcons: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>> | null
> = {
  default: null,
  point: PointIcon,
  water: WaterIcon,
  parking: ParkingIcon,
  shop: ShopIcon,
  hospital: HostpitalIcon,
  school: SchoolIcon,
  food: FoodIcon,
  sign: SignIcon,
  city: CityIcon,
  "football-pitch": FootballPitchIcon,
  park: ParkLogo,
  police: PoliceLogo,
  bus: BusLogo,
  train: TrainLogo,
  dog: DogLogo,
  horse: HorseLogo,
  "gas-station": GasStationLogo,
  cross: CrossLogo,
  "round-about": RoundAboutLogo,
  package: PackageLogo,
  factory: FactoryLogo,
};
