import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, AlertTriangle, Shield, Heart, Clock, MapPin } from "lucide-react";
import RiskMeter from "@/components/RiskMeter";

const conditions = ["Asthma", "Diabetes", "Heart Disease", "Hypertension", "Kidney Disease", "None"];

interface RiskResult {
  score: number;
  category: string;
  measures: string[];
  emergency: boolean;
}

function calculateRisk(age: number, selectedConditions: string[], exposure: number): RiskResult {
  let score = 0;
  // Age factor
  if (age >= 65) score += 30;
  else if (age >= 50) score += 20;
  else if (age <= 5) score += 25;
  else score += 5;

  // Conditions
  const condCount = selectedConditions.filter(c => c !== "None").length;
  score += condCount * 12;

  // Exposure
  score += Math.min(exposure * 4, 30);

  // Baseline temp factor (simulated)
  score += 10;

  score = Math.min(score, 100);

  const category = score >= 80 ? "Extreme" : score >= 60 ? "High" : score >= 40 ? "Moderate" : "Low";
  const emergency = score >= 80;

  const measures: string[] = [];
  if (score >= 60) measures.push("Stay indoors between 11 AM - 4 PM");
  if (score >= 40) measures.push("Drink at least 3-4 liters of water daily");
  if (condCount > 0) measures.push("Keep medications accessible and cool");
  measures.push("Wear light, loose-fitting clothing");
  if (score >= 60) measures.push("Apply wet cloth to neck and forehead regularly");
  if (emergency) measures.push("⚠️ Seek immediate cooling shelter or medical attention");

  return { score, category, measures, emergency };
}

export default function RiskChecker() {
  const [age, setAge] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [exposure, setExposure] = useState("2");
  const [result, setResult] = useState<RiskResult | null>(null);

  const toggleCondition = (c: string) => {
    if (c === "None") {
      setSelectedConditions(["None"]);
      return;
    }
    setSelectedConditions((prev) => {
      const filtered = prev.filter((x) => x !== "None");
      return filtered.includes(c) ? filtered.filter((x) => x !== c) : [...filtered, c];
    });
  };

  const handleSubmit = () => {
    if (!age) return;
    const r = calculateRisk(parseInt(age), selectedConditions, parseInt(exposure));
    setResult(r);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-heat-orange/15 border border-heat-orange/30 text-heat-orange text-sm font-medium mb-4">
            <UserCheck className="h-4 w-4" />
            Personal Assessment
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Check Your <span className="gradient-heat-text">Heat Risk</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Get a personalized heat vulnerability score with AI-powered health recommendations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 space-y-5">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Heart className="h-4 w-4 text-heat-red" /> Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className="w-full bg-secondary rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-heat-orange" /> Existing Conditions
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {conditions.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleCondition(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedConditions.includes(c)
                        ? "bg-primary/15 text-primary border-primary/30"
                        : "bg-secondary text-muted-foreground border-border hover:border-muted-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-heat-yellow" /> Daily Outdoor Exposure (hours)
              </label>
              <input
                type="range"
                min="0"
                max="12"
                value={exposure}
                onChange={(e) => setExposure(e.target.value)}
                className="w-full mt-2 accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0h</span>
                <span className="font-medium text-foreground">{exposure}h</span>
                <span>12h</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-heat-blue" /> Location
              </label>
              <div className="bg-secondary rounded-lg px-4 py-2.5 text-sm text-muted-foreground border border-border">
                📍 Auto-detected: New Delhi, India (simulated)
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!age}
              className="w-full py-3 rounded-lg gradient-heat text-primary-foreground font-semibold text-sm disabled:opacity-40 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Calculate My Risk
            </button>
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card p-6 space-y-6"
              >
                <div className="flex justify-center">
                  <RiskMeter score={result.score} label="Heat Vulnerability Score" size={180} />
                </div>

                {result.emergency && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-heat-red/15 border border-heat-red/30"
                  >
                    <AlertTriangle className="h-5 w-5 text-heat-red flex-shrink-0" />
                    <p className="text-sm text-heat-red font-medium">
                      Emergency: Extremely high risk. Take immediate precautions.
                    </p>
                  </motion.div>
                )}

                <div>
                  <h3 className="font-display font-semibold mb-3">Preventive Measures</h3>
                  <ul className="space-y-2">
                    {result.measures.map((m, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-heat-orange flex-shrink-0" />
                        {m}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-6 flex flex-col items-center justify-center text-center"
              >
                <div className="p-4 rounded-full bg-muted mb-4">
                  <UserCheck className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-2">Your Results</h3>
                <p className="text-sm text-muted-foreground">
                  Fill in the form and click calculate to see your personalized heat risk assessment.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
