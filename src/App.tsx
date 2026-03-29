import { useMemo, useState } from "react";
import { SAMPLE_CASES, createInitialForm, OPTIONS } from "./data";
import { getPlaceholderResults, makeSavedCase, toggleItem } from "./logic";
import type { FormState, ResolutionState, SavedCase, SimilarPastCase } from "./types";
import { CustomerInfo } from "./components/CustomerInfo";
import { SystemProfile } from "./components/SystemProfile";
import { CommonQuestions } from "./components/CommonQuestions";
import { Symptoms } from "./components/Symptoms";
import { ResultsView } from "./components/ResultsView";
import { ResolutionView } from "./components/ResolutionView";
import { CaseHistory } from "./components/CaseHistory";
import { Card, TextAreaField } from "./components/Field";

function createInitialResolution(): ResolutionState {
  return {
    actionsPerformed: [],
    actionNotes: "",
    finalDiagnosis: "",
    finalFix: "",
    successful: "Yes",
    escalated: "No",
    rmaRequired: "No",
    closeoutNotes: ""
  };
}

type TabKey = "new-case" | "results" | "resolution" | "case-history";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("new-case");
  const [form, setForm] = useState<FormState>(createInitialForm);
  const [resolution, setResolution] = useState<ResolutionState>(createInitialResolution);
  const [savedCases, setSavedCases] = useState<SavedCase[]>(SAMPLE_CASES);
  const [pastCaseFixPreview, setPastCaseFixPreview] = useState<SimilarPastCase | null>(null);

  const results = useMemo(() => getPlaceholderResults(), []);
  const deviceTypeBannerClass = form.deviceType
    ? "device-type-banner centered"
    : "device-type-banner centered needs-selection";

  const updateForm = (key: keyof FormState, value: string | string[]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value } as FormState;
      if (key === "deviceType") {
        if (value === "Laptop") next.motherboard = "";
        if (value === "Desktop") {
          next.brand = "";
          next.model = "";
        }
      }
      if (key === "gpuInstalled" && value === "No") {
        next.gpuTier = "";
        next.gpuRiserCable = "";
      }
      return next;
    });
  };

  const updateResolutionField = (key: keyof ResolutionState, value: string | string[]) => {
    setResolution((prev) => ({ ...prev, [key]: value } as ResolutionState));
  };

  const addCustomSymptom = (symptom: string) => {
    setForm((prev) => {
      const existsInBase = OPTIONS.symptoms.some((item) => item.toLowerCase() === symptom.toLowerCase());
      const existsInCustom = prev.customSymptoms.some((item) => item.toLowerCase() === symptom.toLowerCase());
      if (existsInBase || existsInCustom) {
        return prev.visibleSymptoms.includes(symptom)
          ? prev
          : { ...prev, visibleSymptoms: [...prev.visibleSymptoms, symptom] };
      }
      return {
        ...prev,
        customSymptoms: [...prev.customSymptoms, symptom],
        visibleSymptoms: [...prev.visibleSymptoms, symptom]
      };
    });
  };

  const clearForm = () => {
    setForm(createInitialForm());
    setResolution(createInitialResolution());
    setPastCaseFixPreview(null);
    setActiveTab("new-case");
  };

  const saveResolution = () => {
    const saved = makeSavedCase(form, resolution);
    setSavedCases((prev) => [saved, ...prev]);
    setActiveTab("case-history");
  };

  const loadCaseFromHistory = (item: SavedCase) => {
    setForm({ ...item.rawForm });
    setActiveTab("new-case");
  };

  return (
    <div className="app-shell">
      <div className="container">
        <section className="hero">
          <div className="hero-title">
            <h1>Computer Diagnostic Assistant</h1>
            <p>Internal troubleshooting prototype</p>
          </div>
          <div className={deviceTypeBannerClass}>
            <label htmlFor="hero-device-type">Device Type</label>
            <select
              id="hero-device-type"
              value={form.deviceType}
              onChange={(event) => updateForm("deviceType", event.target.value)}
            >
              <option value="">Select one</option>
              {OPTIONS.deviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="button-row">
            <button className="secondary" onClick={clearForm}>Clear Form</button>
            <button onClick={() => setActiveTab("results")}>Diagnose</button>
          </div>
        </section>

        <div className="tabs">
          <button className={activeTab === "new-case" ? "tab active" : "tab"} onClick={() => setActiveTab("new-case")}>New Case</button>
          <button className={activeTab === "results" ? "tab active" : "tab"} onClick={() => setActiveTab("results")}>Results</button>
          <button className={activeTab === "resolution" ? "tab active" : "tab"} onClick={() => setActiveTab("resolution")}>Resolution</button>
          <button className={activeTab === "case-history" ? "tab active" : "tab"} onClick={() => setActiveTab("case-history")}>Case History</button>
        </div>

        {activeTab === "new-case" ? (
          <div className="stack-lg">
            <div className="grid two">
              <div className="stack-lg">
                <CustomerInfo form={form} updateForm={updateForm} />
                <SystemProfile form={form} updateForm={updateForm} />
              </div>
              <CommonQuestions form={form} />
            </div>
            <Symptoms
              form={form}
              updateSymptoms={(next) => updateForm("visibleSymptoms", next)}
              addCustomSymptom={addCustomSymptom}
            />
            <Card title="Notes">
              <TextAreaField label="Notes" value={form.notes} onChange={(v) => updateForm("notes", v)} rows={6} />
            </Card>
          </div>
        ) : null}

        {activeTab === "results" ? (
          <div className="stack-lg">
            <ResultsView results={results} onShowPastCaseFix={setPastCaseFixPreview} />
            {pastCaseFixPreview ? (
              <Card
                title="Past Case Final Fix"
                right={<button className="secondary" onClick={() => setPastCaseFixPreview(null)}>Close</button>}
              >
                <div className="past-case-top">
                  <strong>{pastCaseFixPreview.title}</strong>
                  <span className="subtle">{pastCaseFixPreview.ticketNumber}</span>
                </div>
                <div className="fix-preview">{pastCaseFixPreview.finalFix}</div>
              </Card>
            ) : null}
          </div>
        ) : null}

        {activeTab === "resolution" ? (
          <ResolutionView
            resolution={resolution}
            setResolutionField={updateResolutionField}
            toggleAction={(item) => updateResolutionField("actionsPerformed", toggleItem(resolution.actionsPerformed, item))}
            saveResolution={saveResolution}
            clearForm={clearForm}
          />
        ) : null}

        {activeTab === "case-history" ? (
          <CaseHistory cases={savedCases} onLoadCase={loadCaseFromHistory} />
        ) : null}
      </div>
    </div>
  );
}
