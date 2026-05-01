import type { ComponentType, SVGProps } from "react";
import {
  BinocularsIcon,
  BoltIcon,
  CameraIcon,
  CoffeeIcon,
  CompassIcon,
  DropletIcon,
  InfoIcon,
  LeafIcon,
  MessageIcon,
  MoonIcon,
  PhoneIcon,
  RouteIcon,
  ShieldIcon,
  StarIcon,
  TentIcon,
  UserIcon,
  WifiIcon,
} from "@/components/icons";
import type { IconKey } from "@/data/types";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export const ICON_MAP: Record<IconKey, Icon> = {
  coffee: CoffeeIcon,
  wifi: WifiIcon,
  bolt: BoltIcon,
  droplet: DropletIcon,
  tent: TentIcon,
  leaf: LeafIcon,
  compass: CompassIcon,
  user: UserIcon,
  info: InfoIcon,
  shield: ShieldIcon,
  phone: PhoneIcon,
  binoculars: BinocularsIcon,
  route: RouteIcon,
  star: StarIcon,
  camera: CameraIcon,
  moon: MoonIcon,
  message: MessageIcon,
};

export const ICON_KEYS: IconKey[] = Object.keys(ICON_MAP) as IconKey[];

export function iconFor(key: IconKey): Icon {
  return ICON_MAP[key] ?? InfoIcon;
}
