import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, Droplets, Zap, MapPin, Smartphone, MessageCircle, BellRing } from "lucide-react";
import { alerts, getRiskBg } from "@/data/mockData";

const alertIcons: Record<string, any> = {
  extreme: AlertTriangle,
  high: Droplets,
  moderate: Zap,
};

const channels = [
  { id: "sms", label: "SMS Alerts", icon: Smartphone, enabled: true },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, enabled: false },
  { id: "push", label: "Push Notifications", icon: BellRing, enabled: true },
];

export default function AlertsPage() {
  const [channelState, setChannelState] = useState(
    channels.reduce((acc, ch) => ({ ...acc, [ch.id]: ch.enabled }), {} as Record<string, boolean>)
  );
  const [threshold, setThreshold] = useState("70");

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-heat-red/15 border border-heat-red/30 text-heat-red text-sm font-medium mb-4">
            <Bell className="h-4 w-4" />
            Alert Center
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Emergency <span className="gradient-heat-text">Alerts</span>
          </h1>
          <p className="text-muted-foreground">Configure notifications and view active heatwave warnings.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Alert config */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-4">
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold mb-4">Notification Channels</h3>
              <div className="space-y-3">
                {channels.map((ch) => (
                  <div key={ch.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <ch.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{ch.label}</span>
                    </div>
                    <button
                      onClick={() =>
                        setChannelState((prev) => ({ ...prev, [ch.id]: !prev[ch.id] }))
                      }
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        channelState[ch.id] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-primary-foreground transition-transform ${
                          channelState[ch.id] ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold mb-3">Risk Threshold</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Alert when vulnerability score exceeds:
              </p>
              <input
                type="range"
                min="30"
                max="90"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">30</span>
                <span className="font-bold text-heat-orange">{threshold}</span>
                <span className="text-muted-foreground">90</span>
              </div>
            </div>
          </motion.div>

          {/* Active alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold">Active Alerts</h3>
                <span className="px-2 py-1 rounded-full bg-heat-red/15 text-heat-red text-xs font-bold">
                  {alerts.length} Active
                </span>
              </div>

              <div className="space-y-3">
                {alerts.map((alert, i) => {
                  const Icon = alertIcons[alert.type] || AlertTriangle;
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-4 rounded-lg border ${getRiskBg(alert.type)} bg-opacity-5`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-semibold">{alert.title}</h4>
                            <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                          </div>
                          <p className="text-xs opacity-80 mb-1.5">{alert.message}</p>
                          <div className="flex items-center gap-1 text-[11px] opacity-60">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
