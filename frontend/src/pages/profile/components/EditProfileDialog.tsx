import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserDetails } from '@/types/user';

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userDetails: UserDetails;
}

const EditProfileDialog = ({ isOpen, onClose, userDetails }: EditProfileDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - to be implemented by you
    onClose();
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

        <form onSubmit={handleSubmit} className="space-y-8 py-6">
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
                <div className="absolute bottom-0 right-0 bg-primary dark:bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center">
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
                  First Name
                </Label>
                <Input
                  id="first_name"
                  defaultValue={userDetails.first_name}
                  placeholder="Enter your first name"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <i className="fas fa-at text-gray-400"></i>
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue={userDetails.username}
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
                  defaultValue={userDetails.current_role}
                  placeholder="Enter your current role"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-gray-400"></i>
                  Country
                </Label>
                <Select defaultValue={userDetails.country}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">
                      <span className="flex items-center gap-2">
                        <i className="fas fa-flag-usa"></i>
                        United States
                      </span>
                    </SelectItem>
                    <SelectItem value="uk">
                      <span className="flex items-center gap-2">
                        <i className="fas fa-flag"></i>
                        United Kingdom
                      </span>
                    </SelectItem>
                    <SelectItem value="ca">
                      <span className="flex items-center gap-2">
                        <i className="fas fa-flag"></i>
                        Canada
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_language" className="flex items-center gap-2">
                  <i className="fas fa-language text-gray-400"></i>
                  Preferred Language
                </Label>
                <Select defaultValue={userDetails.preferred_language}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your preferred language" />
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
                  defaultValue={userDetails.bio}
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
                  defaultValue={userDetails.goals}
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
                  defaultValue={userDetails.github_profile}
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
                  defaultValue={userDetails.linkedin_profile}
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
                  defaultValue={userDetails.instagram_profile}
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
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Label htmlFor="mentor" className="flex items-center gap-2 cursor-pointer">
                  <i className="fas fa-chalkboard-teacher text-blue-500"></i>
                  Available as Mentor
                </Label>
                <Switch
                  id="mentor"
                  defaultChecked={userDetails.mentor}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Label htmlFor="looking_for_mentor" className="flex items-center gap-2 cursor-pointer">
                  <i className="fas fa-graduation-cap text-green-500"></i>
                  Looking for Mentor
                </Label>
                <Switch
                  id="looking_for_mentor"
                  defaultChecked={userDetails.looking_for_mentor}
                />
              </div>
            </div>
          </div>
        </form>

        <DialogFooter className="border-t pt-4 mt-6">
          <Button variant="outline" onClick={onClose} className="flex items-center gap-2">
            <i className="fas fa-times"></i>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} className="flex items-center gap-2">
            <i className="fas fa-save"></i>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;