import React, { createContext, useContext, useState } from "react"
import { cn } from "../../lib/utils"

type TabsContextType = {
  selectedTab: string
  setSelectedTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export function Tabs({
  defaultValue,
  children,
  className = "",
  ...props
}: {
  defaultValue: string
  children: React.ReactNode
  className?: string
  [key: string]: any
}) {
  const [selectedTab, setSelectedTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500",
        className
      )}
      {...props}
    />
  )
}

export function TabsTrigger({
  className,
  value,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component")
  }

  const { selectedTab, setSelectedTab } = context

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        selectedTab === value ? "bg-white text-slate-950 shadow-sm" : "",
        className
      )}
      onClick={() => setSelectedTab(value)}
      {...props}
    />
  )
}

export function TabsContent({
  value,
  children,
  className = "",
  ...props
}: {
  value: string
  children: React.ReactNode
  className?: string
  [key: string]: any
}) {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component")
  }

  const { selectedTab } = context

  if (selectedTab !== value) {
    return null
  }

  return (
    <div className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  )
} 