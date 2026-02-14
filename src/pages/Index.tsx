import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Map, UserCheck, BarChart3, AlertTriangle, Thermometer, Droplets, Wind } from "lucide-react";
import heroImage from "@/assets/hero-heatwave.jpg";

const features = [
  { icon: Map, title: "Live Heat Map", description: "Interactive vulnerability mapping with real-time temperature overlays across cities.", link: "/map" },
  { icon: UserCheck, title: "Personal Risk Check", description: "AI-powered individual heat vulnerability assessment based on health & location.", link: "/risk-checker" },
  { icon: BarChart3, title: "Analytics Dashboard", description: "District-wise vulnerability rankings with predictive trend analysis.", link: "/dashboard" },
  { icon: AlertTriangle, title: "Smart Alerts", description: "Automated multi-channel alerts triggered by heat threshold breaches.", link: "/alerts" },
];

const liveStats = [
  { icon: Thermometer, label: "Peak Temp", value: "47°C", sub: "Central Delhi" },
  { icon: Droplets, label: "Humidity", value: "22%", sub: "Extreme Low" },
  { icon: Wind, label: "AQI", value: "185", sub: "Unhealthy" },
  { icon: AlertTriangle, label: "Active Alerts", value: "12", sub: "3 Extreme" },
];

export default function Index() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Heatwave over city" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-heat-red/15 border border-heat-red/30 text-heat-red text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-heat-red opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-heat-red" />
                </span>
                Live Monitoring Active
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
                <span className="gradient-heat-text">Heatwave</span>
                <br />
                <span className="text-foreground">Shield System</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                AI-powered heatwave vulnerability mapping and real-time health alerts. Protecting communities before the heat strikes.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/risk-checker"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-heat text-primary-foreground font-semibold text-sm animate-pulse-glow transition-transform hover:scale-105"
                >
                  <Flame className="h-4 w-4" />
                  Check My Risk
                </Link>
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-card text-foreground font-semibold text-sm hover:bg-card/80 transition-all"
                >
                  <Map className="h-4 w-4" />
                  View Heat Map
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Live ticker */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {liveStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className="h-4 w-4 text-heat-orange" />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <p className="text-2xl font-display font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Comprehensive <span className="gradient-heat-text">Protection</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              End-to-end heatwave monitoring, prediction, and emergency response.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={f.link} className="block glass-card-hover p-6 h-full group">
                  <div className="p-2.5 rounded-lg gradient-heat inline-block mb-4 group-hover:scale-110 transition-transform">
                    <f.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
