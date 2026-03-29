import { OPTIONS } from "../data";
import type { FormState } from "../types";
import { Card, InputField, SelectField } from "./Field";

export function CustomerInfo({
  form,
  updateForm
}: {
  form: FormState;
  updateForm: (key: keyof FormState, value: string | string[]) => void;
}) {
  return (
    <Card
      title="Customer Information"
      right={<div className="ticket-pill">{form.ticketNumber}</div>}
    >
      <div className="grid two">
        <SelectField label="Store" value={form.store} onChange={(v) => updateForm("store", v)} options={OPTIONS.stores} />
        <SelectField
          label="Contact Type"
          value={form.contactType}
          onChange={(v) => updateForm("contactType", v)}
          options={OPTIONS.contactTypes}
        />
        <InputField label="Customer Name" value={form.customerName} onChange={(v) => updateForm("customerName", v)} />
        <InputField label="Order Number" value={form.orderNumber} onChange={(v) => updateForm("orderNumber", v)} />
        <SelectField
          label="When It Happens"
          value={form.whenHappens}
          onChange={(v) => updateForm("whenHappens", v)}
          options={OPTIONS.whenHappens}
        />
        <SelectField
          label="When It Started"
          value={form.whenStarted}
          onChange={(v) => updateForm("whenStarted", v)}
          options={OPTIONS.whenStarted}
        />
      </div>
    </Card>
  );
}
