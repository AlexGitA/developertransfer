import { MENTButton, MENT_BUTTON_VARIANT} from '@/components/button/MENT-button.tsx';
import MENTLoader from '@/components/SVGLoader/MENT-loader';

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
            <MENTLoader />
            {/* Primary Buttons */}
            <div>
                <h3>Primary Buttons</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <MENTButton className="bg-customGreen text-white">
                        Custom Green
                    </MENTButton>
                    <MENTButton className="bg-customBlue text-white">
                        Custom Blue
                    </MENTButton>
                    <MENTButton className="bg-customOrange text-white" loading></MENTButton>
                    <MENTButton className="bg-customGreen text-white" disabled>
                        Custom Disabled
                    </MENTButton>
                </div>
            </div>

            {/* Secondary Buttons */}
            <div>
                <h3>Secondary Buttons</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <MENTButton
                        variant={MENT_BUTTON_VARIANT.SECONDARY}
                        className="bg-customBlue text-white"
                    >
                        Custom Blue Secondary
                    </MENTButton>
                    <MENTButton
                        variant={MENT_BUTTON_VARIANT.SECONDARY}
                        className="bg-customGreen text-white"
                    >
                        Custom Green Secondary
                    </MENTButton>
                    <MENTButton
                        variant={MENT_BUTTON_VARIANT.SECONDARY}
                        className="bg-customOrange text-white"
                        isSmall
                    >
                        Small Custom Orange
                    </MENTButton>
                </div>
            </div>

            {/* Tertiary Buttons */}
            <div>
                <h3>Tertiary Buttons</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <MENTButton
                        variant={MENT_BUTTON_VARIANT.TERTIARY}
                        className="bg-customBlue text-white"
                    >
                        Tertiary Blue
                    </MENTButton>
                    <MENTButton
                        variant={MENT_BUTTON_VARIANT.TERTIARY}
                        className="bg-customGreen text-white"
                    >
                        Tertiary Green
                    </MENTButton>
                </div>
            </div>

            {/* Special Buttons */}
            <div>
                <h3>Special Variant</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <MENTButton
                        variant={MENT_BUTTON_VARIANT.SPECIAL}
                        className="bg-customOrange text-white"
                    >
                        Special Orange
                    </MENTButton>
                </div>
            </div>

            {/* Icon Buttons */}
            <div>
                <h3>Icon Buttons</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <MENTButton
                        icon={"icon-arrow"}
                        hasChildren={false}
                        className="bg-customBlue text-white"
                    >
                    </MENTButton>
                    <MENTButton
                        icon={"icon-arrow"}
                        fullWidth={true}
                        animate={true}
                        variant={MENT_BUTTON_VARIANT.SECONDARY}
                        className="bg-customGreen text-white"
                    >
                        With Icon
                    </MENTButton>
                    <MENTButton
                        icon={sampleIcon}
                        isSmall
                        className="bg-customOrange text-white"
                    >
                        Small Icon
                    </MENTButton>
                </div>
            </div>

            {/* Full Width Button */}
            <div>
                <h3>Full Width</h3>
                <MENTButton className="bg-customGreen text-white" fullWidth>
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
                    className="bg-customBlue text-white"
                >
                    Open Link
                </MENTButton>
            </div>
        </div>
    );
}
