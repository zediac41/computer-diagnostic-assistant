import { OPTIONS } from "../data";
import type { FormState } from "../types";
import { Card } from "./Field";

export function CommonQuestions({ form }: { form: FormState }) {
  const questions = [
    ...OPTIONS.commonQuestions.both,
    ...(form.deviceType === "Laptop"
      ? OPTIONS.commonQuestions.laptop
      : form.deviceType === "Desktop"
        ? OPTIONS.commonQuestions.desktop
        : [])
  ];

  return (
    <div className="common-questions-panel">
      <Card title="Common Questions for Customers">
      <div className="stack">
        {questions.map((question, idx) => (
          <div key={question} className="question-item">
            <span className="step-index">{idx + 1}</span>
            <span>{question}</span>
          </div>
        ))}
        {!form.deviceType ? (
          <div className="empty-state">
            Select Desktop or Laptop to show device-specific questions.
          </div>
        ) : null}
      </div>
      </Card>
    </div>
  );
}
