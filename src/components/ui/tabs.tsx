import React, { createContext, useContext, useState } from "react"

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

export function TabsList({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) {
  return (
    <div className={`flex overflow-x-auto ${className}`} {...props}>
      {children}
    </div>
  )
}

export function TabsTrigger({
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
    throw new Error("TabsTrigger must be used within a Tabs component")
  }

  const { selectedTab, setSelectedTab } = context

  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        selectedTab === value
          ? "border-b-2 border-primary-blue text-primary-blue"
          : "text-gray-500 hover:text-gray-700"
      } ${className}`}
      onClick={() => setSelectedTab(value)}
      {...props}
    >
      {children}
    </button>
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