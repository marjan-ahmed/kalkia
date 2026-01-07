'use client'

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoIcon, Thermometer, Wind, CloudRain, Droplets, AlertTriangle } from "lucide-react";

export function ThresholdModal() {
  const thresholds = [
    {
      icon: <Thermometer className="h-5 w-5 text-red-500" />,
      title: "Very Hot",
      condition: "Maximum Temperature ≥ 30°C (86°F)",
      description: "High heat conditions that may cause discomfort and health risks.",
      color: "bg-red-50 border-red-200"
    },
    {
      icon: <Thermometer className="h-5 w-5 text-blue-500" />,
      title: "Very Cold",
      condition: "Minimum Temperature ≤ 10°C (50°F)",
      description: "Cold conditions that require warm clothing and precautions.",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <Wind className="h-5 w-5 text-purple-500" />,
      title: "Very Windy",
      condition: "Wind Speed ≥ 8 m/s (18 mph)",
      description: "Strong winds that may affect outdoor activities and structures.",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <CloudRain className="h-5 w-5 text-blue-600" />,
      title: "Very Wet",
      condition: "Precipitation ≥ 10 mm (0.4 inches)",
      description: "Significant rainfall that may cause wet conditions.",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <Droplets className="h-5 w-5 text-teal-500" />,
      title: "Very Uncomfortable",
      condition: "Temperature ≥ 28°C (82°F) AND Humidity ≥ 65%",
      description: "High temperature combined with high humidity increases heat discomfort significantly.",
      color: "bg-teal-50 border-teal-200"
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <InfoIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Thresholds</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Weather Condition Thresholds
          </DialogTitle>
          <DialogDescription className="text-base">
            These are the exact criteria used to determine weather probabilities in your dashboard results.
            Data is based on NASA POWER satellite observations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {thresholds.map((threshold, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${threshold.color} transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {threshold.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {threshold.title}
                  </h3>
                  <p className="text-sm font-mono bg-white/60 px-2 py-1 rounded border border-gray-200 inline-block mb-2">
                    {threshold.condition}
                  </p>
                  <p className="text-sm text-gray-700">
                    {threshold.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <InfoIcon className="h-4 w-4 text-amber-600" />
              How Probabilities Are Calculated
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              The probability percentages shown in your dashboard represent the likelihood of each condition 
              occurring on your selected date, based on historical weather data from NASA satellites. 
              For example, a 30% "Very Hot" probability means that in 30% of the years analyzed, 
              the temperature reached or exceeded 30°C on that specific date.
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-blue-600" />
              Risk Assessment Levels
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                <span className="font-medium">High Risk:</span>
                <span className="text-gray-700">≥ 30% probability</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="font-medium">Medium Risk:</span>
                <span className="text-gray-700">15% - 29% probability</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                <span className="font-medium">Low Risk:</span>
                <span className="text-gray-700">&lt; 15% probability</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
