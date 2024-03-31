"use client";

import { TextGenerateEffect } from "@/components/ui/animations/text-generate-effect";
import { Heading } from "@/components/ui/typography";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { Projector } from "lucide-react";
import React from "react";

type PreviewProps = {
  step: number;
};

export default function Preview({ step }: PreviewProps) {
  const { formData } = useOnboardingStore();
  return (
    <div className="">
      <div className="h-10 w-full bg-gray-100">Preview</div>

      <div className="space-y-4 px-10 py-6">
        <div>
          <TextGenerateEffect words={formData.project} />
        </div>
        {formData.tasks.length > 0 && (
          <div>
            <Heading className="py-2" variant="h3">Tasks</Heading>
            {formData.tasks.map((task, idx) => (
              <TextGenerateEffect
                className="text-xl"
                key={task + idx}
                words={task}
              />
            ))}
          </div>
        )}
        {formData.sections.length > 0 && (
          <div>
            <Heading className="py-2" variant="h3">Sections</Heading>
            {formData.sections.map((section, idx) => (
              <TextGenerateEffect
                className="text-xl"
                key={section + idx}
                words={section}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
