/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import RoundButton from "../Button";
import AddUser from "../../assets/Images/AddUser.jpg";

const Sidebar: React.FC<SidebarProps> = ({
  profileData,
  onSelect,
  selectedOption,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(AddUser);
  const [isPreview, setIsPreview] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    console.log(file);

    if (file) {
      const blobUrl: any = URL.createObjectURL(file);
      setImageUrl(blobUrl);
      setIsPreview(true);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <>
      <div className="w-80 bg-gray-100 h-screen flex flex-col items-center p-6 space-y-6 shadow-lg">
        <div className="text-center">
          <input
            type="file"
            name="profilePic"
            onChange={handleChange}
            style={{ display: "none" }}
            id="profilePic"
          />
          <label htmlFor="profilePic">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-2"
            />
          </label>
          <h2 className="text-lg font-semibold">{profileData.profileName}</h2>
          <p className="text-sm text-gray-500">{profileData.profileRole}</p>
        </div>
        <nav className="w-full flex-grow">
          <ul className="space-y-4">
            {profileData?.options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => onSelect(option.key)}
                  className={`block w-full text-left text-sm py-2 px-4 rounded-md text-gray-700 hover:bg-gray-200 ${
                    selectedOption === option.key
                      ? "bg-gray-200 font-semibold"
                      : ""
                  }`}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {isPreview && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <img
              src={imageUrl}
              alt="Profile"
              className="max-w-xs max-h-xs rounded-md mb-4"
            />
            <div className="flex items-center justify-around">
              {/* <button
                className="bg-[#003366] text-white py-2 px-4 rounded-md"
                title="CANCEL"
              >
                CANCEL
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                title="SAVE"
              >
                SAVE
              </button> */}
              <RoundButton
                title="CANCEL"
                onClick={() => setIsPreview(false)}
                style={{
                  backgroundColor: "#003366",
                  color: "white",
                  marginRight: "10px",
                }}
              />
              <RoundButton title="SAVE" style={{ marginLeft: "10px" }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
