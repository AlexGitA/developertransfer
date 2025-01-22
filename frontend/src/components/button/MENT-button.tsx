import { useState, forwardRef, memo, ReactNode } from 'react';
import { bemWrapper, bemCta } from './bem';
import { join } from 'bero';

// Constants
export const MENT_BUTTON_VARIANT = {
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
    SPECIAL: 'special'
};

export const MENT_BUTTON_THEME = {
    LIGHT: 'light',
    DARK: 'dark',
}

// Types for component props
interface MENTButtonProps {
    className?: string;
    children?: ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    href?: string;
    icon?: string;
    isSmall?: boolean;
    theme?: keyof typeof MENT_BUTTON_THEME;
    loading?: boolean;
    target?: string;
    rel?: string;
    variant?: keyof typeof MENT_BUTTON_VARIANT;
    type?: 'button' | 'submit' | 'reset';
    [key: string]: any; // for additional props (e.g., onClick)
}

/**
 * Determines the appropriate `rel` attribute value based on the target.
 * @param {string | undefined} target - The `target` attribute of the link.
 * @returns {string} The computed `rel` attribute value.
 */
const getRel = (target?: string): string => {
    if (!target) return '';
    const baseRel = 'noreferrer';
    return target === '_blank' ? `${baseRel} noopener` : baseRel;
};

// Components
const MENTButtonCore = forwardRef<HTMLAnchorElement | HTMLButtonElement, MENTButtonProps>((props, ref) => {
    const {
        className,
        children,
        disabled = false,
        fullWidth = false,
        href,
        icon,
        isSmall = false,
        theme,
        loading = false,
        target,
        rel = getRel(target),
        variant,
        type = 'button',
        ...restProps
    } = props;

    // Determine button styles based on variant
    const isPrimary = !variant || (variant !== MENT_BUTTON_VARIANT.SECONDARY && variant !== MENT_BUTTON_VARIANT.TERTIARY && variant !== MENT_BUTTON_VARIANT.SPECIAL);
    const isSecondary = variant === MENT_BUTTON_VARIANT.SECONDARY;
    const isTertiary = variant === MENT_BUTTON_VARIANT.TERTIARY;
    const isSpecial = variant === MENT_BUTTON_VARIANT.SPECIAL;

    // Handle focus state for styling
    const [isOnFocus, setFocus] = useState(false);

    // Class names for button container
    const wrapperClassNames = bemWrapper({
        'without-text': !children && !isPrimary,
        primary: isPrimary && !theme,
        [`primary-${theme}`]: isPrimary && theme,
        secondary: isSecondary && !theme,
        [`secondary-${theme}`]: isSecondary && theme,
        tertiary: isTertiary && children,
        [`tertiary-${theme}`]: isTertiary && theme,
        special: isSpecial && theme,
        [`special-${theme}`]: isSpecial && theme,
        'on-focus': isOnFocus,
    });

    // Class names for button element
    const buttonClassNames = join(
        bemCta({
            primary: isPrimary,
            [`primary-${theme}`]: isPrimary && theme,
            secondary: isSecondary && children,
            [`secondary-${theme}`]: isSecondary && theme,
            tertiary: isTertiary && children,
            'secondary-small': isSecondary && isSmall,
            [`tertiary-${theme}`]: isTertiary && theme,
            [`special-${theme}`]: isSpecial && theme,
            fullWidth,
            loading,
            disabled,
            icon: !children,
        }),
        className
    );

    /**
     * Renders the content of the button, including text, icon, and loader.
     */
    const renderContent = () => (
        <>
            {children && <span className={bemCta('content')}>{children}</span>}
        </>
    );

    // Render as anchor or button based on `href`
    return (
        <div className={wrapperClassNames}>
            {href ? (
                <a
                    href={href}
                    target={target}
                    rel={rel}
                    className={buttonClassNames}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    {...restProps}
                >
                    {renderContent()}
                </a>
            ) : (
                <button
                    type={type}
                    disabled={disabled}
                    className={buttonClassNames}
                    ref={ref as React.Ref<HTMLButtonElement>}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    {...restProps}
                >
                    {renderContent()}
                </button>
            )}
        </div>
    );
});

// Export memoized version of the button component
export const MENTButton = memo(MENTButtonCore);
