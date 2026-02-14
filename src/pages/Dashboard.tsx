import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Users, AlertTriangle, TrendingUp, Wind, Droplets, Sun, Hospital, Download, Filter, Clock, ChevronDown, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatsCard from "@/components/StatsCard";
import { temperatureTrend, riskBreakdown, vulnerablePopulation, zones, alerts, hospitals, liveWeather, getRiskColor, getRiskBg } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 text-xs space-y-1">
      <p className="font-semibold">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const alertFilterOptions = ["All", "extreme", "high", "moderate"] as const;

export default function Dashboard() {
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [alertFilter, setAlertFilter] = useState<string>("All");
  const [timeRange, setTimeRange] = useState<string>("7d");

  const extremeZones = zones.filter((z) => z.riskLevel === "extreme").length;
  const avgVulnerability = Math.round(zones.reduce((a, z) => a + z.vulnerabilityScore, 0) / zones.length);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => alertFilter === "All" || a.type === alertFilter);
  }, [alertFilter]);

  const handleExportPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("HeatShield Dashboard Report", 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

    // Zone vulnerability table
    doc.setFontSize(14);
    doc.text("Zone Vulnerability Rankings", 14, 42);
    autoTable(doc, {
      startY: 46,
      head: [["Zone", "Temperature", "AQI", "Vulnerability", "Risk Level"]],
      body: zones.sort((a, b) => b.vulnerabilityScore - a.vulnerabilityScore).map((z) => [
        z.name, `${z.temperature}°C`, z.aqi.toString(), `${z.vulnerabilityScore}/100`, z.riskLevel.toUpperCase(),
      ]),
    });

    // Hospital capacity table
    const finalY = (doc as any).lastAutoTable?.finalY || 120;
    doc.setFontSize(14);
    doc.text("Hospital Capacity Status", 14, finalY + 12);
    autoTable(doc, {
      startY: finalY + 16,
      head: [["Hospital", "Zone", "Occupied/Total", "Heatstroke Cases", "Status"]],
      body: hospitals.map((h) => [
        h.name, h.zone, `${h.occupied}/${h.totalBeds}`, h.heatstrokeCases.toString(), h.status.toUpperCase(),
      ]),
    });

    doc.save("heatshield-report.pdf");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">
              Analytics <span className="gradient-heat-text">Dashboard</span>
            </h1>
            <p className="text-sm text-muted-foreground">Real-time heatwave monitoring and vulnerability analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-28 h-9 text-xs bg-secondary border-border">
                <Clock className="h-3 w-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
              </SelectContent>
            </Select>
            <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Download className="h-3.5 w-3.5" />
              Export PDF
            </button>
          </div>
        </motion.div>

        {/* Live Weather Widget */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-heat-orange/15">
                <Sun className="h-4 w-4 text-heat-orange" />
              </div>
              <h3 className="font-display font-semibold">Live Weather Conditions</h3>
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-heat-green animate-pulse" />
              Updated {liveWeather.lastUpdated}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Temperature", value: `${liveWeather.temperature}°C`, icon: Thermometer, color: "text-heat-red" },
              { label: "Feels Like", value: `${liveWeather.feelsLike}°C`, icon: Thermometer, color: "text-heat-orange" },
              { label: "Humidity", value: `${liveWeather.humidity}%`, icon: Droplets, color: "text-heat-blue" },
              { label: "Wind Speed", value: `${liveWeather.windSpeed} km/h`, icon: Wind, color: "text-muted-foreground" },
              { label: "UV Index", value: liveWeather.uvIndex.toString(), icon: Sun, color: "text-heat-yellow" },
              { label: "Heat Index", value: `${liveWeather.heatIndex}°C`, icon: Activity, color: "text-heat-red" },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-lg bg-secondary/50">
                <item.icon className={`h-5 w-5 mx-auto mb-2 ${item.color}`} />
                <p className="text-lg font-display font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatsCard title="Peak Temperature" value="47°C" subtitle="Central Delhi" icon={Thermometer} variant="danger" trend="up" trendValue="3°C" />
          <StatsCard title="Extreme Zones" value={extremeZones} subtitle="out of 10 monitored" icon={AlertTriangle} variant="warning" />
          <StatsCard title="Avg Vulnerability" value={avgVulnerability} subtitle="score out of 100" icon={TrendingUp} variant="info" />
          <StatsCard title="At-Risk Population" value="1.2M" subtitle="across all zones" icon={Users} variant="danger" trend="up" trendValue="12%" />
        </div>

        {/* Charts with filters */}
        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          {/* Temperature Trend */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">7-Day Temperature Trend</h3>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-36 h-8 text-xs bg-secondary border-border">
                  <Filter className="h-3 w-3 mr-1" />
                  <SelectValue placeholder="Filter zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  {zones.map((z) => (
                    <SelectItem key={z.id} value={z.id}>{z.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={temperatureTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                <XAxis dataKey="day" stroke="hsl(220, 10%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="temp" stroke="hsl(16, 100%, 57%)" strokeWidth={2} dot={{ fill: "hsl(16, 100%, 57%)", r: 4 }} name="Actual" activeDot={{ r: 6, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="predicted" stroke="hsl(0, 72%, 51%)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "hsl(0, 72%, 51%)", r: 4 }} name="Predicted" activeDot={{ r: 6, strokeWidth: 2 }} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Risk Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={riskBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4}>
                  {riskBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} className="cursor-pointer" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Hospital Capacity Tracker */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-heat-red/15">
              <Hospital className="h-4 w-4 text-heat-red" />
            </div>
            <h3 className="font-display font-semibold">Hospital Capacity Tracker</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {hospitals.map((h) => {
              const occupancyPct = Math.round((h.occupied / h.totalBeds) * 100);
              const barColor = h.status === "critical" ? "bg-heat-red" : h.status === "warning" ? "bg-heat-orange" : "bg-heat-green";
              const statusColor = h.status === "critical" ? "text-heat-red bg-heat-red/15" : h.status === "warning" ? "text-heat-orange bg-heat-orange/15" : "text-heat-green bg-heat-green/15";
              return (
                <div key={h.id} className="p-4 rounded-lg bg-secondary/50 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{h.name}</p>
                      <p className="text-xs text-muted-foreground">{h.zone}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColor}`}>
                      {h.status}
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Beds: {h.occupied}/{h.totalBeds}</span>
                      <span className="font-semibold">{occupancyPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${occupancyPct}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${barColor}`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Activity className="h-3 w-3 text-heat-orange" />
                    <span className="text-muted-foreground">{h.heatstrokeCases} heatstroke cases</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Vulnerable Population */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5 mb-6">
          <h3 className="font-display font-semibold mb-4">Vulnerable Population by District</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={vulnerablePopulation}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="district" stroke="hsl(220, 10%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 10%, 55%)" fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="elderly" fill="hsl(0, 72%, 51%)" name="Elderly" radius={[4, 4, 0, 0]} />
              <Bar dataKey="children" fill="hsl(16, 100%, 57%)" name="Children" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outdoor" fill="hsl(45, 100%, 60%)" name="Outdoor Workers" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Alert Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-heat-orange/15">
                <AlertTriangle className="h-4 w-4 text-heat-orange" />
              </div>
              <h3 className="font-display font-semibold">Alert History</h3>
            </div>
            <div className="flex gap-1">
              {alertFilterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAlertFilter(opt)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    alertFilter === opt ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt === "All" ? "All" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            <AnimatePresence mode="popLayout">
              {filteredAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <div className="mt-1 relative">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: getRiskColor(alert.type) }}
                    />
                    <div
                      className="absolute inset-0 h-3 w-3 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: getRiskColor(alert.type) }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getRiskBg(alert.type)}`}>
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {alert.time} · {alert.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Zone Rankings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="font-display font-semibold mb-4">Zone Vulnerability Ranking</h3>
          <div className="space-y-2">
            {zones
              .sort((a, b) => b.vulnerabilityScore - a.vulnerabilityScore)
              .map((z, i) => (
                <div key={z.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <span className="text-xs font-bold text-muted-foreground w-6">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{z.name}</p>
                    <p className="text-xs text-muted-foreground">{z.temperature}°C · AQI {z.aqi}</p>
                  </div>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${z.vulnerabilityScore}%`,
                        backgroundColor: getRiskColor(z.riskLevel),
                      }}
                    />
                  </div>
                  <span className="text-sm font-display font-bold w-10 text-right">{z.vulnerabilityScore}</span>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
