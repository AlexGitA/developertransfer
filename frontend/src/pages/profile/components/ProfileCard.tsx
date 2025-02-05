// components/ProfileCard.tsx
import React from 'react';
import {UserDetails} from '@/types/user';
import CountryFlag from "@/components/ui/flag";
import '@fortawesome/fontawesome-free/css/all.css';

interface ProfileCardProps {
    userDetails: UserDetails;
    currentUserId?: number;
    onEdit?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({userDetails, currentUserId, onEdit}) => {
    console.log('userDetails.id:', userDetails.id);
    console.log('currentUserId:', currentUserId);
    console.log('currentUserDetails:', userDetails);
    return (
        <div className="bg-white text-sm rounded-[12px] shadow-lg p-8">
            <div className="flex flex-col items-center gap-4">
                {/* Profile Image */}
                <div className="relative inline-block">
                    {userDetails.profile_picture ? (
                        <img
                            src={userDetails.profile_picture}
                            alt={`${userDetails.username}'s profile`}
                            className="w-24 h-24 rounded-full border-[3px] border-primary object-cover"
                        />
                    ) : (
                        <img
                            src="/images/default-profile.png"
                            alt="Default user"
                            className="w-24 h-24 rounded-full border-[3px] border-primary object-cover"
                        />
                    )}
                    {/* Online status indicator */}
                    <div
                        className={`absolute bottom-[6px] right-[6px] w-4 h-4 rounded-full border-[2px] border-secondary ${
                            userDetails.is_online ? 'bg-green-400' : 'bg-[#6b7280]'
                        }`}
                    />
                </div>

                {/* User Info */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-1 text-text">{userDetails.first_name}</h2>
                    <p className="text-accent mb-4 flex items-center justify-center gap-2">
                        @{userDetails.username}
                        {userDetails.is_verified && (
                            <i className="fa-solid fa-circle-check text-primary" title="Verified User"></i>
                        )}
                    </p>
                    {userDetails.current_role && (
                        <p className="text-primary-400 font-medium">{userDetails.current_role}</p>
                    )}
                </div>

                {/* Language and Country */}
                <ul className="space-y-2 mb-2 text-text">
                    {userDetails.preferred_language && (
                        <CountryFlag
                            code={userDetails.preferred_language}
                            text={userDetails.preferred_language}
                            label="Language"
                            showText={false}
                        />
                    )}

                    {userDetails.country && userDetails.country !== '' && (
                        <CountryFlag
                            code={userDetails.country}
                            label="Country"
                            showText={false}
                            text={undefined}
                        />
                    )}
                </ul>

                {/* Mentor Status */}
                <div className="flex gap-2">
                    {userDetails.mentor && (
                        <span className="px-4 py-2 rounded-[50px] bg-primary-200 text-white font-medium">
                            Mentor
                        </span>
                    )}
                    {userDetails.looking_for_mentor && (
                        <span className="px-4 py-2 rounded-[50px] bg-green-400 text-white font-medium">
                            Looking for Mentor
                        </span>
                    )}
                </div>

                {/* Bio */}
                {userDetails.bio && (
                    <p className="text-text text-center max-w-md leading-relaxed">{userDetails.bio}</p>
                )}

                {/* Social Links */}
                <div className="flex justify-center gap-4 mb-2">
                    {userDetails.github_profile && (
                        <a href={userDetails.github_profile} target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-200 text-text hover:bg-secondary transition-all duration-200">
                            <i className="fab fa-github text-xl"></i>
                        </a>
                    )}
                    {userDetails.linkedin_profile && (
                        <a href={userDetails.linkedin_profile} target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-200 text-text hover:bg-secondary transition-all duration-200">
                            <i className="fab fa-linkedin text-xl"></i>
                        </a>
                    )}
                    {userDetails.instagram_profile && (
                        <a href={userDetails.instagram_profile} target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-200 text-text hover:bg-secondary transition-all duration-200">
                            <i className="fab fa-instagram text-xl"></i>
                        </a>
                    )}
                </div>

                {/* Goals */}
                {userDetails.goals && (
                    <div className="text-center">
                        <h3 className="text-primary font-medium mb-2 flex items-center justify-center gap-2">
                            <i className="fas fa-flag"></i>
                            Goals
                        </h3>
                        <p className="text-text text-center max-w-md leading-relaxed">{userDetails.goals}</p>
                    </div>
                )}

                {/* Edit Button */}
                {userDetails.id && currentUserId === userDetails.id && (
                    <button onClick={onEdit}
                            className="px-6 py-3 rounded-[50px] bg-[#215FCB] text-white hover:bg-[#5F7ABB] font-medium transition-all duration-200 flex items-center gap-2">
                        <i className="fas fa-edit"></i>
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;