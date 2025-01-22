"use strict";

import React, { memo } from "react";
import { MENTIcon } from "./MENT-icon.tsx";

interface MENTIconValidationProps {
  className?: string;
  iconClassName?: string;
  success?: boolean;
  title?: string;
}

const MENTIconValidationCore: React.FC<MENTIconValidationProps> = ({
 /**
  * Core functional component for displaying a validation icon.
  * This component renders a checkmark icon for success or a cross icon for failure.
  *
  * @param {MENTIconValidationProps} props - The props for the component.
  * @param {string} [props.className] - Optional class for the root wrapper element.
  * @param {string} [props.iconClassName] - Optional class for the icon element.
  * @param {boolean} [props.success] - Indicates whether the validation is successful. If true, displays a checkmark; otherwise, a cross.
  * @param {string} [props.title] - Optional title for the icon used for accessibility.
  * @returns {JSX.Element} A JSX element representing the validation icon (either checkmark or cross).
  */
  className,
  iconClassName,
  success,
  title,
}) => {
  const name = success ? "checkbox-checkmark" : "cross-small";
  return (
    <MENTIcon
      name={name}
      title={title}
      className={className}
      iconClassName={iconClassName}
    />
  );
};

export const MENTIconValidation = memo(MENTIconValidationCore);
