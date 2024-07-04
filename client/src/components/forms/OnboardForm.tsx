"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Typography } from "../ui/typography";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { onboardFormDataType, useOnboardingStore } from "@/stores/onboarding-store";
import { onboardSchema } from "@/lib/zod-validation/onboard-schema";
import { sectionsPlaceholders, taskPlaceholders } from "@/data/onboard";
import { onboardUser } from "@/app/actions/onboard";

export default function OnboardForm({ step }: { step: number }) {
  const { formData, setFormData } = useOnboardingStore();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(onboardSchema),
    mode: "onTouched",
  });

  const router = useRouter();

  const handleNext = (data: any) => {
    setFormData(data);
    router.push(`/onboarding?step=${step + 1}`);
  };

  const handleFinalSubmit = async (data: onboardFormDataType) => {
    const finalData = { ...formData, ...data };
    setFormData(finalData);
    const res = await onboardUser(finalData);
  };

  const onSubmit = (data: any) => {
    const tasksWithDefaults = taskPlaceholders.map((placeholder, index) =>
      data.tasks && data.tasks[index] ? data.tasks[index] : placeholder
    );
    if (step === 3) {
      data.sections = sectionsPlaceholders.map((placeholder, index) =>
        data.sections && data.sections[index]
          ? data.sections[index]
          : placeholder
      );
    }
    const finalData = {
      ...data,
      tasks: tasksWithDefaults,
    };

    if (step < 3) {
      handleNext(finalData); // Move to next step if not the last step
    } else {
      if (formData.project === "") {
        router.push(`/onboarding?step=1`);
        return;
      }
      handleFinalSubmit(finalData); // Handle final form submission
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {step === 1 && (
        <div className="grid gap-2">
          <Typography variant="large">What is your project about?</Typography>
          <Controller
            name="project"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <>
                <Input {...field} placeholder="Enter your project name" />
                {error && <span className="text-red-500">{error.message}</span>}
              </>
            )}
          />
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-2">
          <Typography variant="large">
            What are a few tasks that you have to do for {formData.project || "Your project"}?
          </Typography>
          {taskPlaceholders.map((placeholder, index) => (
            <Controller
              key={index}
              name={`tasks.${index}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder={placeholder} />
              )}
            />
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-2">
          <Typography variant="large">
            How would you group your tasks for{" "}
            {formData.project || "your project"}?
          </Typography>
          {sectionsPlaceholders.map((placeholder, index) => (
            <Controller
              key={index}
              name={`sections.${index}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder={placeholder} />
              )}
            />
          ))}
        </div>
      )}

      <Button type="submit">Continue</Button>
    </form>
  );
}
