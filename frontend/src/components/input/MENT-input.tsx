import React, { forwardRef, useState, ChangeEvent, FocusEvent } from "react";
import bem from "bero";
import { MENTIconValidation } from "../icon/MENT-icon-validation.tsx";
import { MENTFormNotice } from "../form/MENT-form-notice.tsx";
import { join } from "bero";

interface MENTInputProps {
  centered?: boolean;
  className?: string;
  defaultValue?: string;
  errorText?: string;
  hintText?: string;
  id: string;
  labelCustomProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelText?: string;
  noIcon?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  tabIndexer?: number;
  valid?: boolean;
  value?: string;
  [key: string]: any;
}

const bemInput = bem("MENT-input");

export const MENTInput = forwardRef<HTMLInputElement, MENTInputProps>(
  (
    {
      centered,
      className,
      defaultValue,
      errorText = "",
      hintText,
      id,
      labelCustomProps,
      labelText,
      noIcon,
      onBlur,
      onChange = () => undefined,
      onFocus,
      required,
      tabIndexer,
      valid,
      value = "",
      ...props
    },
    ref
  ) => {
    const withIcon = !noIcon && typeof valid === "boolean";
    const error = valid === false;
    const displayError = error && errorText;
    const success = valid === true;

    const [inputValue, setInputValue] = useState<string>("");
    const controlledValue = defaultValue ? undefined : inputValue;

    const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(event);
      }
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      const targetValue = event.target.value;
      setInputValue(targetValue);
      if (onChange) {
        onChange(event);
      }
    };

    const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(event);
      }
    };

    return (
      <div
        className={bem("MENT-form-item", {
          error,
          required,
          success,
        })}
      >
        <div className={join(bemInput(), className)}>
          <input
            id={id}
            name={id}
            ref={ref}
            aria-invalid={!valid}
            aria-describedby={`${id}--text`}
            aria-required={required}
            required={required}
            className={bemInput("field", {
              centered,
              withIcon,
            })}
            tabIndex={tabIndexer}
            placeholder=" "
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            defaultValue={defaultValue}
            value={value || controlledValue}
            {...props}
          />
          <label
            htmlFor={id}
            id={`${id}_label`}
            className={
              required
                  ? join(bemInput("label--required", { centered }), bemInput("label", { centered }))
                  : bemInput("label", { centered })
            }
            {...labelCustomProps}
          >
            {labelText}
          </label>
          {withIcon && (
            <MENTIconValidation success={success} iconClassName={bemInput("icon")} />
          )}
        </div>
        <MENTFormNotice
          error={Boolean(displayError)}
          errorText={errorText}
          errorAttrs={{
            id: `${id}--error`,
            "aria-live": "polite",
          }}
          hintText={hintText}
          hintAttrs={{
            id: `${id}--text`,
            "aria-live": "polite",
          }}
        />
      </div>
    );
  }
);

MENTInput.displayName = "MENTInput";
