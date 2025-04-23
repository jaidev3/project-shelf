import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../lib/firebase";
import { auth } from "../../lib/firebase";
import { FiUpload, FiSave, FiCheck } from "react-icons/fi";
import { Button, Input, Textarea } from "@heroui/react";
import { UserProfile } from "@/hooks/useAuth";

export default function ProfileSettings() {
  const { currentUser, getUserProfile, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  // const profileData = getUserProfile(auth.currentUser?.uid);
  const [formData, setFormData] = useState<UserProfile>({
    displayName: "",
    profession: "",
    description: "",
    photoURL: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser?.uid) {
        try {
          const userProfile = await getUserProfile(currentUser.uid);
          if (userProfile) {
            setFormData({
              displayName: userProfile.displayName || "",
              username: userProfile.username || "",
              profession: userProfile.profession || "",
              description: userProfile.description || "",
              photoURL: userProfile.photoURL || "",
            });
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setError("Failed to load profile data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [currentUser, getUserProfile]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async (): Promise<string | null> => {
    if (!profileImage || !currentUser) return null;

    try {
      const storageRef = ref(
        storage,
        `profile-images/${currentUser.uid}/${Date.now()}_${profileImage.name}`
      );
      await uploadBytes(storageRef, profileImage);
      return await getDownloadURL(storageRef);
    } catch (err) {
      console.error("Error uploading image:", err);
      throw err;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      let updatedData: UserProfile = { ...formData };

      // If there's a new profile image, upload it and get the URL
      if (profileImage) {
        const photoURL = await uploadProfileImage();
        if (photoURL) {
          updatedData.photoURL = photoURL;
        }
      }

      await updateUserProfile(currentUser.uid, updatedData);
      setSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="profile-settings-page max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">
          Profile Settings
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-100">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center dark:bg-green-900 dark:text-green-100">
            <FiCheck className="mr-2" /> Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden dark:bg-neutral-700">
                {profileImagePreview || formData.photoURL ? (
                  <img
                    src={profileImagePreview || formData.photoURL}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <span className="text-3xl">?</span>
                  </div>
                )}
              </div>
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-indigo-500 text-white p-1 rounded-full cursor-pointer hover:bg-indigo-600 transition-colors"
              >
                <FiUpload size={14} />
              </label>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1 dark:text-gray-400">
                Upload a new profile picture
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Recommended size: 512x512 pixels (JPG, PNG, GIF)
              </p>
            </div>
          </div>

          {/* Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Display Name"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              placeholder="Your name"
              variant="bordered"
              isRequired
            />
          </div>

          <Input
            label="Profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            placeholder="e.g. UX Designer, Full Stack Developer"
            variant="bordered"
          />

          <Textarea
            label="Bio"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Tell us about yourself..."
            variant="bordered"
            minRows={3}
            maxRows={6}
          />

          <div className="pt-4">
            <Button
              type="submit"
              color="primary"
              startContent={<FiSave />}
              isLoading={saving}
              isDisabled={saving}
              className="w-full sm:w-auto"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
