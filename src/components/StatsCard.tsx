import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  variant?: "default" | "danger" | "warning" | "success" | "info";
}

const variantStyles = {
  default: "border-border",
  danger: "border-heat-red/30 shadow-heat-red/5",
  warning: "border-heat-orange/30 shadow-heat-orange/5",
  success: "border-heat-green/30 shadow-heat-green/5",
  info: "border-heat-blue/30 shadow-heat-blue/5",
};

const iconVariantStyles = {
  default: "bg-muted text-muted-foreground",
  danger: "bg-heat-red/15 text-heat-red",
  warning: "bg-heat-orange/15 text-heat-orange",
  success: "bg-heat-green/15 text-heat-green",
  info: "bg-heat-blue/15 text-heat-blue",
};

export default function StatsCard({ title, value, subtitle, icon: Icon, trend, trendValue, variant = "default" }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-5 ${variantStyles[variant]} shadow-lg`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className={`p-2 rounded-lg ${iconVariantStyles[variant]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="text-3xl font-display font-bold">{value}</p>
      {(subtitle || trendValue) && (
        <div className="flex items-center gap-2 mt-1">
          {trendValue && (
            <span className={`text-xs font-medium ${trend === "up" ? "text-heat-red" : "text-heat-green"}`}>
              {trend === "up" ? "↑" : "↓"} {trendValue}
            </span>
          )}
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      )}
    </motion.div>
  );
}
