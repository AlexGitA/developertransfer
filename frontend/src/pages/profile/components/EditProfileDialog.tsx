import React, {useState, useEffect} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import countries from 'world-countries';
import {Switch} from "@/components/ui/switch";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UserDetails} from '@/types/user';
import AxiosInstance, {getUserId} from "@/lib/Axios";
import SkillSelector from './SkillSelector';



interface EditProfileDialogProps {
    isOpen: boolean;
    onClose: () => void;
    userDetails: UserDetails;
}

const EditProfileDialog = ({isOpen, onClose, userDetails}: EditProfileDialogProps) => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [id] = useState(getUserId());
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        username: userDetails.username || "",
        first_name: userDetails.first_name || "",
        last_name: userDetails.last_name || "",
        current_role: userDetails.current_role || "",
        country: userDetails.country || "",
        preferred_language: userDetails.preferred_language || "",
        bio: userDetails.bio || "",
        goals: userDetails.goals || "",
        github_profile: userDetails.github_profile || "",
        linkedin_profile: userDetails.linkedin_profile || "",
        instagram_profile: userDetails.instagram_profile || "",
        mentor: userDetails.mentor || false,
        looking_for_mentor: userDetails.looking_for_mentor || false
    });

    const countryOptions = countries.map((country) => ({
        value: country.cca2.toUpperCase(), // ISO Alpha-2 code in uppercase
        label: country.name.common,
    }));
    const [selectedSkills, setSelectedSkills] = useState(userDetails.skills_info || []);
    // Update formData when userDetails changes
    useEffect(() => {
    setFormData(prevData => ({
        ...prevData,
        ...userDetails,
        skills: userDetails.skills || []
    }));
    setSelectedSkills(userDetails.skills_info || []);
}, [userDetails]);

    const handleSkillsChange = (skills: any[]) => {
    setSelectedSkills(skills);
    // Update the formData with just the skill IDs for the API
    setFormData(prev => ({
        ...prev,
        skills: skills.map(skill => skill.id)
    }));
};

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id, value} = e.target;
        setFormData(prev => ({...prev, [id]: value}));

        // Clear validation error when field is being edited
        if (validationErrors[id]) {
            setValidationErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    const handleSelectChange = (id: string, value: string) => {
        setFormData(prev => ({...prev, [id]: value}));

        // Clear validation error when field is being edited
        if (validationErrors[id]) {
            setValidationErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    const handleSwitchChange = (id: string, checked: boolean) => {
        setFormData(prev => ({...prev, [id]: checked}));
    };

    const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setError("");
    setValidationErrors({});

    // Validate required fields
    const newValidationErrors: {[key: string]: string} = {};
    if (!formData.first_name) newValidationErrors.first_name = "First name is required";
    if (!formData.last_name) newValidationErrors.last_name = "Last name is required";
    if (!formData.country) newValidationErrors.country = "Country is required";

    // If validation errors exist, show them and don't submit
    if (Object.keys(newValidationErrors).length > 0) {
        setValidationErrors(newValidationErrors);
        return;
    }

    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
        // Log skills data for debugging
        console.log("Sending skills:", formData.skills);

        const updateResponse = await AxiosInstance.patch(
            `/api/user-update/${id}/`,
            formData,
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        );

        if (updateResponse.data?.message) {
            console.log("Updated successfully");
            onClose();
            window.location.reload();
        }
    } catch (err: any) {
        console.error("Update error:", err.response?.data || err.message);
        console.log("Form data passed:", formData);
        setError(
            err.response?.data?.non_field_errors?.[0] ||
            err.response?.data?.detail ||
            "Failed to update. Please try again."
        );
    } finally {
        setLoading(false);
    }
};
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <i className="fas fa-user-edit text-primary dark:text-blue-400"></i>
                        Edit Profile
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={updateUser} className="space-y-8 py-6">
                    {/* Profile Picture Section */}
                    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <Label htmlFor="profile_picture" className="text-lg font-semibold flex items-center gap-2">
                            <i className="fas fa-camera text-primary dark:text-blue-400"></i>
                            Profile Picture
                        </Label>
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <img
                                    src={userDetails.profile_picture || "/images/default-profile.png"}
                                    alt="Profile preview"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 dark:border-blue-400/20"
                                />
                                <div
                                    className="absolute bottom-0 right-0 bg-primary dark:bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                    <i className="fas fa-camera-retro text-sm"></i>
                                </div>
                            </div>
                            <div className="flex-1">
                                <Input
                                    id="profile_picture"
                                    type="file"
                                    accept="image/*"
                                    className="w-full"
                                />
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    <i className="fas fa-info-circle mr-1"></i>
                                    Recommended: Square image, at least 400x400px
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Basic Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-primary dark:text-blue-400">
                            <i className="fas fa-user"></i>
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="first_name" className="flex items-center gap-2">
                                    <i className="fas fa-signature text-gray-400"></i>
                                    First Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your first name"
                                    className={`border-gray-300 ${validationErrors.first_name ? 'border-red-500 ring-red-500' : ''}`}
                                />
                                {validationErrors.first_name && (
                                    <p className="text-sm text-red-500">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {validationErrors.first_name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last_name" className="flex items-center gap-2">
                                    <i className="fas fa-signature text-gray-400"></i>
                                    Last Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your last name"
                                    className={`border-gray-300 ${validationErrors.last_name ? 'border-red-500 ring-red-500' : ''}`}
                                />
                                {validationErrors.last_name && (
                                    <p className="text-sm text-red-500">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {validationErrors.last_name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username" className="flex items-center gap-2">
                                    <i className="fas fa-at text-gray-400"></i>
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter your username"
                                    className="border-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location & Language Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-primary dark:text-blue-400">
                            <i className="fas fa-globe"></i>
                            Location & Language
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="current_role" className="flex items-center gap-2">
                                    <i className="fas fa-briefcase text-gray-400"></i>
                                    Current Role
                                </Label>
                                <Input
                                    id="current_role"
                                    value={formData.current_role}
                                    onChange={handleInputChange}
                                    placeholder="Enter your current role"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country" className="flex items-center gap-2">
                                    <i className="fas fa-map-marker-alt text-gray-400"></i>
                                    Country <span className="text-red-500">*</span>
                                </Label>

                                <Select
                                    value={formData.country}
                                    onValueChange={(value) => handleSelectChange('country', value)}
                                >
                                    <SelectTrigger
                                        className={`w-full ${validationErrors.country ? 'border-red-500 ring-red-500' : ''}`}>
                                        <SelectValue placeholder="Select your country"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countryOptions.map((country) => (
                                            <SelectItem key={country.value} value={country.value}>
                                                <span className="flex items-center gap-2">
                                                    <i className={`fi fi-${country.value.toLowerCase()}`}></i>
                                                    {country.label}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {validationErrors.country && (
                                    <p className="text-sm text-red-500">
                                        <i className="fas fa-exclamation-circle mr-1"></i>
                                        {validationErrors.country}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="preferred_language" className="flex items-center gap-2">
                                    <i className="fas fa-language text-gray-400"></i>
                                    Preferred Language
                                </Label>
                                <Select
                                    value={formData.preferred_language}
                                    onValueChange={(value) => handleSelectChange('preferred_language', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your preferred language"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-globe-americas"></i>
                                                English
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="es">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-globe-europe"></i>
                                                Spanish
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="fr">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-globe-europe"></i>
                                                French
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="cn">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-globe-europe"></i>
                                                Chinese
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="de">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-globe-europe"></i>
                                                German
                                            </span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Bio & Goals Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-primary dark:text-blue-400">
                            <i className="fas fa-book-open"></i>
                            Bio & Goals
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="bio" className="flex items-center gap-2">
                                    <i className="fas fa-quote-left text-gray-400"></i>
                                    Bio
                                </Label>
                                <Textarea
                                    id="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about yourself"
                                    className="h-32 resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="goals" className="flex items-center gap-2">
                                    <i className="fas fa-bullseye text-gray-400"></i>
                                    Goals
                                </Label>
                                <Textarea
                                    id="goals"
                                    value={formData.goals}
                                    onChange={handleInputChange}
                                    placeholder="What are your goals?"
                                    className="h-32 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Links Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-primary dark:text-blue-400">
                            <i className="fas fa-share-alt"></i>
                            Social Links
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="github_profile" className="flex items-center gap-2">
                                    <i className="fab fa-github text-gray-400"></i>
                                    GitHub Profile
                                </Label>
                                <Input
                                    id="github_profile"
                                    value={formData.github_profile}
                                    onChange={handleInputChange}
                                    placeholder="https://github.com/username"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="linkedin_profile" className="flex items-center gap-2">
                                    <i className="fab fa-linkedin text-gray-400"></i>
                                    LinkedIn Profile
                                </Label>
                                <Input
                                    id="linkedin_profile"
                                    value={formData.linkedin_profile}
                                    onChange={handleInputChange}
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="instagram_profile" className="flex items-center gap-2">
                                    <i className="fab fa-instagram text-gray-400"></i>
                                    Instagram Profile
                                </Label>
                                <Input
                                    id="instagram_profile"
                                    value={formData.instagram_profile}
                                    onChange={handleInputChange}
                                    placeholder="https://instagram.com/username"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mentor Status Section */}
                    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-primary dark:text-blue-400">
                            <i className="fas fa-users"></i>
                            Mentorship Status
                        </h3>
                        <div className="space-y-4">
                            <div
                                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                <Label htmlFor="mentor" className="flex items-center gap-2 cursor-pointer">
                                    <i className="fas fa-chalkboard-teacher text-blue-500"></i>
                                    Available as Mentor
                                </Label>
                                <Switch
                                    id="mentor"
                                    checked={formData.mentor}
                                    onCheckedChange={(checked) => handleSwitchChange('mentor', checked)}
                                />
                            </div>

                            <div
                                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                <Label htmlFor="looking_for_mentor" className="flex items-center gap-2 cursor-pointer">
                                    <i className="fas fa-graduation-cap text-green-500"></i>
                                    Looking for Mentor
                                </Label>
                                <Switch
                                    id="looking_for_mentor"
                                    checked={formData.looking_for_mentor}
                                    onCheckedChange={(checked) => handleSwitchChange('looking_for_mentor', checked)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-primary dark:text-blue-400">
                            <i className="fas fa-code"></i>
                            Skills
                        </h3>
                        <div className="space-y-4">
                            <SkillSelector
                                selectedSkills={selectedSkills}
                                onChange={handleSkillsChange}
                            />
                        </div>
                    </div>

                </form>

                <DialogFooter className="border-t pt-4 mt-6">
                    <div className="w-full">
                        <p className="text-sm text-gray-500 mb-3">
                            <i className="fas fa-info-circle mr-1"></i>
                            Fields marked with <span className="text-red-500">*</span> are required.
                        </p>

                        {error && (
                            <p className="text-sm text-red-500 mb-2">
                                <i className="fas fa-exclamation-circle mr-1"></i>
                                {error}
                            </p>
                        )}

                        <div className="flex gap-3 justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="flex items-center gap-2"
                                disabled={loading}
                            >
                                <i className="fas fa-times"></i>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                onClick={updateUser}
                                className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-save"></i>
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileDialog;