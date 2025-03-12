import { useState, forwardRef, memo, ReactNode } from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { MENTIcon, MENT_ICON_THEME } from '../icon/MENT-icon.tsx';

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
    animate?: boolean;
    target?: string;
    rel?: string;
    variant?: keyof typeof MENT_BUTTON_VARIANT;
    type?: 'button' | 'submit' | 'reset';

    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    [key: string]: any; // for additional props (e.g., onClick)
}

interface ButtonTheme extends DefaultTheme {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    // Add other theme colors as needed
}

interface IconWrapperProps {
    $isSmall: boolean;
}

// Base theme configuration
const lightTheme: ButtonTheme = {
    primary: '#215FCB',
    primaryHover: '#5F7ABB',
    secondary: '#8A99CD',
    secondaryHover: '#B2B9DF',
};

// Dark theme configuration
const darkTheme: ButtonTheme = {
    primary: '#0052CC',
    primaryHover: '#003D99',
    secondary: '#003366',
    secondaryHover: '#00264D',
};

// Styled components
const ButtonWrapper = styled.div<{
    $isOnFocus: boolean;
    $variant: string;
    $theme?: keyof typeof MENT_BUTTON_THEME;
}>`
  position: relative;
  display: inline-flex;
  transition: all 0.2s ease;

  ${({ $isOnFocus }) => $isOnFocus && css`
    &::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px solid #fff;
      border-radius: 99px;
    }
  `}
`;

// Types for component base props
interface BaseButtonProps {
    $variant: string;
    $theme?: keyof typeof MENT_BUTTON_THEME;
    $fullWidth: boolean;
    $disabled: boolean;
    $loading: boolean;
    $animate: boolean;
    $isSmall: boolean;
    $hasIcon: boolean;
    $hasChildren: boolean;
}

const TextWrapper = styled.span`
    display: flex;
    padding-right: 0;
  transition: transform 0.2s ease;
`;

// Underline style for link-button
const LinkUnderline = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
`;

// Style for general Button
const BaseButton = styled.button<BaseButtonProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 99px;
    font-weight: 600;
    font-size: ${({ $isSmall }) => $isSmall ? '14px' : '16px'};
    cursor: pointer;
    transition: all 0.2s ease;
    width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};

    ${({ $isSmall, $hasChildren }) => css`
        font-size: ${$isSmall ? '14px' : '16px'};

        ${IconWrapper} {
            svg, img {
                width: ${$isSmall ? '14px' : '.9375rem'};
                height: ${$isSmall ? '14px' : '.6875rem'};
            }

            ${!$hasChildren && css`
                justify-content: center;
            `}
        }
    `}

    ${({ $animate }) =>
            $animate &&
            css`
                &:hover {
                    ${Content} {
                        ${TextWrapper} {
                            transform: translateX(-10px);
                        }
                        ${IconWrapper} {
                            visibility: visible;

                            svg {
                                opacity: 1;
                            }
                        }
                    }
                }

                ${Content} {
                    ${IconWrapper} {
                        visibility: initial;
                        transition: all 0.2s ease;

                        svg {
                            opacity: 0;
                        }
                    }

                    ${TextWrapper} {
                        transform: translateX(0px);
                        transition: transform 0.2s ease;
                    }
                }
            `}

    ${({$animate}) => css`
        padding: ${$animate ? '0px' : '8px 16px' };
    `}

    ${({ $disabled, $loading }) =>
            ($disabled || $loading) && css`
                opacity: 0.7;
                cursor: not-allowed;
            `}

    ${({ $variant, theme, $disabled, $loading }) => {
        switch ($variant) {
            case MENT_BUTTON_VARIANT.SECONDARY:
                return css`
          background: ${theme.secondary};
          color: ${theme.primary};
          ${!$disabled && !$loading && css`
            &:hover {
              background: ${theme.secondaryHover};
            }
          `}
        `;
            case MENT_BUTTON_VARIANT.TERTIARY:
                return css`
          background: transparent;
          color: ${theme.primary};
          ${!$disabled && !$loading && css`
            &:hover {
              background: rgba(0, 102, 255, 0.1);
            }
          `}
        `;
            default: // Primary
                return css`
          background: ${theme.primary};
          color: white;
          ${!$disabled && !$loading && css`
            &:hover {
              background: ${theme.primaryHover};
            }
          `}
        `;
        }
    }}
`;

// Style for link-button
const ButtonLink = styled(BaseButton).attrs({ as: 'a' })<BaseButtonProps>`
    text-decoration: none;
    display: inline-flex;
    position: relative;
    overflow: hidden;
    background: transparent !important;
    color: ${({ theme, $variant }) =>
            $variant === MENT_BUTTON_VARIANT.SECONDARY ? theme.primary : theme.primary
    };

    &:hover {
        background: transparent !important;

        ${LinkUnderline} {
            width: 100%;
        }
    }

    // Remove button-style hover backgrounds
    ${({ $variant }) => $variant && css`
    &:hover {
      background: transparent;
    }
  `}
`;

// Style for rotating Loader
const Loader = styled.div`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  border-top-color: white;
  animation: spin 1s linear infinite;
`;

//  Icon-Wrapper component
const IconWrapper = styled.span<IconWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 1.5rem;

    ${({ theme }) => theme?.icon && css`
    svg {
      width: 100%;
      height: 100%;
    }
  `}

    ${({ $isSmall }) => $isSmall && css`
    width: 1rem;
  `}
`;

//Content component
const Content = styled.span<{ $loading: boolean, $animate: boolean, $isLink: boolean }>`
    opacity: ${({ $loading }) => $loading ? 0 : 1};
    transition: opacity 0.2s ease;
    display: inline-block;
    padding: ${({ $animate }) => $animate ? '.4375rem 0 .4375rem 1.5rem' : '0'};
    position: relative;

    ${({ $isLink }) => $isLink && css`
        padding: 8px 0;  // Adjust padding for link version
    `}
`;

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
        animate = false,
        target,
        rel = getRel(target),
        variant,
        type = 'button',
        onClick,
        ...restProps
    } = props;

    // Handle focus state for styling
    const [isOnFocus, setFocus] = useState(false);

    // Class names for button container
    const mainTheme = props.theme === MENT_BUTTON_THEME.DARK ? darkTheme : lightTheme;

    const renderIcon = () => {
        if (!icon) return null;

        return (
            <IconWrapper $isSmall={isSmall}>
                {typeof icon === 'string' ? (
                    <MENTIcon
                        name={icon}
                        theme={theme === MENT_BUTTON_THEME.LIGHT ? MENT_ICON_THEME.light : undefined}
                    />
                ) : (
                    icon
                )}
            </IconWrapper>
        );
    };

    const renderContent = () => (
        <Content
            $loading={loading}
            $animate={animate}
            $isLink={!!href}  // Add this prop
        >
            <TextWrapper>
                {children}
                {renderIcon()}
                {href && <LinkUnderline />}
            </TextWrapper>
        </Content>
    );

    return (
        <ThemeProvider theme={mainTheme}>
            <ButtonWrapper
                $isOnFocus={isOnFocus}
                $variant={variant}
                $theme={theme}
            >
                {href ? (
                    <ButtonLink
                        className={className}
                        href={href}
                        target={target}
                        rel={rel}
                        $variant={variant}
                        $theme={theme}
                        $fullWidth={fullWidth}
                        $disabled={disabled}
                        $loading={loading}
                        $isSmall={isSmall}
                        $hasIcon={!!icon}
                        $animate={animate}
                        $hasChildren={!!children}
                        ref={ref as React.Ref<HTMLAnchorElement>}
                        onClick={onClick}
                        {...restProps}
                    >
                        {renderContent()}
                    </ButtonLink>
                ) : (
                    <BaseButton
                        className={className}
                        type={type}
                        disabled={disabled || loading}
                        $variant={variant}
                        $theme={theme}
                        $fullWidth={fullWidth}
                        $disabled={disabled}
                        $loading={loading}
                        $isSmall={isSmall}
                        $hasIcon={!!icon}
                        $animate={animate}
                        $hasChildren={!!children}
                        ref={ref as React.Ref<HTMLButtonElement>}
                        onClick={onClick}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        {...restProps}
                    >
                        {renderContent()}
                        {loading && <Loader />}
                    </BaseButton>
                )}
            </ButtonWrapper>
        </ThemeProvider>
    );
});

export const MENTButton = memo(MENTButtonCore);