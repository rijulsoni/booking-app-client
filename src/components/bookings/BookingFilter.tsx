
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

interface BookingFilterProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
}

export const BookingFilter: React.FC<BookingFilterProps> = ({
  activeTab,
  setActiveTab,
  sortOption,
  setSortOption,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            All
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Pending
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
          Confirmed
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Completed
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Cancelled
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <span className="text-sm">Sort by:</span>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full md:w-[180px] border-gray-200 focus:ring-blue-500">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Date (Newest first)</SelectItem>
            <SelectItem value="date-asc">Date (Oldest first)</SelectItem>
            <SelectItem value="price-desc">Price (Highest first)</SelectItem>
            <SelectItem value="price-asc">Price (Lowest first)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};
