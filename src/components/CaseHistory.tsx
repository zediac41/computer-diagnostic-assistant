import type { SavedCase } from "../types";
import { Card } from "./Field";

function outcomeClass(outcome: string): string {
  if (outcome === "Successful") return "badge green";
  if (outcome === "Unsuccessful") return "badge red";
  if (outcome === "Pending" || outcome === "Lens Session / OCCT") return "badge orange";
  return "badge";
}

export function CaseHistory({
  cases,
  onLoadCase
}: {
  cases: SavedCase[];
  onLoadCase: (item: SavedCase) => void;
}) {
  return (
    <Card title="Case History">
      <div className="stack">
        {cases.map((item) => (
          <div key={item.id} className="history-grid">
            <div>
              <div className="subtle">Ticket</div>
              <div>{item.ticketNumber}</div>
            </div>
            <div>
              <div className="subtle">Order Number</div>
              <div>{item.orderNumber}</div>
            </div>
            <div>
              <div className="subtle">Customer Name</div>
              <div>{item.customerName}</div>
            </div>
            <div>
              <div className="subtle">Symptoms</div>
              <div>{item.symptomSummary}</div>
            </div>
            <div>
              <div className="subtle">Model / MOBO</div>
              <div>{item.model}</div>
            </div>
            <div>
              <div className="subtle">Final Diagnosis</div>
              <div>{item.finalDiagnosis}</div>
              <div className="history-meta">
                <span className={outcomeClass(item.outcome)}>{item.outcome}</span>
                <span className="subtle">{item.date}</span>
              </div>
            </div>
            <div className="history-action">
              <button className="secondary" onClick={() => onLoadCase(item)}>Load Case</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
