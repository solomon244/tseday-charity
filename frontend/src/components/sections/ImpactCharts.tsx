"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { impactMetrics } from "@/lib/content";

export function ImpactCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <article className="rounded-2xl bg-white p-6 shadow-soft dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-bold text-tsedey-navy dark:text-white">Households Reached per Quarter</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impactMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="households" fill="#0C3A5D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
      <article className="rounded-2xl bg-white p-6 shadow-soft dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-bold text-tsedey-navy dark:text-white">Youth and Women Participation</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={impactMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="youths" stroke="#0EA5E9" fill="#0EA5E922" />
              <Area type="monotone" dataKey="women" stroke="#EA580C" fill="#EA580C22" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>
    </div>
  );
}
