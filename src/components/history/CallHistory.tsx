import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed, 
  Search,
  Play,
  MessageSquare,
  Calendar,
  MoreVertical,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CallRecord {
  id: string;
  number: string;
  contactName?: string;
  type: "incoming" | "outgoing" | "missed";
  timestamp: Date;
  duration: number; // in seconds
  notes?: string;
  tags: string[];
  hasRecording: boolean;
}

// Mock data for demo
const mockCalls: CallRecord[] = [
  {
    id: "1",
    number: "+1234567890",
    contactName: "John Smith",
    type: "outgoing",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    duration: 245,
    notes: "Discussed project requirements",
    tags: ["Lead", "Important"],
    hasRecording: true
  },
  {
    id: "2",
    number: "+0987654321",
    contactName: "Sarah Johnson",
    type: "incoming",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    duration: 180,
    notes: "Follow-up call scheduled",
    tags: ["Support"],
    hasRecording: true
  },
  {
    id: "3",
    number: "+1122334455",
    type: "missed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    duration: 0,
    tags: ["Unknown"],
    hasRecording: false
  },
  {
    id: "4",
    number: "+5566778899",
    contactName: "Mike Wilson",
    type: "outgoing",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    duration: 420,
    notes: "Contract discussion",
    tags: ["Client", "Contract"],
    hasRecording: true
  }
];

const CallHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getCallIcon = (type: string) => {
    switch (type) {
      case "incoming":
        return <PhoneIncoming size={16} className="text-blue-600" />;
      case "outgoing":
        return <PhoneOutgoing size={16} className="text-green-600" />;
      case "missed":
        return <PhoneMissed size={16} className="text-red-600" />;
      default:
        return <Phone size={16} />;
    }
  };

  const getStatusBadgeClass = (type: string) => {
    switch (type) {
      case "incoming":
        return "status-incoming";
      case "outgoing":
        return "status-outgoing";
      case "missed":
        return "status-missed";
      default:
        return "";
    }
  };

  const filteredCalls = mockCalls.filter(call => {
    const matchesSearch = 
      call.number.includes(searchQuery) ||
      call.contactName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || call.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: "all", label: "All", count: mockCalls.length },
    { id: "outgoing", label: "Outgoing", count: mockCalls.filter(c => c.type === "outgoing").length },
    { id: "incoming", label: "Incoming", count: mockCalls.filter(c => c.type === "incoming").length },
    { id: "missed", label: "Missed", count: mockCalls.filter(c => c.type === "missed").length }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search calls, contacts, notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter.id)}
            className="flex-shrink-0"
          >
            {filter.label} ({filter.count})
          </Button>
        ))}
      </div>

      {/* Call List */}
      <div className="space-y-3">
        {filteredCalls.map((call) => (
          <Card key={call.id} className="p-4 hover:shadow-medium transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {/* Call Type Icon */}
                <div className="mt-1">
                  {getCallIcon(call.type)}
                </div>

                {/* Call Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium truncate">
                      {call.contactName || call.number}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className={cn("text-xs", getStatusBadgeClass(call.type))}
                    >
                      {call.type}
                    </Badge>
                  </div>
                  
                  {call.contactName && (
                    <p className="text-sm text-muted-foreground mb-1">{call.number}</p>
                  )}
                  
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground mb-2">
                    <span>{formatTimestamp(call.timestamp)}</span>
                    {call.duration > 0 && (
                      <span>• {formatDuration(call.duration)}</span>
                    )}
                  </div>

                  {/* Tags */}
                  {call.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {call.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {call.notes && (
                    <p className="text-sm text-foreground/80 line-clamp-2">
                      {call.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1 ml-2">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Phone size={16} />
                </Button>
                
                {call.hasRecording && (
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Play size={16} />
                  </Button>
                )}
                
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MessageSquare size={16} />
                </Button>
                
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Calendar size={16} />
                </Button>
                
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredCalls.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No calls found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallHistory;