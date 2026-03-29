import { SYMPTOM_FIX_RULES } from "./data";
import type { FormState, ResultsData, ResolutionState, SavedCase, SymptomFixRule } from "./types";

export function toggleItem(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function ruleMatchesForm(rule: SymptomFixRule, form: FormState): boolean {
  if (!form.visibleSymptoms.includes(rule.symptom)) return false;
  if (rule.deviceType !== "Both" && rule.deviceType !== form.deviceType) return false;
  if (rule.whenHappens && rule.whenHappens !== form.whenHappens) return false;
  if (rule.whenStarted && rule.whenStarted !== form.whenStarted) return false;
  if (rule.gpuInstalled && rule.gpuInstalled !== form.gpuInstalled) return false;
  return true;
}

export function getResultsForForm(form: FormState, cases: SavedCase[]): ResultsData {
  const recommendedFixes: string[] = [];
  const seenFixes = new Set<string>();
  SYMPTOM_FIX_RULES.filter((rule) => ruleMatchesForm(rule, form)).forEach((rule) => {
    rule.fixes.forEach((fix) => {
      if (!seenFixes.has(fix)) {
        seenFixes.add(fix);
        recommendedFixes.push(fix);
      }
    });
  });

  const recommendedSteps =
    recommendedFixes.length > 0
      ? recommendedFixes.slice(0, 5)
      : [
          "Select at least one symptom to generate targeted fixes.",
          "Start with power, cable seating, and BIOS-default checks.",
          "Gather event timing details (startup, idle, gaming, random) to refine diagnosis.",
          "Run one hardware isolation step at a time and document results.",
          "Escalate to advanced diagnostics if baseline checks do not change behavior."
        ];

  const similarCases = [...cases]
    .map((item) => {
      const overlapCount = item.rawForm.visibleSymptoms.filter((symptom) => form.visibleSymptoms.includes(symptom)).length;
      return { item, overlapCount };
    })
    .filter(({ overlapCount }) => overlapCount > 0 || form.visibleSymptoms.length === 0)
    .sort((a, b) => b.overlapCount - a.overlapCount || b.item.id - a.item.id)
    .slice(0, 3)
    .map(({ item }) => ({
      id: item.id,
      ticketNumber: item.ticketNumber,
      title: item.symptomSummary,
      finalFix: item.finalDiagnosis === "Pending" ? item.outcome : `${item.finalDiagnosis}: ${item.outcome}`
    }));

  return { recommendedSteps, similarCases };
}

export function makeSavedCase(form: FormState, resolution: ResolutionState): SavedCase {
  return {
    id: Date.now(),
    ticketNumber: form.ticketNumber,
    orderNumber: form.orderNumber,
    customerName: form.customerName,
    symptomSummary: form.visibleSymptoms.slice(0, 3).join(", ") || "No symptoms selected",
    model: form.deviceType === "Desktop" ? form.motherboard || form.deviceType : form.model || form.brand || form.deviceType,
    finalDiagnosis: resolution.finalDiagnosis || "Pending",
    outcome:
      resolution.escalated === "Yes"
        ? "Lens Session / OCCT"
        : resolution.successful === "Yes"
          ? "Successful"
          : resolution.successful === "Pending"
            ? "Pending"
            : "Unsuccessful",
    date: new Date().toISOString().slice(0, 10),
    rawForm: { ...form }
  };
}
