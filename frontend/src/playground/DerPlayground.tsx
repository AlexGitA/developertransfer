import { MENTInput } from '@/components/input/MENT-input';
import MENTLoader from '@/components/SVGLoader/MENT-loader';

export default function DerPlayground() {
    return (
        <>
                <MENTLoader></MENTLoader>
            <MENTInput
                id="name"
                labelText="Full Name"
                hintText="Enter your full legal name"
                required={true}
            />
            <MENTInput
                id="email"
                labelText="Email"
                errorText="Invalid email address"
                valid={false}
                noIcon={false} // Shows error icon
                required={true}
            />
            <MENTInput
                id="phone"
                labelText="Phone Number"
                valid={true}
                hintText="We'll only use this for important updates"
            />
            <MENTInput
                id="search"
                centered={true}
                placeholder="Enter search term..."
            />
            <MENTInput
                id="username"
                labelText="Username"
                aria-label="Username"
                hintText="Choose a unique username"
            />
            <MENTInput
                id="password"
                type="password"
                labelText="Password"
                required={true}
                hintText="Minimum 8 characters with mix of letters and numbers"
            />
            <MENTInput
                id="disabled-field"
                labelText="Account Number"
                defaultValue="123-456-789"
                disabled={true}
            />
            <MENTInput
                id="uncontrolled"
                labelText="Default Value"
                defaultValue="Initial value"
            />
        </>
    );
}