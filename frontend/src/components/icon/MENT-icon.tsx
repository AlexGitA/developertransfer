"use strict";

import React, { memo, SVGProps } from "react";
import bem from "bero";

interface GlIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  iconClassName?: string;
  name: string;
  theme?: string;
  title?: string;
}

const bemIcon = bem("gl-icon");
const GL_ICON_THEME = {
  light: "light",
};

const GlIconCore: React.FC<GlIconProps> = ({
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
            light: theme === GL_ICON_THEME.light,
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

const GlIcon = memo(GlIconCore);

export { bemIcon, GL_ICON_THEME, GlIcon };