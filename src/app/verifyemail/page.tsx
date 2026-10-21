"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmailContent = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [verified, setVerifyed] = useState(false);
  const searchParams = useSearchParams();
  const verifyEmail = async () => {
    const urlToken = searchParams.get("token");

    if (!urlToken) {
      setError(true);
      toast.error("Verifcation token is missing");
      return;
    }
    setToken(urlToken);
    setVerifyed(true);
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token: urlToken,
      });
      if (response.data.flag) {
        setLoading(true);
        setVerifyed(true);
        setError(false);
        toast.success("Verify Successfull");
        return;
      }
    } catch (error) {
      setError(true);
      const message = error instanceof Error ? error.message : String(error);
      return message;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Verify Email With Token</CardTitle>

            <CardDescription>{token ? token : "No token"}</CardDescription>

            {verified && (
              <CardAction>
                <Link href="/login">Login</Link>
              </CardAction>
            )}

            {error && (
              <CardAction>
                <p>Verification failed. Please try again.</p>
              </CardAction>
            )}
          </CardHeader>

          <CardContent>
            {verified
              ? "Your email has been verified."
              : "Click below to verify your email."}

            {!verified && (
              <button type="button" onClick={verifyEmail} disabled={loading}>
                {loading ? "Verifying..." : "Verify Email"}
              </button>
            )}
          </CardContent>

          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default function VerifyEmailpage() {
  return (
    <Suspense fallback={<p>Loading verification page...</p>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
