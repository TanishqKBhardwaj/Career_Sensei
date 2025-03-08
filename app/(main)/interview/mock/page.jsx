"use client";
import Navbar from "@/app/components/Navbar";
import React, { useEffect, useState } from "react";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Loader2, MoveLeft } from "lucide-react";
import Quiz from "../components/Quiz";
import { generateQuiz } from "../../../../actions/interview";
import useFetch from "../../../../hooks/use-fetch";

function Page() {
  const [quiz, setQuiz] = useState([]);
  const { loading: updateLoading, fn: generateQuizFn, data } = useFetch(generateQuiz);

  useEffect(() => {
    (async () => {
      const { isOnBoarded } = await getUserOnboardingStatus();
      if (!isOnBoarded) {
        console.log(isOnBoarded);
        redirect("/onboarding");
      }
      generateQuizFn();
    })();
  }, []);

  useEffect(() => {
    if (data) {
      setQuiz(data);
      console.log(data);
    }
  }, [data, updateLoading]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 md:mt-20 space-y-5">
        <Link href={"/interview"}>
          <div className="flex gap-1">
            <MoveLeft />
            <span>
              Back to <span className="text-purple-500">interview</span>
            </span>
          </div>
        </Link>

        <h1 className="text-center text-3xl md:text-5xl font-bold">
          Mock<span className="text-purple-500"> Interview</span>
        </h1>

        {updateLoading ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : (
          <Quiz quiz={quiz} />
        )}
      </div>
    </div>
  );
}

export default Page;
