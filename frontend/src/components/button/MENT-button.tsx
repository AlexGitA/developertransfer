import React, { useState, forwardRef, memo, ReactNode } from 'react';
import { bemWrapper, bemCta } from './bem';
import join from 'bero';

// Constants
export const MENT_BUTTON = {
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
};

type buttonVariant = 'secondary' | 'tertiary';

// Types for component props
interface MENTButtonProps {
    className?: string;
    children?: ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    href?: string;
    icon?: string;
    isSmall?: boolean;
    theme?: string;
    loading?: boolean;
    target?: string;
    rel?: string;
    variant?: buttonVariant;
    type?: 'button' | 'submit' | 'reset';
}

/**
 * Determines the appropriate `rel` attribute value based on the target.
 * @param {string | undefined} target - The `target` attribute of the link.
 * @returns {string} The computed `rel` attribute value.
 */
const getRel = (target?: string): string => {
    if (!target) return '';
    const baseRel = 'noreferrer';
    return target === '_empty' ? `${baseRel} noopener` : baseRel;
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
    const isPrimary = !variant || (variant !== MENT_BUTTON.SECONDARY && variant !== MENT_BUTTON.TERTIARY);
    const isSecondary = variant === MENT_BUTTON.SECONDARY;
    const isTertiary = variant === MENT_BUTTON.TERTIARY;

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
                    className={String(buttonClassNames)}
                    //ref={ref}
                    {...restProps}
                >
                    {renderContent()}
                </a>
            ) : (
                <button
                    type={type}
                    disabled={disabled}
                    className={String(buttonClassNames)}
                    //ref={ref}
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
