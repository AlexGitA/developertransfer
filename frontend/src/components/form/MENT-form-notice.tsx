import React, { memo } from "react";
import bem from "bero";
import { join } from "bero";


interface ErrorAttributes {
  className?: string;
  [key: string]: any;
}

interface HintAttributes {
  className?: string;
  [key: string]: any;
}

interface WrapperAttributes {
  className?: string;
  [key: string]: any;
}

interface MENTFormNoticeProps {
  /*
   Optional fields:
   - className: Additional class for the component's root wrapper
   - error: Boolean flag to indicate if an error should be displayed
   - errorText: Text to display in the error message
   - errorAttrs: Additional attributes for the error element
   - hintText: Text to display in the hint message
   - hintAttrs: Additional attributes for the hint element
   - wrapperAttrs: Additional attributes for the root wrapper element
   */
  className?: string;
  error?: boolean;
  errorText?: string;
  errorAttrs?: ErrorAttributes;
  hintText?: string;
  hintAttrs?: HintAttributes;
  wrapperAttrs?: WrapperAttributes;
}

const bemFormNotice = bem("MENT-form-notice");

const MENTFormNoticeCore: React.FC<MENTFormNoticeProps> = ({
 /**
  * Core functional component for displaying form notices.
  *
  * @param {MENTFormNoticeProps} props - The props for the component.
  * @param {string} [props.className] - Optional class for the root wrapper.
  * @param {boolean} [props.error] - Indicates whether to display the error message.
  * @param {string} [props.errorText] - Text to display for the error message.
  * @param {ErrorAttributes} [props.errorAttrs={}] - Additional attributes for the error element.
  * @param {string} [props.hintText] - Text to display for the hint message.
  * @param {HintAttributes} [props.hintAttrs={}] - Additional attributes for the hint element.
  * @param {WrapperAttributes} [props.wrapperAttrs={}] - Additional attributes for the root wrapper element.
  * @returns {JSX.Element} A JSX element representing the form notice.
  */
  className,
  error,
  errorText,
  errorAttrs = {},
  hintText,
  hintAttrs = {},
  wrapperAttrs = {},
}) => {
  const canDisplayError = error && errorText;
  const canDisplayHint = !canDisplayError && hintText;

  return (
    <div
      className={join(bemFormNotice(), className)}
      {...wrapperAttrs}
    >
      <div
        className={bemFormNotice("error", [!canDisplayError && "hidden"])}
        {...errorAttrs}
      >
        {errorText}
      </div>
      <div
        className={bemFormNotice("hint", [!canDisplayHint && "hidden"])}
        {...hintAttrs}
      >
        {hintText}
      </div>
    </div>
  );
};

const MENTFormNotice = memo(MENTFormNoticeCore);

export { bemFormNotice, MENTFormNotice };
