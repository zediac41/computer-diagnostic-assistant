import { OPTIONS } from "../data";
import type { FormState, YesNoNA } from "../types";
import { Card } from "./Field";

export function CommonQuestions({
  form,
  updateAnswer
}: {
  form: FormState;
  updateAnswer: (question: string, answer: YesNoNA) => void;
}) {
  const questions = [
    ...OPTIONS.commonQuestions.both,
    ...(form.deviceType === "Laptop"
      ? OPTIONS.commonQuestions.laptop
      : form.deviceType === "Desktop"
        ? OPTIONS.commonQuestions.desktop
        : [])
  ];
  const answers = form.commonQuestionAnswers ?? {};

  return (
    <div className="common-questions-panel">
      <Card title="Common Questions for Customers">
        <div className="stack">
          {questions.map((question) => {
            const selectedValue = answers[question] ?? "";

            return (
              <div key={question} className="question-response-row">
                <span className="question-text">{question}</span>
                <div className="response-options" role="group" aria-label={`Response for: ${question}`}>
                  {OPTIONS.yesNoNA.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={selectedValue === option ? "response-chip active" : "response-chip"}
                      onClick={() => updateAnswer(question, option as YesNoNA)}
                      aria-pressed={selectedValue === option}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
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
