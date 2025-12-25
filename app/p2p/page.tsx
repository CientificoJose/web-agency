"use client"

import { type ReactNode, useCallback, useMemo, useState } from "react"

type FeeType = "fixed" | "percentage"

type TabId = "zinli" | "bs"

type CycleResult = {
  intermediateAmount: number
  finalUsdtGross: number
  finalUsdtNet: number
  feeAmount: number
  netProfit: number
  roi: number
  breakEvenBuyRate: number
}

const DEFAULT_CYCLES_PER_DAY_OPTIONS = [1, 2, 3, 5, 10, 15, 20] as const

const roundTo = (value: number, decimals: number) => {
  const factor = 10 ** decimals
  return Math.round((Number.isFinite(value) ? value : 0) * factor) / factor
}

const formatCurrency = (value: number) => (Number.isFinite(value) ? value : 0).toFixed(2)

const formatRate = (value: number) => (Number.isFinite(value) ? value : 0).toFixed(4)

function calculateCycle(params: {
  initialUsdt: number
  sellRate: number
  buyRate: number
  feeType: FeeType
  feeAdjustment: number
  applyFeeBothLegs: boolean
}): CycleResult {
  const { initialUsdt, sellRate, buyRate, feeType, feeAdjustment, applyFeeBothLegs } = params

  const safeInitial = Number.isFinite(initialUsdt) ? initialUsdt : 0
  const safeSell = Number.isFinite(sellRate) ? sellRate : 0
  const safeBuy = Number.isFinite(buyRate) ? buyRate : 0

  if (feeType === "percentage") {
    const feeFraction = feeAdjustment / 100

    const effectiveSellMultiplier = applyFeeBothLegs ? 1 - feeFraction : 1
    const intermediateAmount = roundTo(safeInitial * safeSell * effectiveSellMultiplier, 4)

    const finalUsdtGross = safeBuy > 0 ? roundTo(intermediateAmount / safeBuy, 4) : 0
    const finalUsdtNet = applyFeeBothLegs ? roundTo(finalUsdtGross * (1 - feeFraction), 4) : finalUsdtGross

    const feeAmount = applyFeeBothLegs
      ? roundTo(safeInitial * feeFraction + finalUsdtGross * feeFraction, 4)
      : roundTo(safeInitial * feeFraction, 4)

    const netProfit = roundTo(finalUsdtNet - safeInitial, 4)
    const roi = safeInitial > 0 ? roundTo(((finalUsdtNet / safeInitial) - 1) * 100, 4) : 0

    const breakEvenBuyRate = applyFeeBothLegs
      ? roundTo(safeSell * (1 - feeFraction) * (1 - feeFraction), 6)
      : roundTo(safeSell * (1 - feeFraction), 6)

    return {
      intermediateAmount,
      finalUsdtGross,
      finalUsdtNet,
      feeAmount,
      netProfit,
      roi,
      breakEvenBuyRate,
    }
  }

  const fixedFee = roundTo(feeAdjustment, 4)
  const feeAmount = applyFeeBothLegs ? roundTo(fixedFee * 2, 4) : fixedFee

  const initialAfterFee = applyFeeBothLegs ? safeInitial - fixedFee : safeInitial
  const intermediateAmount = roundTo(initialAfterFee * safeSell, 4)
  const finalUsdtGross = safeBuy > 0 ? roundTo(intermediateAmount / safeBuy, 4) : 0
  const finalUsdtNet = applyFeeBothLegs ? roundTo(finalUsdtGross - fixedFee, 4) : roundTo(finalUsdtGross - fixedFee, 4)

  const netProfit = roundTo(finalUsdtNet - safeInitial, 4)
  const roi = safeInitial > 0 ? roundTo((netProfit / safeInitial) * 100, 4) : 0

  const breakEvenBuyRate = safeInitial > 0 && safeSell > 0
    ? roundTo((initialAfterFee * safeSell) / Math.max(0.0000001, safeInitial + fixedFee), 6)
    : 0

  return {
    intermediateAmount,
    finalUsdtGross,
    finalUsdtNet,
    feeAmount,
    netProfit,
    roi,
    breakEvenBuyRate,
  }
}

export default function P2PCalculatorPage() {
  const [activeTab, setActiveTab] = useState<TabId>("zinli")

  const [initialUsdt, setInitialUsdt] = useState(5000)

  const [feeType, setFeeType] = useState<FeeType>("percentage")
  const [feeAdjustment, setFeeAdjustment] = useState(0.33)

  const [applyFeeBothLegs, setApplyFeeBothLegs] = useState(true)

  const [cyclesPerDay, setCyclesPerDay] = useState<number>(1)

  const [sellRateZinli, setSellRateZinli] = useState(1.002)
  const [buyRateZinli, setBuyRateZinli] = useState(0.981)

  const [sellRateBs, setSellRateBs] = useState(478.08)
  const [buyRateBs, setBuyRateBs] = useState(455)

  const handleFeeTypeChange = useCallback((value: FeeType) => {
    setFeeType(value)
  }, [])

  const currentRates = useMemo(() => {
    if (activeTab === "zinli") {
      return {
        sellRate: sellRateZinli,
        buyRate: buyRateZinli,
        sellLabel: "Tasa 1: Vendes USDT por Zinli (Zinli/USDT)",
        buyLabel: "Tasa 2: Compras USDT con Zinli (Zinli/USDT)",
        suffix: "ZINLI",
        intermediateLabel: "Total Zinli (Paso 1)",
      }
    }

    return {
      sellRate: sellRateBs,
      buyRate: buyRateBs,
      sellLabel: "Tasa 1: Vendes USDT por Bs (Bs/USDT)",
      buyLabel: "Tasa 2: Compras USDT con Bs (Bs/USDT)",
      suffix: "Bs",
      intermediateLabel: "Total Bs (Paso 1)",
    }
  }, [activeTab, buyRateBs, buyRateZinli, sellRateBs, sellRateZinli])

  const cycle = useMemo(() => {
    return calculateCycle({
      initialUsdt,
      sellRate: currentRates.sellRate,
      buyRate: currentRates.buyRate,
      feeType,
      feeAdjustment,
      applyFeeBothLegs,
    })
  }, [applyFeeBothLegs, currentRates.buyRate, currentRates.sellRate, feeAdjustment, feeType, initialUsdt])

  const projection = useMemo(() => {
    const profitPerCycle = cycle.netProfit
    const profitPerDay = roundTo(profitPerCycle * cyclesPerDay, 4)
    const profitPerMonth = roundTo(profitPerDay * 30, 4)

    return {
      profitPerCycle,
      profitPerDay,
      profitPerMonth,
    }
  }, [cycle.netProfit, cyclesPerDay])

  const feeText = useMemo(() => {
    const legText = applyFeeBothLegs ? "ida + vuelta" : "solo ida"

    if (feeType === "percentage") {
      return `${feeAdjustment}% (${legText})`
    }

    return `monto fijo (${legText})`
  }, [applyFeeBothLegs, feeAdjustment, feeType])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-10 px-4 md:px-6 text-white">
      <div className="mx-auto w-full max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8 shadow-[0_10px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <header className="mb-8 md:mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-primary/80">Arbitraje P2P</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Calculadora de Operativa</h1>
              <p className="text-sm text-white/60">Analiza un ciclo, proyecciones por día/mes y tasa de equilibrio.</p>
            </div>
            <div className="flex w-full flex-col gap-2 md:w-auto md:items-end">
              <div className="flex rounded-2xl border border-white/10 bg-black/20 p-1">
                <TabButton active={activeTab === "zinli"} onClick={() => setActiveTab("zinli")}>
                  USDT ↔︎ Zinli
                </TabButton>
                <TabButton active={activeTab === "bs"} onClick={() => setActiveTab("bs")}>
                  USDT ↔︎ Bs
                </TabButton>
              </div>
              <p className="text-xs text-white/50">Capital siempre en USDT. Comisión configurable (ida o ida + vuelta).</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 lg:col-span-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="Capital (USDT)"
                type="number"
                value={initialUsdt}
                min={1}
                step={50}
                suffix="USDT"
                onChange={(value) => setInitialUsdt(value)}
              />

              <SelectField
                label="Ciclos al día"
                value={cyclesPerDay}
                options={[...DEFAULT_CYCLES_PER_DAY_OPTIONS]}
                onChange={(value) => setCyclesPerDay(value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label={currentRates.sellLabel}
                type="number"
                value={currentRates.sellRate}
                min={0.0001}
                step={activeTab === "zinli" ? 0.0001 : 0.01}
                suffix={currentRates.suffix}
                onChange={(value) =>
                  activeTab === "zinli" ? setSellRateZinli(value) : setSellRateBs(value)
                }
              />

              <InputField
                label={currentRates.buyLabel}
                helper="Buscas Tasa 1 alta y Tasa 2 baja para ganar."
                type="number"
                value={currentRates.buyRate}
                min={0.0001}
                step={activeTab === "zinli" ? 0.0001 : 0.01}
                suffix={currentRates.suffix}
                onChange={(value) => (activeTab === "zinli" ? setBuyRateZinli(value) : setBuyRateBs(value))}
              />
            </div>

            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
              <p className="text-sm font-medium text-white/90 mb-3">Comisión / ajuste aplicado al ciclo</p>
              <label className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
                <span className="text-white/70">Aplicar comisión en ida + vuelta</span>
                <input
                  type="checkbox"
                  checked={applyFeeBothLegs}
                  onChange={(event) => setApplyFeeBothLegs(event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </label>
              <div className="flex rounded-xl bg-white/10 p-1 text-sm font-medium text-white/70 mb-3">
                <label
                  className={`flex-1 cursor-pointer rounded-lg px-3 py-1 text-center transition ${feeType === "fixed" ? "bg-primary text-white" : "text-white/70"}`}
                >
                  <input type="radio" className="hidden" checked={feeType === "fixed"} onChange={() => handleFeeTypeChange("fixed")} />
                  Monto fijo (USDT)
                </label>
                <label
                  className={`flex-1 cursor-pointer rounded-lg px-3 py-1 text-center transition ${feeType === "percentage" ? "bg-primary text-white" : "text-white/70"}`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    checked={feeType === "percentage"}
                    onChange={() => handleFeeTypeChange("percentage")}
                  />
                  Porcentaje (%)
                </label>
              </div>
              <InputField
                label={feeType === "percentage" ? "Comisión (%)" : "Ajuste (USDT)"}
                type="number"
                value={feeAdjustment}
                min={0}
                step={feeType === "percentage" ? 0.01 : 0.1}
                suffix={feeType === "percentage" ? "%" : "USDT"}
                onChange={(value) => setFeeAdjustment(value)}
              />
              <p className="mt-2 text-xs font-medium text-primary">
                Ajuste calculado: {formatCurrency(cycle.feeAmount)} USDT ({feeText}).
              </p>
            </div>
          </section>

          <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-3">Cálculo de operativa</h2>

            <div className="grid grid-cols-1 gap-3">
              <KpiCard title={currentRates.intermediateLabel} value={`${formatCurrency(cycle.intermediateAmount)} ${currentRates.suffix}`} />
              <KpiCard title={applyFeeBothLegs ? "USDT final (neto)" : "USDT final (bruto)"} value={`${formatCurrency(applyFeeBothLegs ? cycle.finalUsdtNet : cycle.finalUsdtGross)} USDT`} />
              <KpiCard title="Ganancia neta (por ciclo)" value={`${formatCurrency(projection.profitPerCycle)} USDT`} tone={projection.profitPerCycle >= 0 ? "success" : "danger"} />
              <KpiCard title="Ganancia diaria" value={`${formatCurrency(projection.profitPerDay)} USDT`} tone={projection.profitPerDay >= 0 ? "success" : "danger"} />
              <KpiCard title="Ganancia mensual (30 días)" value={`${formatCurrency(projection.profitPerMonth)} USDT`} tone={projection.profitPerMonth >= 0 ? "success" : "danger"} />
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 space-y-3">
              <ResultRow label="ROI (por ciclo)" value={`${formatCurrency(cycle.roi)}%`} valueClass={cycle.roi >= 0 ? "text-emerald-300" : "text-red-300"} />
              <ResultRow
                label="Tasa de equilibrio (Tasa 2)"
                value={`${formatRate(cycle.breakEvenBuyRate)} ${currentRates.suffix}/USDT`}
                valueClass="text-primary"
              />
              <p className="text-xs text-white/50">
                La tasa de equilibrio es el máximo valor de Tasa 2 para no perder (considerando comisión sobre capital inicial).
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-8 text-center text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} P2P — Las tasas pueden variar rápidamente.</p>
        </footer>
      </div>
    </div>
  )
}

type TabButtonProps = {
  active: boolean
  onClick: () => void
  children: ReactNode
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${active ? "bg-primary text-white" : "text-white/60 hover:text-white"}`}
    >
      {children}
    </button>
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
          value={Number.isFinite(value) ? value : 0}
          min={min}
          step={step}
          onChange={(event) => {
            const next = Number.parseFloat(event.target.value)
            onChange(Number.isFinite(next) ? next : 0)
          }}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-14 text-sm text-white transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {suffix ? <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50">{suffix}</span> : null}
      </div>
      {helper ? <p className="mt-1 text-xs text-white/50">{helper}</p> : null}
    </div>
  )
}

type SelectFieldProps = {
  label: string
  value: number
  options: readonly number[]
  onChange: (value: number) => void
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-white/80">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(Number.parseInt(event.target.value, 10))}
          className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-10 text-sm text-white transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-slate-950">
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50">▼</span>
      </div>
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

type Tone = "neutral" | "success" | "danger"

type KpiCardProps = {
  title: string
  value: string
  tone?: Tone
}

function KpiCard({ title, value, tone = "neutral" }: KpiCardProps) {
  const toneClasses =
    tone === "success"
      ? "border-emerald-500/30 bg-emerald-500/10"
      : tone === "danger"
        ? "border-red-500/30 bg-red-500/10"
        : "border-white/10 bg-black/20"

  const valueClasses = tone === "success" ? "text-emerald-300" : tone === "danger" ? "text-red-300" : "text-white"

  return (
    <div className={`rounded-2xl border p-4 ${toneClasses}`}>
      <p className="text-xs uppercase tracking-wide text-white/50">{title}</p>
      <p className={`mt-2 text-xl font-bold ${valueClasses}`}>{value}</p>
    </div>
  )
}
