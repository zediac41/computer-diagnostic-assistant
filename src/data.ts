import type { FormState, SavedCase, SymptomFixRule } from "./types";

export const OPTIONS = {
  deviceTypes: ["Desktop", "Laptop"],
  contactTypes: ["Phone", "Ticket", "Chat"],
  stores: ["Xotic PC", "Extreme PCS", "Workstation PCS"],
  cpuTiers: ["Low", "Mid", "High"],
  yesNo: ["Yes", "No"],
  successStates: ["Yes", "No", "Pending"],
  gpuTiers: ["Low", "Mid", "High"],
  ramSticks: ["2", "4"],
  ramPerStick: ["8GB", "16GB", "24GB", "32GB"],
  storageTypes: ["Gen 4", "Gen 5"],
  coolerTypes: [
    "Stock CPU Cooler",
    "CPU Tower Cooler",
    "240mm AIO",
    "360mm AIO",
    "Custom Watercool"
  ],
  whenHappens: [
    "At Startup",
    "At Idle",
    "Under Load",
    "While Gaming",
    "Randomly",
    "Consistently",
    "After Sleep/Wake"
  ],
  whenStarted: ["After Update", "After BIOS/Driver Change", "After Shipping", "Unknown"],
  symptoms: [
    "Artifacting",
    "Blue Screen Error",
    "Boot looping",
    "Crashes using Software",
    "Crashing in Games",
    "Drive not showing",
    "Fans Spinning, No Display",
    "Lag Spikes",
    "Motherboard Code / Debug Light",
    "No Drive for Windows Install",
    "Not Powering On",
    "Overheating",
    "Powers On then Shuts Down",
    "Power Cycling",
    "Random Restarts",
    "Random Shutdowns",
    "Screen Flickering",
    "Slow Boot to Windows",
    "Slow Performance",
    "Stuck in Automatic Repair",
    "Stuck in BIOS",
    "Stuck on Splash Screen",
    "Thermal Throttling",
    "Windows Freezing",
    "Windows won't load",
    "Wrong RAM Showing"
  ],
  troubleshooting: [
    "Driver Reinstall",
    "Windows Reinstall",
    "Memory Test",
    "RAM Reseat",
    "Load BIOS Default",
    "External Monitor Test",
    "Updated BIOS",
    "Remove Memory Overclock",
    "Updated Drivers",
    "Updated Windows",
    "Reseat M.2",
    "Tried using One Dimm of Memory",
    "Different Power Outlet",
    "Disconnect all Peripherals",
    "Reseated Internal Connections"
  ],
  commonQuestions: {
    both: [
      "Is this your first time booting the computer?",
      "Have you installed any extra parts or components?",
      "Have you made any recent changes to your computer, BIOS or to Windows?"
    ],
    laptop: [
      "Is your power cable firmly connected to the power brick and Laptop?",
      "Can you see any lights on your Laptop?"
    ],
    desktop: [
      "Did you have to install the GPU yourself?",
      "Do you have your power cable connected, switched on PSU turned on and have pressed the power button?",
      "Do you have your VGA cable connect to GPU or Motherboard?",
      "Are your fans and RGB lights on when powering on?"
    ]
  }
} as const;

export const SYMPTOM_FIX_RULES: SymptomFixRule[] = [
  {
    id: "no-power-basics-desktop",
    symptom: "Not Powering On",
    deviceType: "Desktop",
    fixes: [
      "Verify PSU switch is ON and 24-pin + CPU power cables are fully seated.",
      "Test with a known-good wall outlet and power cable.",
      "Disconnect non-essential peripherals and retry a minimal boot."
    ],
    reason: "Most desktop no-power cases are traced to input power or core power cable seating.",
    weight: 3
  },
  {
    id: "no-power-basics-laptop",
    symptom: "Not Powering On",
    deviceType: "Laptop",
    fixes: [
      "Confirm charger and barrel/USB-C connection are secure at both ends.",
      "Perform an EC reset (power drain), then retry with charger connected.",
      "Check charge LED behavior to determine if DC-in path is active."
    ],
    reason: "Laptop no-power triage starts with adapter, battery, and embedded-controller reset checks.",
    weight: 3
  },
  {
    id: "no-display-gpu",
    symptom: "Fans Spinning, No Display",
    deviceType: "Desktop",
    fixes: [
      "Confirm display cable is connected to the GPU output, not motherboard video.",
      "Reseat GPU and PCIe power leads.",
      "Boot with one RAM stick and clear CMOS/default BIOS settings."
    ],
    reason: "No-display with fan activity frequently points to display path, GPU seating, or memory training.",
    weight: 3
  },
  {
    id: "repair-loop-startup",
    symptom: "Stuck in Automatic Repair",
    deviceType: "Both",
    fixes: [
      "Run Startup Repair once, then check boot order and UEFI mode.",
      "Run filesystem and system file checks from recovery media.",
      "If corruption persists, back up data and perform a clean Windows reinstall."
    ],
    reason: "Repeated auto-repair loops are commonly boot corruption or disk integrity issues."
  },
  {
    id: "thermal-instability",
    symptom: "Overheating",
    deviceType: "Both",
    fixes: [
      "Check cooler mount pressure and thermal paste coverage.",
      "Verify pump/fan headers are detected and fan curves are active.",
      "Inspect for blocked airflow or heavy dust buildup."
    ],
    reason: "Thermal faults often come from cooling contact, fan control, or airflow restrictions.",
    weight: 2
  },
  {
    id: "thermal-throttling-load",
    symptom: "Thermal Throttling",
    deviceType: "Both",
    fixes: [
      "Load BIOS defaults and remove unstable overclock/undervolt settings.",
      "Validate cooling performance with a controlled stress test.",
      "Update BIOS/chipset firmware if throttling started after updates."
    ],
    reason: "Throttling under load can be thermal saturation or unstable firmware/power settings.",
    whenHappens: "Under Load",
    weight: 2
  },
  {
    id: "boot-loop-ram",
    symptom: "Boot looping",
    deviceType: "Both",
    fixes: [
      "Reseat RAM and test one DIMM at a time.",
      "Disable memory overclock profile and retry POST.",
      "Update BIOS if memory compatibility is suspect."
    ],
    reason: "Boot loops are frequently memory training or unstable memory profile issues.",
    weight: 2
  },
  {
    id: "bsod-driver",
    symptom: "Blue Screen Error",
    deviceType: "Both",
    fixes: [
      "Capture stop code, then update/reinstall GPU and chipset drivers.",
      "Run memory diagnostics and inspect recent hardware/software changes.",
      "Remove recent updates/drivers if crashes started immediately after a change."
    ],
    reason: "BSODs are often linked to driver faults, memory instability, or recent system changes."
  },
  {
    id: "game-crash-gpu",
    symptom: "Crashing in Games",
    deviceType: "Both",
    fixes: [
      "Perform a clean GPU driver reinstall.",
      "Check GPU/CPU temperatures and clock stability during gameplay.",
      "Validate game files and disable aggressive overlays/overclocks."
    ],
    reason: "Game-only crashes often correlate with GPU driver state or thermal/power instability."
  },
  {
    id: "storage-missing",
    symptom: "Drive not showing",
    deviceType: "Both",
    fixes: [
      "Reseat the M.2/SATA drive and confirm port visibility in BIOS.",
      "Update storage controller drivers and BIOS firmware.",
      "Test the drive in another slot/system to isolate drive vs board path."
    ],
    reason: "Missing drives are usually connection, slot/configuration, or drive health related."
  }
];

let nextTicketNumber = 1003;

export function generateTicketNumber(): string {
  const ticket = `X-${nextTicketNumber}`;
  nextTicketNumber += 1;
  return ticket;
}

export function createInitialForm(): FormState {
  return {
    ticketNumber: generateTicketNumber(),
    orderNumber: "",
    contactType: "",
    store: "",
    customerName: "",
    deviceType: "",
    brand: "",
    model: "",
    motherboard: "",
    whenHappens: "",
    whenStarted: "",
    cpuTier: "",
    gpuInstalled: "",
    gpuTier: "",
    gpuRiserCable: "",
    ramSticks: "",
    ramPerStick: "",
    storageType: "",
    coolerType: "",
    visibleSymptoms: [],
    customSymptoms: [],
    notes: ""
  };
}

export const SAMPLE_CASES: SavedCase[] = [
  {
    id: 1,
    ticketNumber: "X-1000",
    orderNumber: "SO-1000",
    customerName: "Sample Customer A",
    symptomSummary: "Windows Freezing, Overheating",
    model: "MSI Z790 TOMAHAWK WIFI",
    finalDiagnosis: "Cooling Failure",
    outcome: "Successful",
    date: "2026-03-28",
    rawForm: {
      ticketNumber: "X-1000",
      orderNumber: "SO-1000",
      contactType: "Ticket",
      store: "Xotic PC",
      customerName: "Sample Customer A",
      deviceType: "Desktop",
      brand: "",
      model: "",
      motherboard: "MSI Z790 TOMAHAWK WIFI",
      whenHappens: "While Gaming",
      whenStarted: "Unknown",
      cpuTier: "High",
      gpuInstalled: "Yes",
      gpuTier: "High",
      gpuRiserCable: "No",
      ramSticks: "2",
      ramPerStick: "16GB",
      storageType: "Gen 5",
      coolerType: "360mm AIO",
      visibleSymptoms: ["Windows Freezing", "Overheating"],
      customSymptoms: [],
      notes: "Sample desktop freeze case."
    }
  },
  {
    id: 2,
    ticketNumber: "X-1001",
    orderNumber: "SO-1001",
    customerName: "Sample Customer B",
    symptomSummary: "Fans Spinning, No Display",
    model: "Gaming Laptop X15",
    finalDiagnosis: "Loose Display Cable",
    outcome: "Successful",
    date: "2026-03-27",
    rawForm: {
      ticketNumber: "X-1001",
      orderNumber: "SO-1001",
      contactType: "Phone",
      store: "Extreme PCS",
      customerName: "Sample Customer B",
      deviceType: "Laptop",
      brand: "Gaming Laptop",
      model: "X15",
      motherboard: "",
      whenHappens: "At Startup",
      whenStarted: "After Shipping",
      cpuTier: "",
      gpuInstalled: "",
      gpuTier: "",
      gpuRiserCable: "",
      ramSticks: "2",
      ramPerStick: "8GB",
      storageType: "Gen 4",
      coolerType: "",
      visibleSymptoms: ["Fans Spinning, No Display"],
      customSymptoms: [],
      notes: "Sample laptop display case."
    }
  },
  {
    id: 3,
    ticketNumber: "X-1002",
    orderNumber: "SO-1002",
    customerName: "Sample Customer C",
    symptomSummary: "Random Shutdowns, Overheating",
    model: "Desktop Z790",
    finalDiagnosis: "Cooling Failure",
    outcome: "Pending",
    date: "2026-03-26",
    rawForm: {
      ticketNumber: "X-1002",
      orderNumber: "SO-1002",
      contactType: "Chat",
      store: "Workstation PCS",
      customerName: "Sample Customer C",
      deviceType: "Desktop",
      brand: "",
      model: "",
      motherboard: "Desktop Z790",
      whenHappens: "Under Load",
      whenStarted: "Unknown",
      cpuTier: "Mid",
      gpuInstalled: "Yes",
      gpuTier: "Mid",
      gpuRiserCable: "No",
      ramSticks: "2",
      ramPerStick: "16GB",
      storageType: "Gen 4",
      coolerType: "240mm AIO",
      visibleSymptoms: ["Random Shutdowns", "Overheating"],
      customSymptoms: [],
      notes: "Sample restart/shutdown case."
    }
  }
];
