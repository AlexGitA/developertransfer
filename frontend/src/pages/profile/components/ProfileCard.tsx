import React, {useState} from 'react';
import {UserDetails} from '@/types/user';
import CountryFlag from "@/components/ui/flag";
import '@fortawesome/fontawesome-free/css/all.css';
import SkillBadges from "@/pages/profile/components/SkillBadges.tsx";
import { Badge } from "@/components/ui/badge";
import EditProfileDialog from './EditProfileDialog'; // Add this import

interface ProfileCardProps {
    userDetails: UserDetails;
    currentUserId?: number;
    onEdit?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({userDetails, currentUserId, onEdit}) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    return (
        <div
            className="bg-white dark:bg-gray-800/95 text-sm rounded-[12px] shadow-lg dark:shadow-gray-900/20 p-4 sm:p-6 transition-colors">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Column - Basic Info */}
                <div className="lg:col-span-1">
                    <div className="flex flex-col items-center space-y-4">
                        {/* Profile Image with Gradient Border */}
                        <div
                            className="relative inline-block p-1 rounded-full bg-gradient-to-r from-primary-300 to-primary-500 dark:from-blue-500 dark:to-blue-700">
                            <img
                                src={userDetails.profile_picture || "/images/default-profile.png"}
                                alt={`${userDetails.username}'s profile`}
                                className="w-28 sm:w-32 h-28 sm:h-32 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                            />
                            <div
                                className={`absolute bottom-[6px] right-[6px] w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 ${
                                    userDetails.is_online ? 'bg-green-400' : 'bg-[#6b7280] dark:bg-gray-500'
                                }`}
                            />
                        </div>

                        {/* Basic Info with Background Accent */}
                        <div
                            className="text-center w-full bg-gray-50 dark:bg-gray-800 dark:border dark:border-gray-700/50 rounded-xl p-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                                {userDetails.first_name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                                @{userDetails.username}
                                {userDetails.is_verified && (
                                    <i className="fa-solid fa-circle-check text-primary dark:text-blue-400"
                                       title="Verified User"/>
                                )}
                            </p>
                            {userDetails.current_role && (
                                <p className="text-primary-400 dark:text-blue-300 font-medium mt-2 pb-1">
                                    {userDetails.current_role}
                                </p>
                            )}
                        </div>

                        {/* Status Badges with Gradient */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {userDetails.mentor && (
                                <span
                                    className="px-4 py-1.5 rounded-[50px] bg-gradient-to-r from-primary-400 to-primary-500 dark:from-blue-600 dark:to-blue-700 text-white text-xs sm:text-sm font-medium shadow-sm dark:shadow-gray-900/20">
                                    <i className="fas fa-user-graduate mr-1.5"></i>
                                    Mentor
                                </span>
                            )}
                            {userDetails.looking_for_mentor && (
                                <span
                                    className="px-4 py-1.5 rounded-[50px] bg-gradient-to-r from-green-400 to-green-500 dark:from-green-600 dark:to-green-700 text-white text-xs sm:text-sm font-medium shadow-sm dark:shadow-gray-900/20">
                                    <i className="fas fa-search mr-1.5"></i>
                                    Looking for Mentor
                                </span>
                            )}
                            {/* Message Button */}
                            <button
                                className="px-4 py-1.5 rounded-[50px] bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white text-xs sm:text-sm font-medium shadow-sm dark:shadow-gray-900/20 hover:from-blue-500 hover:to-blue-600 transition-all duration-200"
                            >
                                <i className="fas fa-paper-plane mr-1.5"></i>
                                Message
                            </button>
                        </div>

                        {/* Location, Language and Social Links Card */}
                        <div
                            className="flex flex-col items-center gap-4 w-full bg-gray-50 dark:bg-gray-800 dark:border dark:border-gray-700/50 rounded-xl p-4">
                            {/* Location and Language */}
                            <div className="flex justify-center gap-4">
                                {userDetails.preferred_language && (
                                    <div className="flex flex-col items-center gap-1">
                                        <CountryFlag
                                            code={userDetails.preferred_language}
                                            text={userDetails.preferred_language}
                                            label="Language"
                                            showText={false}
                                        />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Language</span>
                                    </div>
                                )}
                                {userDetails.country && userDetails.country !== '' && (
                                    <div className="flex flex-col items-center gap-1">
                                        <CountryFlag
                                            code={userDetails.country}
                                            label="Country"
                                            showText={false}
                                            text={undefined}
                                        />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Country</span>
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div
                                className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent"/>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                {userDetails.github_profile && (
                                    <a href={userDetails.github_profile}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-500 dark:from-blue-600 dark:to-blue-700 text-white hover:from-primary-500 hover:to-primary-600 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-200 shadow-sm dark:shadow-gray-900/20">
                                        <i className="fab fa-github text-lg"/>
                                    </a>
                                )}
                                {userDetails.linkedin_profile && (
                                    <a href={userDetails.linkedin_profile}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-500 dark:from-blue-600 dark:to-blue-700 text-white hover:from-primary-500 hover:to-primary-600 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-200 shadow-sm dark:shadow-gray-900/20">
                                        <i className="fab fa-linkedin text-lg"/>
                                    </a>
                                )}
                                {userDetails.instagram_profile && (
                                    <a href={userDetails.instagram_profile}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-500 dark:from-blue-600 dark:to-blue-700 text-white hover:from-primary-500 hover:to-primary-600 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-200 shadow-sm dark:shadow-gray-900/20">
                                        <i className="fab fa-instagram text-lg"/>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    {/* Bio Section */}
                    {userDetails.bio && (
                        <div className="bg-gray-50 dark:bg-gray-800 dark:border dark:border-gray-700/50 rounded-xl p-4">
                            <h3 className="text-primary dark:text-blue-400 font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                                <i className="fas fa-user-circle"/>
                                About
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {userDetails.bio}
                            </p>
                        </div>
                    )}

                    {/* Goals Section */}
                    {userDetails.goals && (
                        <div className="bg-gray-50 dark:bg-gray-800 dark:border dark:border-gray-700/50 rounded-xl p-4">
                            <h3 className="text-primary dark:text-blue-400 font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                                <i className="fas fa-flag"/>
                                Goals
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {userDetails.goals}
                            </p>
                        </div>
                    )}

                    {/* Skills Section */}
                    <div
                        className="bg-gray-50 dark:bg-gray-800 dark:border dark:border-gray-700/50 rounded-xl p-4 space-y-3">
                        <h3 className="text-primary dark:text-blue-400 font-medium text-sm sm:text-base flex items-center gap-2">
                            <i className="fas fa-code"/>
                            Skills
                        </h3>
                        <SkillBadges skills={userDetails.skills_info}/>
                    </div>
                </div>
            </div>

            {/* GitHub Activity Chart - Full Width */}
            {userDetails.github_profile && (
                <div
                    className="hidden lg:block mt-4 sm:mt-6 bg-gray-50 dark:bg-gray-800 dark:border dark:border-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-primary dark:text-blue-400 font-medium text-sm sm:text-base flex items-center gap-2">
                            <i className="fab fa-github"/>
                            GitHub Activity
                        </h3>
                        <a href={userDetails.github_profile}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-xs text-primary-400 hover:text-primary-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                            View Profile <i className="fas fa-external-link-alt ml-1"/>
                        </a>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-2">
                        <img
                            src="https://ghchart.rshah.org/twoichai"
                            alt="2016rshah's Github chart"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>
            )}
            {/* Edit Button - Bottom */}
            {userDetails.id && currentUserId === userDetails.id && (
                <div className="mt-4 sm:mt-6 flex justify-center">
                    <button
                        onClick={onEdit}
                        className="px-6 py-2.5 rounded-[50px] bg-gradient-to-r from-primary-400 to-primary-500 dark:from-blue-600 dark:to-blue-700 hover:from-primary-500 hover:to-primary-600 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white text-sm sm:text-base font-medium transition-all duration-200 flex items-center gap-2 shadow-sm dark:shadow-gray-900/20">
                        <i className="fas fa-edit"/>
                        Edit Profile
                    </button>
                </div>
            )}
                {/* Edit Button */}
                {userDetails.id && currentUserId === userDetails.id && (
                    <button onClick={() => setIsEditDialogOpen(true)}
                            className="px-6 py-3 rounded-[50px] bg-[#215FCB] hover:bg-[#5F7ABB] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium transition-all duration-200 flex items-center gap-2">
                        <i className="fas fa-edit"></i>
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Add the EditProfileDialog component here */}
            <EditProfileDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                userDetails={userDetails}
            />
        </div>
    );
};

export default ProfileCard;