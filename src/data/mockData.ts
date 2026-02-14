export interface Zone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  temperature: number;
  humidity: number;
  aqi: number;
  vulnerabilityScore: number;
  riskLevel: "safe" | "moderate" | "high" | "extreme";
  population: number;
  elderlyPercent: number;
  nearestHospital: string;
  hospitalDistance: string;
}

export const zones: Zone[] = [
  { id: "z1", name: "Central Delhi", lat: 28.6139, lng: 77.2090, temperature: 47, humidity: 22, aqi: 185, vulnerabilityScore: 89, riskLevel: "extreme", population: 250000, elderlyPercent: 14, nearestHospital: "AIIMS Delhi", hospitalDistance: "2.1 km" },
  { id: "z2", name: "South Mumbai", lat: 18.9220, lng: 72.8347, temperature: 39, humidity: 78, aqi: 120, vulnerabilityScore: 72, riskLevel: "high", population: 180000, elderlyPercent: 11, nearestHospital: "KEM Hospital", hospitalDistance: "1.5 km" },
  { id: "z3", name: "Bangalore East", lat: 12.9716, lng: 77.5946, temperature: 34, humidity: 55, aqi: 80, vulnerabilityScore: 42, riskLevel: "moderate", population: 320000, elderlyPercent: 9, nearestHospital: "Victoria Hospital", hospitalDistance: "3.2 km" },
  { id: "z4", name: "Jaipur Old City", lat: 26.9124, lng: 75.7873, temperature: 46, humidity: 18, aqi: 160, vulnerabilityScore: 85, riskLevel: "extreme", population: 200000, elderlyPercent: 16, nearestHospital: "SMS Hospital", hospitalDistance: "1.8 km" },
  { id: "z5", name: "Chennai Marina", lat: 13.0827, lng: 80.2707, temperature: 38, humidity: 82, aqi: 95, vulnerabilityScore: 65, riskLevel: "high", population: 150000, elderlyPercent: 12, nearestHospital: "Rajiv Gandhi GH", hospitalDistance: "2.5 km" },
  { id: "z6", name: "Kolkata North", lat: 22.5726, lng: 88.3639, temperature: 37, humidity: 85, aqi: 140, vulnerabilityScore: 70, riskLevel: "high", population: 280000, elderlyPercent: 13, nearestHospital: "NRS Medical College", hospitalDistance: "1.2 km" },
  { id: "z7", name: "Ahmedabad West", lat: 23.0225, lng: 72.5714, temperature: 45, humidity: 25, aqi: 150, vulnerabilityScore: 82, riskLevel: "extreme", population: 190000, elderlyPercent: 15, nearestHospital: "Civil Hospital", hospitalDistance: "2.0 km" },
  { id: "z8", name: "Pune Camp", lat: 18.5204, lng: 73.8567, temperature: 35, humidity: 50, aqi: 70, vulnerabilityScore: 38, riskLevel: "moderate", population: 170000, elderlyPercent: 10, nearestHospital: "Sassoon Hospital", hospitalDistance: "1.4 km" },
  { id: "z9", name: "Hyderabad Central", lat: 17.3850, lng: 78.4867, temperature: 41, humidity: 45, aqi: 110, vulnerabilityScore: 58, riskLevel: "high", population: 220000, elderlyPercent: 11, nearestHospital: "Osmania GH", hospitalDistance: "1.9 km" },
  { id: "z10", name: "Shimla Hills", lat: 31.1048, lng: 77.1734, temperature: 28, humidity: 60, aqi: 40, vulnerabilityScore: 15, riskLevel: "safe", population: 45000, elderlyPercent: 8, nearestHospital: "IGMC Hospital", hospitalDistance: "0.8 km" },
];

export const temperatureTrend = [
  { day: "Mon", temp: 38, predicted: 39 },
  { day: "Tue", temp: 40, predicted: 41 },
  { day: "Wed", temp: 42, predicted: 43 },
  { day: "Thu", temp: 44, predicted: 46 },
  { day: "Fri", temp: 45, predicted: 47 },
  { day: "Sat", temp: 43, predicted: 44 },
  { day: "Sun", temp: 41, predicted: 42 },
];

export const riskBreakdown = [
  { name: "Extreme", value: 30, fill: "hsl(0, 72%, 51%)" },
  { name: "High", value: 35, fill: "hsl(16, 100%, 57%)" },
  { name: "Moderate", value: 20, fill: "hsl(45, 100%, 60%)" },
  { name: "Safe", value: 15, fill: "hsl(142, 70%, 45%)" },
];

export const vulnerablePopulation = [
  { district: "Central Delhi", elderly: 35000, children: 28000, outdoor: 45000 },
  { district: "Old Jaipur", elderly: 32000, children: 25000, outdoor: 38000 },
  { district: "Ahmedabad W", elderly: 28500, children: 22000, outdoor: 42000 },
  { district: "South Mumbai", elderly: 20000, children: 18000, outdoor: 30000 },
  { district: "Kolkata N", elderly: 36000, children: 30000, outdoor: 48000 },
];

export const alerts = [
  { id: 1, type: "extreme" as const, title: "Extreme Heat Warning", location: "Central Delhi", message: "Temperature expected to exceed 47°C. Stay indoors.", time: "2 min ago", timestamp: "2026-02-14T14:58:00" },
  { id: 2, type: "high" as const, title: "Dehydration Advisory", location: "Jaipur Old City", message: "High dehydration risk. Increase water intake.", time: "15 min ago", timestamp: "2026-02-14T14:45:00" },
  { id: 3, type: "high" as const, title: "Hospital Alert", location: "Ahmedabad West", message: "Civil Hospital approaching 90% heatstroke capacity.", time: "32 min ago", timestamp: "2026-02-14T14:28:00" },
  { id: 4, type: "moderate" as const, title: "Power Outage Warning", location: "South Mumbai", message: "Grid stress detected. Possible brownouts.", time: "1 hr ago", timestamp: "2026-02-14T14:00:00" },
  { id: 5, type: "extreme" as const, title: "Cooling Center Open", location: "Central Delhi", message: "Emergency cooling center at Community Hall, Connaught Place.", time: "1.5 hr ago", timestamp: "2026-02-14T13:30:00" },
  { id: 6, type: "moderate" as const, title: "UV Index Warning", location: "Chennai Marina", message: "UV index exceeds safe levels. Avoid direct sun exposure.", time: "2 hr ago", timestamp: "2026-02-14T13:00:00" },
  { id: 7, type: "high" as const, title: "Water Supply Alert", location: "Kolkata North", message: "Water supply disruption expected due to high demand.", time: "3 hr ago", timestamp: "2026-02-14T12:00:00" },
  { id: 8, type: "extreme" as const, title: "Heatstroke Advisory", location: "Jaipur Old City", message: "Multiple heatstroke cases reported. Emergency services deployed.", time: "4 hr ago", timestamp: "2026-02-14T11:00:00" },
];

export const hospitals = [
  { id: "h1", name: "AIIMS Delhi", zone: "Central Delhi", totalBeds: 200, occupied: 185, heatstrokeCases: 34, status: "critical" as const },
  { id: "h2", name: "KEM Hospital", zone: "South Mumbai", totalBeds: 150, occupied: 112, heatstrokeCases: 18, status: "warning" as const },
  { id: "h3", name: "Victoria Hospital", zone: "Bangalore East", totalBeds: 180, occupied: 95, heatstrokeCases: 6, status: "normal" as const },
  { id: "h4", name: "SMS Hospital", zone: "Jaipur Old City", totalBeds: 160, occupied: 148, heatstrokeCases: 29, status: "critical" as const },
  { id: "h5", name: "Civil Hospital", zone: "Ahmedabad West", totalBeds: 140, occupied: 126, heatstrokeCases: 24, status: "warning" as const },
  { id: "h6", name: "Rajiv Gandhi GH", zone: "Chennai Marina", totalBeds: 170, occupied: 110, heatstrokeCases: 12, status: "normal" as const },
];

export const liveWeather = {
  temperature: 45,
  feelsLike: 49,
  humidity: 28,
  windSpeed: 12,
  uvIndex: 11,
  heatIndex: 52,
  lastUpdated: "2 min ago",
};

export function getRiskColor(level: string) {
  switch (level) {
    case "extreme": return "hsl(0, 72%, 51%)";
    case "high": return "hsl(16, 100%, 57%)";
    case "moderate": return "hsl(45, 100%, 60%)";
    case "safe": return "hsl(142, 70%, 45%)";
    default: return "hsl(220, 10%, 55%)";
  }
}

export function getRiskBg(level: string) {
  switch (level) {
    case "extreme": return "bg-heat-red/20 text-heat-red border-heat-red/30";
    case "high": return "bg-heat-orange/20 text-heat-orange border-heat-orange/30";
    case "moderate": return "bg-heat-yellow/20 text-heat-yellow border-heat-yellow/30";
    case "safe": return "bg-heat-green/20 text-heat-green border-heat-green/30";
    default: return "bg-muted text-muted-foreground";
  }
}
