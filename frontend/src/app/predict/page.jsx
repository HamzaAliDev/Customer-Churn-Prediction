import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { PredictionForm } from "@/components/prediction-form";

export default function Page() {
  return (
    <main className="min-h-screen px-6 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-300/80">
            Prediction workspace
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Customer Churn Predictor
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Fill in the customer details below to predict churn likelihood.
          </p>
        </div>

        <div className="mt-10">
          <PredictionForm />
        </div>
      </div>
    </main>
  );
}