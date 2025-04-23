import { useState, useEffect, ChangeEvent } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../lib/firebase";
import { FiUpload, FiSave, FiCheck } from "react-icons/fi";
import { Button, Input, Textarea } from "@heroui/react";
import { UserProfile } from "@/apis/authService";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@heroui/react";
import { useAuth as useAuthHook } from "../../hooks/useAuth";

// Define profile form schema with Zod
const profileSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  profession: z.string().optional(),
  description: z.string().optional(),
  photoURL: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileSettings() {
  const { currentUser, updateUserProfile, getUserProfile } = useAuthHook();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Setup React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "",
      profession: "",
      description: "",
      photoURL: "",
    },
  });

  // Fetch user profile data and set form values
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      setLoading(true);
      setError("");

      try {
        // Get user profile from Firestore
        const userProfile = await getUserProfile(currentUser.uid);

        // Reset form with user profile data
        reset({
          displayName: userProfile.displayName || currentUser.displayName || "",
          photoURL: userProfile.photoURL || currentUser.photoURL || "",
          profession: userProfile.profession || "",
          description: userProfile.description || "",
        });

        // Set profile image preview
        if (userProfile.photoURL || currentUser.photoURL) {
          setProfileImagePreview(
            userProfile.photoURL || currentUser.photoURL || null
          );
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile data");

        // Fallback to basic user info from auth
        reset({
          displayName: currentUser.displayName || "",
          photoURL: currentUser.photoURL || "",
          profession: "",
          description: "",
        });

        if (currentUser.photoURL) {
          setProfileImagePreview(currentUser.photoURL);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, getUserProfile, reset]);

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

  const onSubmit = async (data: ProfileFormValues) => {
    if (!currentUser) return;

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      let updatedData: UserProfile = { ...data };

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

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden dark:bg-neutral-700">
                  {profileImagePreview ? (
                    <img
                      src={profileImagePreview}
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
              <Controller
                name="displayName"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Display Name"
                    {...field}
                    placeholder="Your name"
                    variant="bordered"
                    isRequired
                    errorMessage={errors.displayName?.message}
                  />
                )}
              />
            </div>

            <Controller
              name="profession"
              control={control}
              render={({ field }) => (
                <Input
                  label="Profession"
                  {...field}
                  placeholder="e.g. UX Designer, Full Stack Developer"
                  variant="bordered"
                  errorMessage={errors.profession?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Bio"
                  {...field}
                  placeholder="Tell us about yourself..."
                  variant="bordered"
                  minRows={3}
                  maxRows={6}
                  errorMessage={errors.description?.message}
                />
              )}
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
        )}
      </div>
    </div>
  );
}
