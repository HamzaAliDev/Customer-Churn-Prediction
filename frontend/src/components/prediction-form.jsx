"use client";

import { useState } from "react";
import { AlertIcon, CheckIcon } from "@/components/icons";

const initialForm = {
  gender: "male",
  seniorCitizen: "0",
  partner: "1",
  dependents: "0",
  phoneService: "1",
  multipleLines: "0",
  internetService: "fiber_optic",
  tenure: "12",
  monthlyCharges: "79.9",
  totalCharges: "950.4",
  paperlessBilling: "1",
  paymentMethod: "electronic_check",
  contract: "month_to_month",
};

const binaryOptions = {
  yesNo: [
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ],
  gender: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ],
  internetService: [
    { label: "Fiber Optic", value: "fiber_optic" },
    { label: "DSL", value: "dsl" },
    { label: "None", value: "none" },
  ],
  paymentMethod: [
    { label: "Electronic Check", value: "electronic_check" },
    { label: "Other", value: "other" },
  ],
  contract: [
    { label: "Month-to-Month", value: "month_to_month" },
    { label: "One Year", value: "one_year" },
    { label: "Two Year", value: "two_year" },
  ],
};

function formatNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed.toFixed(2) : "0.00";
}

function Card({ title, description, children }) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(2,8,23,0.28)] backdrop-blur">
      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function FieldLabel({ title, description }) {
  return (
    <div>
      <p className="text-sm font-medium text-white">{title}</p>
      {description ? <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p> : null}
    </div>
  );
}

function ChoiceGroup({ label, description, name, value, onChange, options, columns = 2 }) {
  return (
    <div className="space-y-3">
      <FieldLabel title={label} description={description} />
      <div className={`grid gap-3 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                selected
                  ? "border-sky-400/60 bg-sky-400/15 text-white shadow-[0_0_0_1px_rgba(56,189,248,0.14)]"
                  : "border-white/10 bg-slate-950/35 text-slate-300 hover:border-white/20 hover:bg-slate-950/50"
              }`}
            >
              <span className="pr-3">{option.label}</span>
              <input
                className="sr-only"
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
              />
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  selected
                    ? "border-sky-300 bg-sky-300/20"
                    : "border-white/20 bg-white/5"
                }`}
                aria-hidden="true"
              >
                {selected ? <span className="h-2 w-2 rounded-full bg-sky-300" /> : null}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ToggleGroup({ label, description, name, value, onChange }) {
  return (
    <ChoiceGroup
      label={label}
      description={description}
      name={name}
      value={value}
      onChange={onChange}
      options={binaryOptions.yesNo}
      columns={2}
    />
  );
}

function TextNumberField({ label, description, value, onChange, min = 0, step = "any" }) {
  return (
    <div className="space-y-3">
      <FieldLabel title={label} description={description} />
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15"
      />
    </div>
  );
}

function SliderField({ label, description, value, onChange, min = 0, max = 72 }) {
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <FieldLabel title={label} description={description} />
        <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-sm font-medium text-sky-100">
          {value} months
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-sky-400"
      />
      <input
        type="number"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15"
      />
    </div>
  );
}

function ResultCard({ result }) {
  const isHighRisk = result.churnPrediction === 1;
  const toneClasses = isHighRisk
    ? "border-orange-300/30 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(15,23,42,0.82))] text-orange-50"
    : "border-emerald-300/30 bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(15,23,42,0.82))] text-emerald-50";

  return (
    <div className={`animate-fade-up overflow-hidden rounded-[1.75rem] border p-6 shadow-[0_24px_80px_rgba(2,8,23,0.28)] ${toneClasses}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              isHighRisk ? "bg-orange-500/15 text-orange-100" : "bg-emerald-500/15 text-emerald-100"
            }`}
          >
            {isHighRisk ? <AlertIcon className="h-6 w-6" /> : <CheckIcon className="h-6 w-6" />}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              {isHighRisk ? "High Risk" : "Low Risk"}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {isHighRisk ? "High Churn Risk" : "No Churn Risk"}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
              {isHighRisk
                ? "This customer is at risk of churning. Consider taking retention action."
                : "This customer is likely to stay. Retention risk is low."}
            </p>
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] ${
            isHighRisk
              ? "border-orange-200/30 bg-orange-500/15 text-orange-100"
              : "border-emerald-200/30 bg-emerald-500/15 text-emerald-100"
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
          {isHighRisk ? "High Risk" : "Low Risk"}
        </div>
      </div>
    </div>
  );
}

export function PredictionForm() {
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const payload = {
      SeniorCitizen: Number(form.seniorCitizen),
      tenure: Number(form.tenure),
      MonthlyCharges: Number(form.monthlyCharges),
      TotalCharges: Number(form.totalCharges),
      gender_Male: form.gender === "male" ? 1 : 0,
      Partner_Yes: Number(form.partner),
      Dependents_Yes: Number(form.dependents),
      PhoneService_Yes: Number(form.phoneService),
      MultipleLines_Yes: Number(form.multipleLines),
      InternetService_Fiber_optic: form.internetService === "fiber_optic" ? 1 : 0,
      Contract_One_year: form.contract === "one_year" ? 1 : 0,
      Contract_Two_year: form.contract === "two_year" ? 1 : 0,
      PaperlessBilling_Yes: Number(form.paperlessBilling),
      PaymentMethod_Electronic_check: form.paymentMethod === "electronic_check" ? 1 : 0,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Prediction request failed (${response.status})`);
      }

      const data = await response.json();

      if (data.churn_prediction !== 0 && data.churn_prediction !== 1) {
        throw new Error("Unexpected prediction response");
      }

      setResult({ churnPrediction: data.churn_prediction });
    } catch (submissionError) {
      setResult(null);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to reach the prediction service."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <Card
          title="Customer Profile"
          description="Capture who the customer is and the core household context."
        >
          <div className="space-y-6">
            <ChoiceGroup
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={(value) => updateField("gender", value)}
              options={binaryOptions.gender}
              columns={2}
            />
            <ToggleGroup
              label="Senior Citizen"
              name="seniorCitizen"
              value={form.seniorCitizen}
              onChange={(value) => updateField("seniorCitizen", value)}
            />
            <ToggleGroup
              label="Partner"
              name="partner"
              value={form.partner}
              onChange={(value) => updateField("partner", value)}
            />
            <ToggleGroup
              label="Dependents"
              name="dependents"
              value={form.dependents}
              onChange={(value) => updateField("dependents", value)}
            />
          </div>
        </Card>

        <Card
          title="Service Details"
          description="Review the services the customer currently uses."
        >
          <div className="space-y-6">
            <ToggleGroup
              label="Phone Service"
              name="phoneService"
              value={form.phoneService}
              onChange={(value) => updateField("phoneService", value)}
            />
            <ToggleGroup
              label="Multiple Lines"
              name="multipleLines"
              value={form.multipleLines}
              onChange={(value) => updateField("multipleLines", value)}
            />
            <ChoiceGroup
              label="Internet Service"
              name="internetService"
              value={form.internetService}
              onChange={(value) => updateField("internetService", value)}
              options={binaryOptions.internetService}
              columns={3}
            />
          </div>
        </Card>

        <Card
          title="Account Information"
          description="Use billing and tenure data to understand account maturity."
        >
          <div className="space-y-6">
            <SliderField
              label="Tenure"
              description="Number of months the customer has been active."
              value={form.tenure}
              onChange={(value) => updateField("tenure", value)}
            />
            <TextNumberField
              label="Monthly Charges ($)"
              description="Current recurring bill amount."
              value={form.monthlyCharges}
              onChange={(value) => updateField("monthlyCharges", value)}
              min={0}
              step="0.01"
            />
            <TextNumberField
              label="Total Charges ($)"
              description={`Lifetime billed amount. Current value: $${formatNumber(form.totalCharges)}`}
              value={form.totalCharges}
              onChange={(value) => updateField("totalCharges", value)}
              min={0}
              step="0.01"
            />
            <ToggleGroup
              label="Paperless Billing"
              name="paperlessBilling"
              value={form.paperlessBilling}
              onChange={(value) => updateField("paperlessBilling", value)}
            />
          </div>
        </Card>

        <Card
          title="Contract Type"
          description="Understand the commercial agreement tied to the account."
        >
          <div className="space-y-6">
            <ChoiceGroup
              label="Payment Method"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={(value) => updateField("paymentMethod", value)}
              options={binaryOptions.paymentMethod}
              columns={2}
            />
            <ChoiceGroup
              label="Contract"
              name="contract"
              value={form.contract}
              onChange={(value) => updateField("contract", value)}
              options={binaryOptions.contract}
              columns={3}
            />
          </div>
        </Card>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-sky-400 px-6 py-4 text-base font-semibold text-slate-950 shadow-[0_18px_60px_rgba(37,99,235,0.32)] transition hover:-translate-y-0.5 hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-r-slate-950" />
        ) : null}
        {isLoading ? "Predicting..." : "Predict Churn Risk"}
      </button>

      {error ? (
        <p className="rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      {result ? <ResultCard result={result} /> : null}
    </form>
  );
}