"use client"

import { useCallback, useMemo, useState } from "react"

const formatCurrency = (value: number) => value.toFixed(2)

export default function ZinliCalculatorPage() {
  const [initialUsdt, setInitialUsdt] = useState(5000)
  const [sellRate, setSellRate] = useState(1.002)
  const [buyRate, setBuyRate] = useState(0.981)
  const [feeType, setFeeType] = useState<"fixed" | "percentage">("percentage")
  const [feeAdjustment, setFeeAdjustment] = useState(0.5)

  const {
    zinliAmount,
    finalUsdtGross,
    actualFeeAmount,
    netProfit,
    roi,
  } = useMemo(() => {
    const zinli = +(initialUsdt * sellRate).toFixed(4)
    const gross = buyRate > 0 ? +(zinli / buyRate).toFixed(4) : 0
    const fee = feeType === "percentage" ? +(initialUsdt * (feeAdjustment / 100)).toFixed(4) : +feeAdjustment.toFixed(4)
    const net = +(gross - initialUsdt - fee).toFixed(4)
    const roiCalc = initialUsdt > 0 ? +(((net) / initialUsdt) * 100).toFixed(4) : 0

    return {
      zinliAmount: zinli,
      finalUsdtGross: gross,
      actualFeeAmount: fee,
      netProfit: net,
      roi: roiCalc,
    }
  }, [initialUsdt, sellRate, buyRate, feeAdjustment, feeType])

  const handleRadioChange = useCallback((value: "fixed" | "percentage") => {
    setFeeType(value)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-10 px-4 md:px-6 text-white">
      <div className="mx-auto w-full max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8 shadow-[0_10px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <header className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">Arbitraje P2P</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Calculadora USDT ↔︎ Zinli</h1>
          <p className="text-sm text-white/60">Proyecta ganancias, ROI y ajustes de comisión en cada ciclo.</p>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
          <InputField
            label="Monto inicial (USDT)"
            type="number"
            value={initialUsdt}
            min={1}
            step={100}
            onChange={(value) => setInitialUsdt(value)}
          />
          <InputField
            label="Tasa 1: Vendes USDT por ZINLI (ZINLI/USDT)"
            suffix="ZINLI"
            type="number"
            value={sellRate}
            min={0.001}
            step={0.0001}
            onChange={(value) => setSellRate(value)}
          />
          <InputField
            label="Tasa 2: Compras USDT con ZINLI (ZINLI/USDT)"
            helper="Buscas Tasa 1 alta y Tasa 2 baja para ganar."
            suffix="ZINLI"
            type="number"
            value={buyRate}
            min={0.001}
            step={0.0001}
            onChange={(value) => setBuyRate(value)}
          />

          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
            <p className="text-sm font-medium text-white/90 mb-3">Comisión / ajuste aplicado al ciclo</p>
            <div className="flex rounded-xl bg-white/10 p-1 text-sm font-medium text-white/70 mb-3">
              <label className={`flex-1 cursor-pointer rounded-lg px-3 py-1 text-center transition ${feeType === "fixed" ? "bg-primary text-white" : "text-white/70"}`}>
                <input type="radio" className="hidden" checked={feeType === "fixed"} onChange={() => handleRadioChange("fixed")} />
                Monto fijo (USDT)
              </label>
              <label className={`flex-1 cursor-pointer rounded-lg px-3 py-1 text-center transition ${feeType === "percentage" ? "bg-primary text-white" : "text-white/70"}`}>
                <input type="radio" className="hidden" checked={feeType === "percentage"} onChange={() => handleRadioChange("percentage")} />
                Porcentaje (%)
              </label>
            </div>
            <InputField
              label={feeType === "percentage" ? "Porcentaje" : "Monto fijo"}
              type="number"
              value={feeAdjustment}
              min={0}
              step={feeType === "percentage" ? 0.01 : 0.1}
              suffix={feeType === "percentage" ? "%" : "USDT"}
              onChange={(value) => setFeeAdjustment(value)}
            />
            <p className="mt-2 text-xs font-medium text-primary">
              Ajuste calculado: {formatCurrency(actualFeeAmount)} USDT ({feeType === "percentage" ? `${feeAdjustment}% del capital inicial` : "monto fijo"}).
            </p>
          </div>
        </section>

        <section className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
          <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-3">Resultados del ciclo</h2>
          <ResultRow label="Total ZINLI (Paso 1)" value={`${formatCurrency(zinliAmount)} ZINLI`} />
          <ResultRow label="USDT final (bruto)" value={`${formatCurrency(finalUsdtGross)} USDT`} />
          <ResultRow label="Ajuste aplicado" value={`-${formatCurrency(actualFeeAmount)} USDT`} valueClass="text-red-400" />

          <div className={`rounded-2xl border p-4 ${netProfit >= 0 ? "border-emerald-500/30 bg-emerald-500/10" : "border-red-500/30 bg-red-500/10"}`}>
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-white/90">Ganancia neta (final)</p>
              <span className={`text-2xl font-bold ${netProfit >= 0 ? "text-emerald-300" : "text-red-300"}`}>{formatCurrency(netProfit)} USDT</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-base font-semibold text-white/80">ROI</p>
            <span className={`text-xl font-bold ${roi >= 0 ? "text-emerald-300" : "text-red-300"}`}>{formatCurrency(roi)}%</span>
          </div>
        </section>

        <footer className="mt-8 text-center text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Calculadora P2P — Las tasas pueden variar rápidamente.</p>
        </footer>
      </div>
    </div>
  )
}

type InputFieldProps = {
  label: string
  type: string
  value: number
  min?: number
  step?: number
  suffix?: string
  helper?: string
  onChange: (value: number) => void
}

function InputField({ label, type, value, min, step, suffix, helper, onChange }: InputFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-white/80">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          min={min}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-12 text-sm text-white transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {suffix ? <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50">{suffix}</span> : null}
      </div>
      {helper ? <p className="mt-1 text-xs text-white/50">{helper}</p> : null}
    </div>
  )
}

type ResultRowProps = {
  label: string
  value: string
  valueClass?: string
}

function ResultRow({ label, value, valueClass }: ResultRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
      <span className="text-white/60">{label}</span>
      <span className={`font-semibold text-white ${valueClass ?? ""}`}>{value}</span>
    </div>
  )
}
