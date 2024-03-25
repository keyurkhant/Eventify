import React, { useState } from "react";

const ResetPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {
      password: "",
      confirmPassword: "",
    };
    let formIsValid = true;

    if (!formData.password) {
      formIsValid = false;
      tempErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
      // Here you can add the logic to update the password
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-md font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-black-300 text-md focus:ring-blue-500 focus:border-black-100 block w-full p-2.5 mt-2"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-md font-medium text-gray-700"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border border-black-300 text-md focus:ring-blue-500 focus:border-black-100 block w-full p-2.5 mt-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="submit"
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-button-primary hover:bg-button-primary-hover"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;