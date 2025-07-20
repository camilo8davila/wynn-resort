import { Metadata } from "next";

import { GridAuth, Title } from "@/components";
import { OtpForm } from "../ui/OtpForm";

export const metadata: Metadata = {
  title: "Register 2/3",
  description: "Luxury hotel in Dubai",
};

export default function OtpVerificationPage() {
  return (
    <GridAuth>
      <div className="w-full justify-between block sm:flex ">
        <Title title="Registration" subtitle="Please enter below information to create your account." className="mb-8 sm:mb-10" />

        <p className="text-2xl font-caslo text-center mb-8 sm:mb-0">Step 2 of 3</p>
      </div>

      <OtpForm />
    </GridAuth>
  );
}