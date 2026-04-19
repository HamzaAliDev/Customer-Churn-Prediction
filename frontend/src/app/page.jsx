import Link from "next/link";
import {
  ArrowRightIcon,
  BoltIcon,
  ChartIcon,
  CheckShieldIcon,
  SparkIcon,
} from "@/components/icons";

const features = [
  {
    icon: SparkIcon,
    title: "Smart Analysis",
    description:
      "Input customer data and get instant churn risk predictions powered by ML",
  },
  {
    icon: BoltIcon,
    title: "Real-Time Results",
    description:
      "Get predictions in milliseconds with our FastAPI-powered backend",
  },
  {
    icon: ChartIcon,
    title: "Actionable Insights",
    description:
      "Understand churn risk and take proactive retention steps",
  },
];

const steps = [
  "Fill in the customer profile form",
  "Submit data to our ML model",
  "View churn risk prediction instantly",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-136 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.28),transparent_48%),linear-gradient(180deg,rgba(15,23,42,0.9),rgba(7,17,31,0))]" />
        <div className="animate-drift absolute left-1/2 top-0 h-96 w-208 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(59,130,246,0.3),rgba(14,165,233,0.08),rgba(96,165,250,0.24))] blur-3xl" />
        <svg
          className="absolute left-1/2 top-24 w-[110%] -translate-x-1/2 opacity-20"
          viewBox="0 0 1440 320"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 160C120 24 240 24 360 160C480 296 600 296 720 160C840 24 960 24 1080 160C1200 296 1320 296 1440 160"
            stroke="rgba(96,165,250,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M0 208C120 72 240 72 360 208C480 344 600 344 720 208C840 72 960 72 1080 208C1200 344 1320 344 1440 208"
            stroke="rgba(14,165,233,0.45)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-12 pt-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 shadow-[0_18px_60px_rgba(2,8,23,0.24)] backdrop-blur">
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] text-sky-200 uppercase">
              ChurnSense
            </p>
            <p className="text-xs text-slate-400">Customer retention intelligence</p>
          </div>
          <Link
            href="/predict"
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-100 transition hover:border-sky-300/60 hover:bg-sky-400/20"
          >
            Predict now <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.12fr_0.88fr] lg:py-20">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              <CheckShieldIcon className="h-4 w-4 text-sky-300" />
              ML-powered churn prediction for customer success teams
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Predict Customer Churn Before It Happens
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Leverage machine learning to identify at-risk customers and take
                action before they leave.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/predict"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-400 px-6 py-3.5 text-base font-semibold text-slate-950 shadow-[0_18px_60px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-sky-300"
              >
                Start Prediction <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <p className="text-sm text-slate-400">
                Immediate results, and retention-focused
                insights.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-4xl bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_54%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(2,8,23,0.4)] backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-slate-400">Live prediction panel</p>
                  <p className="text-xl font-semibold text-white">Customer risk snapshot</p>
                </div>
                <div className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
                  Ready
                </div>
              </div>

              <div className="grid gap-4 pt-6">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-400">Model status</p>
                  <div className="mt-3 flex items-end justify-between">
                    <span className="text-3xl font-semibold text-white">FastAPI</span>
                    <span className="text-sm font-medium text-emerald-300">Online</span>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ["72ms", "Average inference"],
                    ["99.1%", "Payload coverage"],
                    ["3 steps", "Retain action plan"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
                    >
                      <div className="text-2xl font-semibold text-white">{value}</div>
                      <p className="mt-2 text-sm text-slate-400">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-sky-400/20 bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(15,23,42,0.4))] p-5">
                  <p className="text-sm text-sky-100/80">Retention focus</p>
                  <p className="mt-2 text-lg font-medium text-white">
                    Spot churn early and prioritize the accounts that matter most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300/80">
                Features
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                Built for fast customer risk analysis
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(2,8,23,0.24)] backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/25 hover:bg-white/7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-200 ring-1 ring-sky-400/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 py-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300/80">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Three steps from profile to prediction
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step}
                className="rounded-3xl border border-white/10 bg-slate-950/30 p-6 shadow-[0_18px_50px_rgba(2,8,23,0.22)]"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200/70">
                  Step {index + 1}
                </div>
                <p className="mt-4 text-lg leading-8 text-white">{step}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium text-slate-200">ChurnSense</span>
          <span>Predict churn early. Retain customers with confidence.</span>
        </footer>
      </div>
    </main>
  );
}