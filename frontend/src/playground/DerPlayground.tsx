import { MENTButton, MENT_BUTTON_VARIANT, MENT_BUTTON_THEME } from '@/components/button/MENT-button.tsx';
import MENTLoader from '@/components/SVGLoader/MENT-loader'
import Header from '@/layout/Header/Header';

const sampleIcon = "react";

export default function DerPlayground() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            maxWidth: '400px',
            margin: '0 auto'
        }}>
            <Header></Header>
            <MENTLoader/>
            {/* Primary Buttons */}
            <div>
                <h3>Primary Buttons</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <MENTButton>Primary Default</MENTButton>
                    <MENTButton theme={MENT_BUTTON_THEME.DARK}>Primary Dark</MENTButton>
                    <MENTButton loading></MENTButton>
                    <MENTButton disabled>Primary Disabled</MENTButton>
                </div>
            </div>

            {/* Secondary Buttons */}
            <div>
                <h3>Secondary Buttons</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <MENTButton variant={MENT_BUTTON_VARIANT.SECONDARY}>
                        Secondary Default
                    </MENTButton>
                    <MENTButton
                        variant={MENT_BUTTON_VARIANT.SECONDARY}
                        theme={MENT_BUTTON_THEME.LIGHT}
                    >
                        Secondary Light
                    </MENTButton>
                    <MENTButton
                        variant={MENT_BUTTON_VARIANT.SECONDARY}
                        isSmall
                    >
                        Small Secondary
                    </MENTButton>
                </div>
            </div>

            {/* Tertiary Buttons */}
            <div>
                <h3>Tertiary Buttons</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <MENTButton variant={MENT_BUTTON_VARIANT.TERTIARY}>
                        Tertiary Default
                    </MENTButton>
                    <MENTButton
                        variant={MENT_BUTTON_VARIANT.TERTIARY}
                        theme={MENT_BUTTON_THEME.DARK}
                    >
                        Tertiary Dark
                    </MENTButton>
                </div>
            </div>

            {/* Special Buttons */}
            <div>
                <h3>Special Variant</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <MENTButton variant={MENT_BUTTON_VARIANT.SPECIAL}>
                        Special Button
                    </MENTButton>
                </div>
            </div>

            {/* Icon Buttons */}
            <div>
                <h3>Icon Buttons</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <MENTButton icon={"icon-arrow"}
                                hasChildren={false}
                    >
                    </MENTButton>
                    <MENTButton
                        icon={"icon-arrow"}
                        fullWidth={true}
                        animate={true}
                        variant={MENT_BUTTON_VARIANT.SECONDARY}
                    >
                        With Icon
                    </MENTButton>
                    <MENTButton
                        icon={sampleIcon}
                        isSmall
                    >
                        Small Icon
                    </MENTButton>
                </div>
            </div>

            {/* Full Width Button */}
            <div>
                <h3>Full Width</h3>
                <MENTButton fullWidth>
                    Full Width Button
                </MENTButton>
            </div>

            {/* Link Button */}
            <div>
                <h3>Link Button</h3>
                <MENTButton
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open Link
                </MENTButton>
            </div>
        </div>
    );
}