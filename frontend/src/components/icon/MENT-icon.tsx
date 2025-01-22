"use strict";

import React, { memo, SVGProps } from "react";
import bem from "bero";

interface MENTIconProps extends SVGProps<SVGSVGElement> {
  /**
   * Core functional component for displaying an icon.
   *
   * @param {MENTIconProps} props - The props for the component.
   * @param {string} [props.className] - Optional class for the root wrapper element.
   * @param {string} [props.iconClassName] - Optional class for the icon element.
   * @param {string} props.name - The name of the icon to be displayed, used to reference the SVG symbol.
   * @param {string} [props.theme] - Optional theme to style the icon (e.g., "light").
   * @param {string} [props.title=""] - Optional title for the SVG, used for accessibility.
   * @param {SVGProps<SVGSVGElement>} [props] - Other props to be passed to the SVG element.
   * @returns {JSX.Element} A JSX element representing the icon with optional classes and title.
   */
  className?: string;
  iconClassName?: string;
  name: string;
  theme?: string;
  title?: string;
}

const bemIcon = bem("MENT-icon");
const MENT_ICON_THEME = {
  light: "light",
};

const MENTIconCore: React.FC<MENTIconProps> = ({
  className,
  iconClassName,
  name,
  theme,
  title = "",
  ...props
}) => {
  const titleParsed = name.replace(/^(.)|\s+(.)/g, (a) => a.toUpperCase());
  const titleSvg = title || titleParsed.replace(/-/g, " ");

  return (
    <span
      aria-hidden="true"
      className={bem.join(bemIcon("wrapper"), className)}
    >
      <svg
        className={bem.join(
          bemIcon({
            light: theme === MENT_ICON_THEME.light,
          }),
          iconClassName
        )}
        {...props}
      >
        <use xlinkHref={`#${name}`} />
        <title>{titleSvg}</title>
      </svg>
    </span>
  );
};

const MENTIcon = memo(MENTIconCore);

export { bemIcon, MENT_ICON_THEME, MENTIcon };