"use client";

import { useState } from "react";
import axios from "axios";
import Heading from "../Heading";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSettingsModal from "../../hooks/useSettingsModal";
import { useRouter } from "next/navigation";
import RangeSlider from "../Inputs/RangeSlider";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const SettingsModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      studyhours: 0,
      studyminutes: 0,
      sessions: 1,
      breakhours: 0,
      breakminutes: 0,
    },
  });

  const router = useRouter();
  const settingsModal = useSettingsModal();
  const [isLoading, setIsLoading] = useState(false);
  const studyhours = watch("studyhours");
  const studyminutes = watch("studyminutes");
  const sessions = watch("sessions");
  const breakhours = watch("breakhours");
  const breakminutes = watch("breakminutes");
  const [totalTime, setTotalTime] = useState(0);
  const timeFormat = valuetext(totalTime);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleTime = () => {
    setTotalTime(
      (studyhours * 60 + studyminutes + breakhours * 60 + breakminutes) *
        sessions
    );
  };

  function valuetext(value: number) {
    const hrS = Math.floor(value / 60);
    const minS = Math.round((value / 60 - hrS) * 60);
    return `${hrS} Hours ${minS} Minutes`;
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    toast.success("Time Tracked");
    setIsLoading(true);

    axios
      .post("/api/totalTime", data)
      .then(() => {
        toast.success("Time Tracked");
        router.refresh();
        settingsModal.onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bodyContent = (
    <div
      onClick={handleTime}
      className="
      grid 
      grid-cols-1
      md:grid-cols-4
      gap-3
      max-h-[50vh]
      overflow-y-auto
      scrollbar-thin
      items-center
      justify-around
      text-end
      px-6
      py-2"
    >
      <div
        className="
          items-center
    justify-between"
      >
        <Heading title="Study" />
        {/* <RangeSlider
          title="hrs"
          value={studyhours}
          onChange={(value) => setCustomValue("studyhours", value)}
          min={0}
          max={23}
          step={1}
        /> */}
        <RangeSlider
          title="mins"
          value={studyminutes}
          min={0}
          max={60}
          step={5}
          onChange={(value) => setCustomValue("studyminutes", value)}
        />
      </div>
      <div
        className="
          items-center
    justify-between"
      >
        <Heading title="Break" />
        {/* <RangeSlider
          title="hrs"
          value={breakhours}
          onChange={(value) => setCustomValue("breakhours", value)}
          min={0}
          max={23}
          step={1}
        /> */}
        <RangeSlider
          title="mins"
          value={breakminutes}
          min={0}
          max={60}
          step={5}
          onChange={(value) => setCustomValue("breakminutes", value)}
        />
      </div>

      <div
        className="
        items-center
        justify-between"
      >
        <Heading title="# of Sessions" />
        <RangeSlider
          title="sessions"
          value={sessions}
          onChange={(value) => setCustomValue("sessions", value)}
          min={1}
          max={10}
          step={1}
        />
      </div>
      <div
        className="
          items-center
          justify-between
          text-left
          text-lg 
          font-semibold"
      >
        {/* <Heading title="Total Time" /> */}
        <div className="text-4xl font-extrabold">Total Time</div>
        <div className="font-bold text-2xl text-[#4E7563]">{timeFormat}</div>
      </div>
    </div>
  );
  const titleContent = (
    <div className="flex justify-align items-center">
      <AdjustmentsHorizontalIcon className="h-8 w-8 stroke-width-1.5 stroke-[#000] fill-none" />
      Pomodoro Settings
    </div>
  );
  return (
    <Modal
      //   disabled={isLoading}
      isOpen={settingsModal.isOpen}
      title={titleContent}
      actionLabel="Continue"
      secondaryActionLabel="Reset"
      onClose={settingsModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      //   footer={footerContent}
    />
  );
};

export default SettingsModal;
