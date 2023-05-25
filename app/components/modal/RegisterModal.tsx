"use client";

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("../api/registers", data)
      .then(() => {
        console.log("success!");
        toast.success("Success!");
        registerModal.onClose();
        LoginModal.onOpen();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    LoginModal.onOpen();
  }, [registerModal, LoginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Study with Imnori" subtitle="Create your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const titleContent = <div>Register</div>;

  const footerContent = (
    <div
      className="flex
  flex-col
  gap-4
  mt-3
  "
    >
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <div
        className="text-neutral-500
      text-center
      mt-4
      font-light"
      >
        <div
          className="
          justify-center
        flex 
        flex-row 
        items-center 
        gap-2"
        >
          <div>Already have any account?</div>
          <div
            onClick={toggle}
            className="
          text-neutral-800
          cursor-pointer
          hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      body={bodyContent}
      title={titleContent}
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
