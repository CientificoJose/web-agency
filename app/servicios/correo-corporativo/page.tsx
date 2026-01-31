"use client"

import { Mail, Shield, TrendingDown, Check, X, ArrowRight, Clock, Settings, Rocket, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import {
  ComparisonTable,
  FAQSection,
  HeroSection,
  OnboardingTimeline,
  PricingCards,
  ValuePropositions,
  AntiSpamTerms,
  FinalCTA,
} from "@/components/email-hosting/sections"

export default function EmailHostingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />
      <ValuePropositions />
      <ComparisonTable />
      <PricingCards />
      <OnboardingTimeline />
      <FAQSection />
      <AntiSpamTerms />
      <FinalCTA />
    </div>
  )
}
