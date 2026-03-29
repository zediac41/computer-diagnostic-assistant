import { OPTIONS } from "../data";
import type { FormState } from "../types";
import { Card } from "./Field";

export function CommonQuestions({
  form,
  updateAnswer
}: {
  form: FormState;
  updateAnswer: (question: string, value: "Yes" | "No" | "N/A") => void;
}) {
  const questions = [
    ...OPTIONS.commonQuestions.both,
    ...(form.deviceType === "Laptop"
      ? OPTIONS.commonQuestions.laptop
      : form.deviceType === "Desktop"
        ? OPTIONS.commonQuestions.desktop
        : [])
  ];
  const hasDeviceSelection = Boolean(form.deviceType);

  const renderQuestionRow = (question: string, idx: number) => {
    const selectedAnswer = form.commonQuestionAnswers[question] ?? "";
    return (
      <div key={question} className="question-item question-item--interactive">
        <div className="question-text-wrap">
          <span className="step-index">{idx + 1}</span>
          <span>{question}</span>
        </div>
        <div className="question-actions" role="group" aria-label={`Response for: ${question}`}>
          {OPTIONS.yesNoNA.map((choice) => (
            <button
              key={choice}
              type="button"
              className={selectedAnswer === choice ? "response-chip response-chip--active" : "response-chip"}
              onClick={() => updateAnswer(question, choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="common-questions-panel">
      <Card title="Common Questions for Customers">
        <div className="stack">
          {questions.map(renderQuestionRow)}
          {!hasDeviceSelection ? (
            <div className="empty-state">Select Desktop or Laptop to show device-specific questions.</div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
