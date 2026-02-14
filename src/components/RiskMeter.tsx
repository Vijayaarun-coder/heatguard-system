import { motion } from "framer-motion";

interface RiskMeterProps {
  score: number;
  label: string;
  size?: number;
}

export default function RiskMeter({ score, label, size = 160 }: RiskMeterProps) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const strokeColor =
    score >= 80 ? "hsl(0, 72%, 51%)" :
    score >= 60 ? "hsl(16, 100%, 57%)" :
    score >= 40 ? "hsl(45, 100%, 60%)" :
    "hsl(142, 70%, 45%)";

  const riskLabel =
    score >= 80 ? "Extreme" :
    score >= 60 ? "High" :
    score >= 40 ? "Moderate" :
    "Safe";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(220, 14%, 18%)"
            strokeWidth="8"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-display font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground">{riskLabel}</span>
        </div>
      </div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
