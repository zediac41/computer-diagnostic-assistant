import { OPTIONS } from "../data";
import type { FormState } from "../types";
import { Card, InputField, SelectField } from "./Field";

export function SystemProfile({
  form,
  updateForm
}: {
  form: FormState;
  updateForm: (key: keyof FormState, value: string | string[]) => void;
}) {
  return (
    <Card title="System Profile">
      <div className="grid two">
        <SelectField
          label="Device Type"
          value={form.deviceType}
          onChange={(v) => updateForm("deviceType", v)}
          options={OPTIONS.deviceTypes}
        />
        <SelectField
          label="Storage Type"
          value={form.storageType}
          onChange={(v) => updateForm("storageType", v)}
          options={OPTIONS.storageTypes}
        />

        {form.deviceType === "Laptop" ? (
          <>
            <SelectField label="RAM Sticks" value={form.ramSticks} onChange={(v) => updateForm("ramSticks", v)} options={OPTIONS.ramSticks} />
            <SelectField
              label="RAM Per Stick"
              value={form.ramPerStick}
              onChange={(v) => updateForm("ramPerStick", v)}
              options={OPTIONS.ramPerStick}
            />
            <InputField label="Brand" value={form.brand} onChange={(v) => updateForm("brand", v)} />
            <InputField label="Model" value={form.model} onChange={(v) => updateForm("model", v)} />
          </>
        ) : (
          <>
            <div className="span-two">
              <InputField label="Model / MOBO" value={form.motherboard} onChange={(v) => updateForm("motherboard", v)} />
            </div>
            <SelectField label="CPU Tier" value={form.cpuTier} onChange={(v) => updateForm("cpuTier", v)} options={OPTIONS.cpuTiers} />
            <SelectField
              label="GPU Installed"
              value={form.gpuInstalled}
              onChange={(v) => updateForm("gpuInstalled", v)}
              options={OPTIONS.yesNo}
            />
            {form.gpuInstalled !== "No" ? (
              <>
                <SelectField label="GPU Tier" value={form.gpuTier} onChange={(v) => updateForm("gpuTier", v)} options={OPTIONS.gpuTiers} />
                <SelectField
                  label="GPU Riser Cable"
                  value={form.gpuRiserCable}
                  onChange={(v) => updateForm("gpuRiserCable", v)}
                  options={OPTIONS.yesNo}
                />
              </>
            ) : null}
            <SelectField label="RAM Sticks" value={form.ramSticks} onChange={(v) => updateForm("ramSticks", v)} options={OPTIONS.ramSticks} />
            <SelectField
              label="RAM Per Stick"
              value={form.ramPerStick}
              onChange={(v) => updateForm("ramPerStick", v)}
              options={OPTIONS.ramPerStick}
            />
            <div className="span-two">
              <SelectField
                label="Cooler Type"
                value={form.coolerType}
                onChange={(v) => updateForm("coolerType", v)}
                options={OPTIONS.coolerTypes}
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
