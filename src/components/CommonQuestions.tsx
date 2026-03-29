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
          {questions.map((question) => (
            <label key={question} className="field">
              <span>{question}</span>
              <select
                value={answers[question] ?? ""}
                onChange={(event) => updateAnswer(question, event.target.value as YesNoNA)}
              >
                <option value="">Select response</option>
                {OPTIONS.yesNoNA.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
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
