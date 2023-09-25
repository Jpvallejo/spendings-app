// HeroIcon.tsx
import * as SolidIcons from "@heroicons/react/24/solid";
import * as OutlineIcons from "@heroicons/react/24/outline";

// interface Props {
//   icon: string;
//   color?: string;
//   size?: number;
//   outline?: boolean;
// }

export const HeroIcon = (props) => {
  const { icon, color, size, outline = false } = props;

  const { ...icons } = outline ? OutlineIcons : SolidIcons;

  // @ts-ignore
  const Icon = icons[icon];

  const classes = [
    `${color ? color : "text-black"}`,
    `h-${size ? size : 6}`,
    `w-${size ? size : 6}`,
  ];
  if (!Icon) return;

  return (
    // @ts-ignore
    <Icon className={classes.join(" ")} />
  );
};
