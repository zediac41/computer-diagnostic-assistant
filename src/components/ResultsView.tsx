import type { ResultsData, SimilarPastCase } from "../types";
import { Card } from "./Field";

export function ResultsView({
  results,
  onShowPastCaseFix
}: {
  results: ResultsData;
  onShowPastCaseFix: (item: SimilarPastCase) => void;
}) {
  return (
    <div className="grid two">
      <Card title="Possible Fixes">
        <ol className="steps">
          {results.recommendedSteps.map((step, idx) => (
            <li key={step} className="step">
              <span className="step-index">{idx + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card title="Similar Past Cases">
        <div className="stack">
          {results.similarCases.map((item) => (
            <button key={item.id} className="past-case-button" onClick={() => onShowPastCaseFix(item)}>
              <div className="past-case-top">
                <strong>{item.title}</strong>
                <span>{item.ticketNumber}</span>
              </div>
              <div className="subtle">Click to view final fix</div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
