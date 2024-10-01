import { useAuth } from "../contexts/AuthProvider";
import { useState, useRef } from "react";
import useEditUserProfile from "../hooks/useEditUserProfile";
import { X, Camera, Loader2 } from "lucide-react";
import AvatarIcon from "./Avatar";
import StyledFormInput from "./StyledFormInput";

const EditProfileForm = ({ dialogRef }) => {
  const { user } = useAuth();

  const [selectedBanner, setSelectedBanner] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [bio, setBio] = useState(user.about || "");
  const [username, setUsername] = useState(user.username);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null)
  const bannerFileRef = useRef(null);
  const avatarFileRef = useRef(null);

  const profileMutation = useEditUserProfile();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null)
    const formData = new FormData();

    if(username.length === 0) {
      setIsSubmitting(false)
      setError("Username required")
      return
    }

    if (selectedBanner) {
      formData.append("banner", bannerFileRef.current.files[0]);
    }

    if (selectedAvatar) {
      formData.append("avatar", avatarFileRef.current.files[0]);
    }

    if (username !== user.username ) {
      formData.append("username", username);
    }

    if (bio !== user.about) {
      formData.append("about", bio);
    }

    try {
      await profileMutation.mutateAsync(formData);
      dialogRef.current?.close();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSubmitting(false);
      setSelectedAvatar(null);
      setSelectedBanner(null);
    }
  };

  const handleBannerImageSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (selectedBanner) {
        URL.revokeObjectURL(selectedBanner);
      }
      setSelectedBanner(URL.createObjectURL(file));
    }
  };
  const handleAvatarImageSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (selectedAvatar) {
        URL.revokeObjectURL(selectedAvatar);
      }
      setSelectedAvatar(URL.createObjectURL(file));
    }
  };

  const removeSelectedImage = (type) => {
    if (selectedBanner && type === "banner") {
      URL.revokeObjectURL(selectedBanner);
      setSelectedBanner(null);
      if (bannerFileRef.current) {
        bannerFileRef.current.value = "";
      }
    }

    if (selectedAvatar && type === "avatar") {
      URL.revokeObjectURL(selectedAvatar);
      setSelectedAvatar(null);
      if (avatarFileRef.current) {
        avatarFileRef.current.value = "";
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <header className="flex justify-between items-center  ">
        <div className=" p-1  hover:bg-gray-hover rounded-full hover:scale-110">
        <X
          className="cursor-pointer rounded-full z-20"
          color="white"
          size={20}
          onClick={() => {
            dialogRef.current?.close();
          }}
        />
        </div>
     
        <h1 className="text-white text-xl ml-4 font-bold mr-auto">
          Edit Profile
        </h1>
        <button
          type="submit"
          disabled={isSubmitting}
          className="  bg-white hover:bg-white/80 font-bold text-sm rounded-full px-5 py-[5px] flex items-center justify-center gap-2"
        >
          {isSubmitting ? 
          <>
          {"Saving..."}
          <Loader2 className=" h-3.5 w-3.5 animate-spin" />

          </>
           : "Save"}
        </button>
      </header>
      <main>
        <div className="h-52 mt-2  bg-black relative">
          {(selectedBanner || user.banner) && (
            <div className="">
              <img
                src={selectedBanner ? selectedBanner : user.banner}
                alt="Selected"
                className="w-full h-52 object-cover rounded-sm "
              />
              {selectedBanner && (
                <button
                  type="button"
                  onClick={() => removeSelectedImage("banner")}
                  className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}
          <label
            htmlFor="banner-image"
            type="button"
            className="absolute top-11 left-[230px] p-4 bg-gray-hover rounded-full opacity-90 hover:scale-105 cursor-pointer"
          >
            <Camera color="white" />
          </label>{" "}
          <input
            type="file"
            id="banner-image"
            ref={bannerFileRef}
            onChange={handleBannerImageSelect}
            accept="image/*"
            className="hidden"
          />
          <div className="absolute top-[147px] left-4">
            <label
              htmlFor="avatar-image"
              type="button"
              className="absolute top-11 left-10 p-2 bg-gray-hover rounded-full cursor-pointer opacity-75 hover:scale-110"
            >
              <input
                type="file"
                id="avatar-image"
                ref={avatarFileRef}
                onChange={handleAvatarImageSelect}
                accept="image/*"
                className="hidden "
              />
              <Camera color="white" />
            </label>{" "}
            {user.avatar || selectedAvatar ? (
              <>
                {selectedAvatar && (
                  <button
                    type="button"
                    onClick={() => removeSelectedImage("avatar")}
                    className="absolute top-2 left- bg-gray-900 bg-opacity-75 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                )}
                <img
                  src={selectedAvatar || user.avatar}
                  className="w-[120px] h-[120px] rounded-full object-cover"
                />
              </>
            ) : (
              <AvatarIcon size={120} />
            )}{" "}
          </div>
        </div>
        <StyledFormInput
          label="Username"
          value={username}
          onChange={setUsername}
          maxLength={30}
          error={error}
        />
        {error && <span className="text-red-500 text-sm italic">{error}</span>}
        <StyledFormInput
          label="Bio"
          value={bio}
          onChange={setBio}
          maxLength={100}
          isTextArea
        />
        {profileMutation.error && (
          <span className="text-red-500 text-sm italic">{profileMutation.error.message}</span>
        )}
      </main>
    </form>
  );
};

export default EditProfileForm;
