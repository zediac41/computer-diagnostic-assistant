import { useMemo, useState } from "react";
import { OPTIONS } from "../data";
import type { FormState } from "../types";
import { Card } from "./Field";

export function Symptoms({
  form,
  updateSymptoms,
  addCustomSymptom
}: {
  form: FormState;
  updateSymptoms: (next: string[]) => void;
  addCustomSymptom: (value: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [customEntry, setCustomEntry] = useState("");

  const displayOptions = useMemo(() => {
    const merged = [...OPTIONS.symptoms, ...form.customSymptoms].sort((a, b) => a.localeCompare(b));
    if (!search.trim()) return merged;
    return merged.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
  }, [form.customSymptoms, search]);

  return (
    <Card title="Symptoms">
      <div className="field">
        <span>Search Symptoms</span>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search symptoms..." />
      </div>

      <div className="symptom-grid">
        {displayOptions.map((option) => {
          const checked = form.visibleSymptoms.includes(option);
          return (
            <label key={option} className={`symptom-item ${checked ? "selected" : ""}`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  updateSymptoms(
                    checked
                      ? form.visibleSymptoms.filter((x) => x !== option)
                      : [...form.visibleSymptoms, option]
                  )
                }
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>

      {displayOptions.length === 0 ? <div className="empty-state">No matching symptoms found.</div> : null}

      <div className="custom-row">
        <div className="field">
          <span>Add Custom Symptom</span>
          <input
            value={customEntry}
            onChange={(e) => setCustomEntry(e.target.value)}
            placeholder="Add a custom symptom..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const value = customEntry.trim();
                if (value) {
                  addCustomSymptom(value);
                  setCustomEntry("");
                }
              }
            }}
          />
        </div>
        <button
          className="secondary"
          onClick={() => {
            const value = customEntry.trim();
            if (value) {
              addCustomSymptom(value);
              setCustomEntry("");
            }
          }}
        >
          Add Symptom
        </button>
      </div>
    </Card>
  );
}
