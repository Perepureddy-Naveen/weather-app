import React from "react";
import { motion } from "framer-motion";
import { FiWind, FiAlertCircle } from "react-icons/fi";
import { useWeather } from "../../context/WeatherContext";

const AirQualityCard = () => {
  const { airQuality, theme } = useWeather();

  if (!airQuality) return null;

  const getAQILevel = (aqi) => {
    if (aqi <= 50)
      return {
        level: "Good",
        color: "#10B981",
        bg: "bg-green-500",
        glow: "0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)",
      };
    if (aqi <= 100)
      return {
        level: "Moderate",
        color: "#F59E0B",
        bg: "bg-yellow-500",
        glow: "0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)",
      };
    if (aqi <= 150)
      return {
        level: "Unhealthy for Sensitive",
        color: "#F97316",
        bg: "bg-orange-500",
        glow: "0 0 20px rgba(249, 115, 22, 0.5), 0 0 40px rgba(249, 115, 22, 0.3)",
      };
    if (aqi <= 200)
      return {
        level: "Unhealthy",
        color: "#EF4444",
        bg: "bg-red-500",
        glow: "0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3)",
      };
    if (aqi <= 300)
      return {
        level: "Very Unhealthy",
        color: "#8B5CF6",
        bg: "bg-purple-500",
        glow: "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)",
      };
    return {
      level: "Hazardous",
      color: "#7C2D12",
      bg: "bg-red-900",
      glow: "0 0 20px rgba(124, 45, 18, 0.5), 0 0 40px rgba(124, 45, 18, 0.3)",
    };
  };

  // Calculate US EPA AQI from PM2.5
  const calculateAQI = (pm25) => {
    if (!pm25) return 0;

    const breakpoints = [
      { pmLow: 0, pmHigh: 12, aqiLow: 0, aqiHigh: 50 },
      { pmLow: 12.1, pmHigh: 35.4, aqiLow: 51, aqiHigh: 100 },
      { pmLow: 35.5, pmHigh: 55.4, aqiLow: 101, aqiHigh: 150 },
      { pmLow: 55.5, pmHigh: 150.4, aqiLow: 151, aqiHigh: 200 },
      { pmLow: 150.5, pmHigh: 250.4, aqiLow: 201, aqiHigh: 300 },
      { pmLow: 250.5, pmHigh: 500.4, aqiLow: 301, aqiHigh: 500 },
    ];

    for (const bp of breakpoints) {
      if (pm25 >= bp.pmLow && pm25 <= bp.pmHigh) {
        const aqi =
          ((bp.aqiHigh - bp.aqiLow) / (bp.pmHigh - bp.pmLow)) *
            (pm25 - bp.pmLow) +
          bp.aqiLow;
        return Math.round(aqi);
      }
    }
    return 500;
  };

  const aqi = calculateAQI(airQuality.pm2_5);
  const aqiInfo = getAQILevel(aqi);

  const pollutants = [
    { name: "PM2.5", value: airQuality.pm2_5, unit: "μg/m³", icon: "🌫️" },
    { name: "PM10", value: airQuality.pm10, unit: "μg/m³", icon: "💨" },
    { name: "O₃", value: airQuality.o3, unit: "μg/m³", icon: "🌊" },
    { name: "NO₂", value: airQuality.no2, unit: "μg/m³", icon: "🚗" },
    { name: "SO₂", value: airQuality.so2, unit: "μg/m³", icon: "🏭" },
    { name: "CO", value: airQuality.co, unit: "μg/m³", icon: "🔥" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`rounded-3xl border backdrop-blur-xl p-8 air-quality-card`}
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(30,58,138,0.15) 100%)"
            : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(24px)",
        border:
          theme === "dark"
            ? "1px solid rgba(16,185,129,0.3)"
            : "1px solid rgba(0,0,0,0.08)",
        boxShadow:
          theme === "dark"
            ? "0 20px 60px rgba(16,185,129,0.3), 0 0 40px rgba(16,185,129,0.1), inset 0 0 20px rgba(16,185,129,0.2)"
            : "0 8px 24px rgba(0,0,0,0.08)",
        borderRadius: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FiWind
            className="w-6 h-6"
            style={{
              color: theme === "dark" ? "#60a5fa" : aqiInfo.color,
              filter:
                theme === "dark"
                  ? "drop-shadow(0 0 12px rgba(96,165,250,0.4))"
                  : "none",
            }}
          />
          <h3
            className="text-xl font-bold"
            style={{
              color: theme === "dark" ? "#e0e7ff" : "var(--light-text-primary)",
              textShadow:
                theme === "dark" ? "0 2px 8px rgba(96,165,250,0.3)" : "none",
            }}
          >
            Air Quality
          </h3>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, ${aqiInfo.color}, ${aqiInfo.color}, ${aqiInfo.color})`,
                boxShadow: aqiInfo.glow,
                width: "44px",
                height: "44px",
              }}
            ></div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(16,185,129,0.2)"
                    : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                border:
                  theme === "dark"
                    ? "2px solid rgba(16,185,129,0.4)"
                    : "2px solid rgba(255,255,255,0.6)",
                boxShadow:
                  theme === "dark"
                    ? "0 0 20px rgba(16,185,129,0.3)"
                    : "0 0 20px rgba(255,255,255,0.4)",
              }}
            >
              <div
                className="text-2xl font-bold"
                style={{ color: theme === "dark" ? "#ffffff" : "#111827" }}
              >
                {aqi}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(16,185,129,0.3)"
                    : "rgba(255,255,255,0.8)",
                color: theme === "dark" ? "#e0e7ff" : "#1e40af",
                boxShadow:
                  theme === "dark"
                    ? "0 0 12px rgba(16,185,129,0.4)"
                    : "0 0 12px rgba(255,255,255,0.3)",
              }}
            >
              {aqiInfo.level}
            </motion.div>
            <span
              className="text-xs opacity-80 mt-1"
              style={{
                color:
                  theme === "dark" ? "#a5b4fc" : "var(--light-text-secondary)",
              }}
            >
              Air Quality Index
            </span>
          </div>
        </div>
      </div>

      {/* AQI Display */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: aqiInfo.color,
              boxShadow: aqiInfo.glow,
            }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{aqi}</div>
              <div className="text-sm text-white/90">AQI</div>
            </div>
          </motion.div>
          {aqi > 100 && (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-2 -right-2"
            >
              <FiAlertCircle
                className="w-6 h-6"
                style={{
                  color: theme === "dark" ? "#f59e0b" : "#f59e0b",
                }}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Health Recommendation */}
      <div
        className="p-4 rounded-xl mb-6 border"
        style={{
          background:
            theme === "dark"
              ? aqi > 100
                ? "rgba(245,158,11,0.15)"
                : "rgba(16,185,129,0.15)"
              : aqi > 100
              ? "rgba(245,158,11,0.08)"
              : "rgba(16,185,129,0.08)",
          borderColor:
            theme === "dark"
              ? aqi > 100
                ? "rgba(245,158,11,0.4)"
                : "rgba(16,185,129,0.4)"
              : aqi > 100
              ? "rgba(245,158,11,0.3)"
              : "rgba(16,185,129,0.3)",
          boxShadow:
            theme === "dark"
              ? "0 8px 32px rgba(0,0,0,0.3)"
              : "var(--light-shadow)",
        }}
      >
        <div className="flex items-start space-x-3">
          <div
            className="w-2 h-2 rounded-full mt-1"
            style={{
              background:
                theme === "dark"
                  ? "rgba(16,185,129,0.3)"
                  : "rgba(16,185,129,0.2)",
            }}
          ></div>
          <div className="flex-1">
            <p
              className="text-sm font-medium leading-relaxed"
              style={{
                color:
                  theme === "dark"
                    ? "rgba(255,255,255,0.8)"
                    : "var(--light-text-secondary)",
              }}
            >
              {aqi <= 50 && "Air quality is excellent for outdoor activities"}
              {aqi > 50 &&
                aqi <= 100 &&
                "Air quality is acceptable for most people"}
              {aqi > 100 &&
                aqi <= 150 &&
                "Sensitive groups should limit outdoor exposure"}
              {aqi > 150 &&
                aqi <= 200 &&
                "Everyone should limit outdoor activities"}
              {aqi > 200 &&
                aqi <= 300 &&
                "Avoid outdoor activities. Wear a mask if outside"}
              {aqi > 300 &&
                "Hazardous! Stay indoors and avoid all outdoor activities"}
            </p>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mt-2 inline-flex items-center space-x-1"
            >
              <div
                className="w-1 h-1 rounded-full"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(16,185,129,0.4)"
                      : "rgba(16,185,129,0.3)",
                }}
              ></div>
              <span
                className="text-xs font-medium"
                style={{
                  color:
                    theme === "dark"
                      ? "rgba(255,255,255,0.6)"
                      : "var(--light-text-muted)",
                }}
              >
                Air quality insight
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pollutants Grid */}
      <div
        className="grid gap-4 pollutant-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
          width: "100%",
          minHeight: "auto",
          alignItems: "stretch",
        }}
      >
        {pollutants.slice(0, 6).map((pollutant, index) => (
          <motion.div
            key={pollutant.name}
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
            className="relative rounded-2xl border backdrop-blur-xl transition-all duration-300 overflow-hidden"
            style={{
              background:
                theme === "dark"
                  ? "rgba(16,185,129,0.15)"
                  : "var(--light-bg-glass)",
              backdropFilter: "blur(12px)",
              border:
                theme === "dark"
                  ? "1px solid rgba(16,185,129,0.4)"
                  : "1px solid var(--light-border)",
              boxShadow:
                theme === "dark"
                  ? "0 8px 32px rgba(16,185,129,0.3), 0 0 20px rgba(16,185,129,0.2)"
                  : "var(--light-shadow)",
              minHeight: "120px",
              borderRadius: "18px",
            }}
          >
            {/* Subtle gradient overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(135deg, 
                  ${
                    theme === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.15)"
                  } 0%, 
                  ${
                    theme === "dark"
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(255,255,255,0.05)"
                  } 100%)`,
              }}
            />

            {/* Content */}
            <div className="relative flex items-center p-4 h-full">
              {/* Icon */}
              <div
                className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mr-3"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(255,255,255,0.8)",
                  boxShadow:
                    theme === "dark"
                      ? "0 4px 12px rgba(0,0,0,0.3)"
                      : "0 4px 12px rgba(0,0,0,0.1)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid rgba(255,255,255,0.4)",
                }}
              >
                <span
                  className="text-lg leading-none"
                  style={{ fontSize: "18px" }}
                >
                  {pollutant.icon}
                </span>
              </div>

              {/* Pollutant Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="font-semibold"
                    style={{
                      color:
                        theme === "dark"
                          ? "rgba(255,255,255,0.9)"
                          : "var(--light-text-primary)",
                      fontSize: "13px",
                      fontWeight: "600",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {pollutant.name}
                  </div>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        theme === "dark"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(255,255,255,0.6)",
                      boxShadow:
                        theme === "dark"
                          ? "0 0 8px rgba(255,255,255,0.3)"
                          : "0 0 8px rgba(255,255,255,0.4)",
                    }}
                  ></div>
                </div>

                {/* Value with Unit */}
                <div className="text-right">
                  <div
                    className="text-2xl font-bold"
                    style={{
                      color:
                        theme === "dark"
                          ? "#ffffff"
                          : "var(--light-text-primary)",
                      fontSize: "16px",
                      fontWeight: "700",
                      lineHeight: "1.2",
                      textShadow:
                        theme === "dark" ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
                    }}
                  >
                    {pollutant.value?.toFixed(1) || "N/A"}
                  </div>
                  <div
                    className="text-xs opacity-70"
                    style={{
                      color:
                        theme === "dark"
                          ? "rgba(255,255,255,0.7)"
                          : "var(--light-text-secondary)",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    {pollutant.unit}
                  </div>
                </div>
              </div>
            </div>

            {/* Hover effect overlay */}
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, 
                  ${
                    theme === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.1)"
                  } 0%, 
                  transparent 100%)`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AirQualityCard;
