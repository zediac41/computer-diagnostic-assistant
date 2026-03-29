import type { FormState, SavedCase } from "./types";

export const OPTIONS = {
  deviceTypes: ["Desktop", "Laptop"],
  contactTypes: ["Phone", "Ticket", "Chat"],
  stores: ["Xotic PC", "Extreme PCS", "Workstation PCS"],
  cpuTiers: ["Low", "Mid", "High"],
  yesNo: ["Yes", "No"],
  successStates: ["Yes", "No", "Pending"],
  gpuTiers: ["Low", "Mid", "High"],
  ramSticks: ["2", "4"],
  ramPerStick: ["8GB", "16GB", "24GB", "32GB", "48GB", "64GB"],
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
  ]
} as const;

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
