// components/ProfileForm.tsx
import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";

const ProfileForm: React.FC = () => {
  const { register, handleSubmit } = useForm();

  // const [formData, setFormData] = useState({
  //   name: '',
  //   username: '',
  //   email: '',
  //   location: '',
  //   website: '',
  //   bio: '',
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const onSubmit = (values: any) => {
    console.log(values);
    // Handle form submission
    // console.log('Form submitted:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-10 rounded-md shadow-md w-full max-w-4xl mx-auto mt-10"
    >
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Username"
          type="text"
          register={register}
          name="username"
        />
        <Input label="Email" type="email" register={register} name="email" />
        <Input label="Phone" type="number" register={register} name="name" />
        <Input label="DOB" type="text" register={register} name="dob" />
        <Input
          label="Bio"
          type="text"
          textarea
          register={register}
          name="bio"
        />
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="bg-pink-500 text-white p-4 text-sm rounded-md hover:bg-pink-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
