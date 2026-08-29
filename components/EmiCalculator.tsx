"use client";

import { useMemo, useState } from "react";

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(4500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, interest, total } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const n = years * 12;
    const factor = Math.pow(1 + monthlyRate, n);
    const emiValue = (principal * monthlyRate * factor) / (factor - 1);
    const totalValue = emiValue * n;
    return {
      emi: emiValue,
      total: totalValue,
      interest: totalValue - principal,
    };
  }, [principal, rate, years]);

  return (
    <div id="emi" className="grid gap-10 border border-ink/10 bg-white/40 p-6 md:grid-cols-2 md:p-10">
      <div className="space-y-8">
        <Field
          label="Loan amount"
          value={`${formatInr(principal)}`}
          min={500000}
          max={15000000}
          step={50000}
          input={principal}
          onChange={setPrincipal}
        />
        <Field
          label="Interest rate"
          value={`${rate.toFixed(1)}%`}
          min={6}
          max={14}
          step={0.1}
          input={rate}
          onChange={setRate}
        />
        <Field
          label="Tenure"
          value={`${years} years`}
          min={5}
          max={30}
          step={1}
          input={years}
          onChange={setYears}
        />
      </div>
      <div className="flex flex-col justify-between bg-accent px-8 py-10 text-on-accent">
        <p className="text-[11px] tracking-[0.22em] uppercase text-on-accent/60">Estimated EMI</p>
        <p className="font-serif text-5xl md:text-6xl">{formatInr(emi)}</p>
        <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-on-accent/55">Principal</p>
            <p className="mt-1">{formatInr(principal)}</p>
          </div>
          <div>
            <p className="text-on-accent/55">Interest</p>
            <p className="mt-1">{formatInr(interest)}</p>
          </div>
          <div className="col-span-2">
            <p className="text-on-accent/55">Total payable</p>
            <p className="mt-1">{formatInr(total)}</p>
          </div>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-on-accent/50">
          Indicative only. Actual EMI depends on the lender, your eligibility and processing fees.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  min,
  max,
  step,
  input,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  input: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-muted">
        {label}
        <span className="text-ink">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={input}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-ink"
      />
    </label>
  );
}
