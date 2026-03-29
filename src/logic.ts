import type { FormState, ResultsData, ResolutionState, SavedCase } from "./types";

export function toggleItem(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function getPlaceholderResults(): ResultsData {
  return {
    recommendedSteps: [
      "Possible fix placeholder 1",
      "Possible fix placeholder 2",
      "Possible fix placeholder 3",
      "Possible fix placeholder 4",
      "Possible fix placeholder 5"
    ],
    similarCases: [
      {
        id: 1,
        ticketNumber: "X-0874",
        title: "Windows Freezing under load",
        finalFix: "Replaced cooling solution and reapplied thermal interface material."
      },
      {
        id: 2,
        ticketNumber: "X-0912",
        title: "Fans spinning, no display at startup",
        finalFix: "Reseated internal display path and corrected loose cable connection."
      },
      {
        id: 3,
        ticketNumber: "X-0955",
        title: "Random shutdowns while gaming",
        finalFix: "Updated BIOS, removed unstable settings, and corrected cooling issue."
      }
    ]
  };
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
