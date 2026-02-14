import { motion } from "framer-motion";
import { Thermometer, Users, AlertTriangle, Hospital, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatsCard from "@/components/StatsCard";
import { temperatureTrend, riskBreakdown, vulnerablePopulation, zones } from "@/data/mockData";

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

export default function Dashboard() {
  const extremeZones = zones.filter((z) => z.riskLevel === "extreme").length;
  const avgVulnerability = Math.round(zones.reduce((a, z) => a + z.vulnerabilityScore, 0) / zones.length);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">
            Analytics <span className="gradient-heat-text">Dashboard</span>
          </h1>
          <p className="text-sm text-muted-foreground">Real-time heatwave monitoring and vulnerability analytics</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatsCard title="Peak Temperature" value="47°C" subtitle="Central Delhi" icon={Thermometer} variant="danger" trend="up" trendValue="3°C" />
          <StatsCard title="Extreme Zones" value={extremeZones} subtitle="out of 10 monitored" icon={AlertTriangle} variant="warning" />
          <StatsCard title="Avg Vulnerability" value={avgVulnerability} subtitle="score out of 100" icon={TrendingUp} variant="info" />
          <StatsCard title="At-Risk Population" value="1.2M" subtitle="across all zones" icon={Users} variant="danger" trend="up" trendValue="12%" />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          {/* Temperature Trend */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4">7-Day Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={temperatureTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                <XAxis dataKey="day" stroke="hsl(220, 10%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="temp" stroke="hsl(16, 100%, 57%)" strokeWidth={2} dot={{ fill: "hsl(16, 100%, 57%)", r: 4 }} name="Actual" />
                <Line type="monotone" dataKey="predicted" stroke="hsl(0, 72%, 51%)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "hsl(0, 72%, 51%)", r: 4 }} name="Predicted" />
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
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

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
                        backgroundColor:
                          z.vulnerabilityScore >= 80 ? "hsl(0, 72%, 51%)" :
                          z.vulnerabilityScore >= 60 ? "hsl(16, 100%, 57%)" :
                          z.vulnerabilityScore >= 40 ? "hsl(45, 100%, 60%)" :
                          "hsl(142, 70%, 45%)",
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
