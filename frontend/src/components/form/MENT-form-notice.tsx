"use strict";

import React, { memo } from "react";
import bem from "bero";
import { join } from "bero";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

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

interface GlFormNoticeProps {
  className?: string;
  error?: boolean;
  errorText?: string;
  errorAttrs?: ErrorAttributes;
  hintText?: string;
  hintAttrs?: HintAttributes;
  wrapperAttrs?: WrapperAttributes;
}

const bemFormNotice = bem("gl-form-notice");

const GlFormNoticeCore: React.FC<GlFormNoticeProps> = ({
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

const GlFormNotice = memo(GlFormNoticeCore);

export { bemFormNotice, GlFormNotice };
