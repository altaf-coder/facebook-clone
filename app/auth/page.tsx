"use client";
import Input from "@/components/Input";
import { authSchema } from "@/validation/validation.auth";
import axios from "axios";
import { Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AuthForm = () => {
  const [variant, setVariant] = useState("login");
  const router = useRouter();

  const toggleVariant = () => {
    setVariant(variant === "login" ? "register" : "login");
  };

  return (
    <div className="h-screen w-full flex flex-row justify-center items-center lg:px-100 lg:py-60">
      <div className=" mb-50 flex-col hidden lg:flex">
        <h1 className="text-6xl text-blue-600 font-bold">Facebook</h1>
        <p className="mt-3 text-black text-3xl max-w-130">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>

      <div className="flex flex-col items-center bg-gray-100 w-80 h-100 lg:w-90 lg:h-100 shadow-md ml-0 lg:ml-20">
        <h1 className="text-3xl font-semibold text-blue-600">
          {variant === "login" ? "Login" : "Register"}
        </h1>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={authSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              if (variant === "login") {
                const res = await signIn("credentials", {
                  redirect: false,
                  ...values,
                });

                if (res?.ok) {
                  toast.success("Login Successfully");
                  router.push("/");
                } else {
                  toast.error("Invalid credentials");
                }
              } else {
                await axios.post("/api/register", values);
                toast.success("Register Successfully");

                const res = await signIn("credentials", {
                  redirect: false,
                  email: values.email,
                  password: values.password,
                });

                if (res?.ok) {
                  router.push("/");
                } else {
                  toast.error("Login after registration failed");
                }
              }
            } catch (error) {
              console.error(error);
              toast.error("Something went wrong");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              {variant === "register" && (
                <>
                  <Input
                    name="name"
                    type="text"
                    label="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.name && touched.name && errors.name}
                  </p>
                </>
              )}

              <Input
                name="email"
                type="email"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {variant === "register" && (
                <p className="text-red-500 text-sm">
                  {errors.email && touched.email && errors.email}
                </p>
              )}

              <Input
                name="password"
                type="password"
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {variant === "register" && (
                <p className="text-red-500 text-sm">
                  {errors.password && touched.password && errors.password}
                </p>
              )}

              {variant === "register" && (
                <>
                  <Input
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </p>
                </>
              )}
              <button
                className={`w-full mt-6 text-white font-semibold py-2 rounded-md shadow-md transition 
                  ${
                    variant === "login"
                      ? "bg-[#1877F2] hover:bg-[#166FE5]"
                      : "bg-[#42b72a] hover:bg-[#36a420]"
                  }`}
                type="submit"
                disabled={isSubmitting}
              >
                {variant === "login" ? "Login" : "Register"}
              </button>

              <p className="text-sm text-gray-600 mt-3 text-center">
                {variant === "login"
                  ? "New to Facebook?"
                  : "Already have an account"}{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={toggleVariant}
                >
                  {variant === "login" ? "Register" : "Login"}
                </span>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
