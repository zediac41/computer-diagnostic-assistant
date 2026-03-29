import { OPTIONS } from "../data";
import type { ResolutionState } from "../types";
import { Card, SelectField, TextAreaField, InputField } from "./Field";

export function ResolutionView({
  resolution,
  setResolutionField,
  toggleAction,
  saveResolution,
  clearForm
}: {
  resolution: ResolutionState;
  setResolutionField: (key: keyof ResolutionState, value: string | string[]) => void;
  toggleAction: (item: string) => void;
  saveResolution: () => void;
  clearForm: () => void;
}) {
  return (
    <div className="stack-lg">
      <Card title="Actions Performed">
        <div className="symptom-grid">
          {OPTIONS.troubleshooting.map((item) => {
            const checked = resolution.actionsPerformed.includes(item);
            return (
              <label key={item} className={`symptom-item ${checked ? "selected" : ""}`}>
                <input type="checkbox" checked={checked} onChange={() => toggleAction(item)} />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </Card>

      <Card title="Action Notes">
        <TextAreaField label="Action Notes" value={resolution.actionNotes} onChange={(v) => setResolutionField("actionNotes", v)} rows={5} />
      </Card>

      <div className="grid two">
        <Card title="Final Diagnosis">
          <div className="stack">
            <InputField
              label="Final Diagnosis"
              value={resolution.finalDiagnosis}
              onChange={(v) => setResolutionField("finalDiagnosis", v)}
            />
            {resolution.successful === "Yes" ? (
              <TextAreaField label="Final Fix" value={resolution.finalFix} onChange={(v) => setResolutionField("finalFix", v)} rows={5} />
            ) : null}
          </div>
        </Card>

        <Card title="Outcome">
          <div className="stack">
            <SelectField
              label="Successful"
              value={resolution.successful}
              onChange={(v) => setResolutionField("successful", v)}
              options={OPTIONS.successStates}
            />
            <SelectField
              label="Lens Session or OCCT Diagnostic"
              value={resolution.escalated}
              onChange={(v) => setResolutionField("escalated", v)}
              options={OPTIONS.yesNo}
            />
            {resolution.successful === "No" ? (
              <SelectField
                label="RMA Required"
                value={resolution.rmaRequired}
                onChange={(v) => setResolutionField("rmaRequired", v)}
                options={OPTIONS.yesNo}
              />
            ) : null}
          </div>
        </Card>
      </div>

      <Card title="Closeout Notes">
        <TextAreaField label="Closeout Notes" value={resolution.closeoutNotes} onChange={(v) => setResolutionField("closeoutNotes", v)} rows={6} />
      </Card>

      <div className="button-row">
        <button onClick={saveResolution}>Save Resolution</button>
        <button className="secondary" onClick={clearForm}>Create New Case</button>
      </div>
    </div>
  );
}
