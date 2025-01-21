"use strict";

import React, { memo } from "react";
import { GlIcon } from "./MENT-icon.tsx";

interface GlIconValidationProps {
  className?: string;
  iconClassName?: string;
  success?: boolean;
  title?: string;
}

const GlIconValidationCore: React.FC<GlIconValidationProps> = ({
  className,
  iconClassName,
  success,
  title,
}) => {
  const name = success ? "checkbox-checkmark" : "cross-small";
  return (
    <GlIcon
      name={name}
      title={title}
      className={className}
      iconClassName={iconClassName}
    />
  );
};

export const GlIconValidation = memo(GlIconValidationCore);
