import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar,
  Clock,
  AlertCircle,
  Phone,
  Plus,
  X,
  Edit,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FollowUp {
  id: string;
  contactName: string;
  phoneNumber: string;
  scheduledDate: Date;
  notes: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed" | "overdue";
  originalCallId: string;
}

// Mock data for demo
const mockFollowUps: FollowUp[] = [
  {
    id: "1",
    contactName: "John Smith",
    phoneNumber: "+1234567890",
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    notes: "Follow up on project proposal discussion",
    priority: "high",
    status: "pending",
    originalCallId: "call_1"
  },
  {
    id: "2",
    contactName: "Sarah Johnson", 
    phoneNumber: "+0987654321",
    scheduledDate: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago (overdue)
    notes: "Discuss contract terms and pricing",
    priority: "medium",
    status: "overdue",
    originalCallId: "call_2"
  },
  {
    id: "3",
    contactName: "Mike Wilson",
    phoneNumber: "+5566778899",
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
    notes: "Check on delivery status",
    priority: "low",
    status: "pending",
    originalCallId: "call_4"
  }
];

const FollowUps = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>(mockFollowUps);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newFollowUp, setNewFollowUp] = useState({
    contactName: "",
    phoneNumber: "",
    scheduledDate: "",
    notes: "",
    priority: "medium" as const
  });

  const formatDateTime = (date: Date): string => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === new Date(now.getTime() + 86400000).toDateString();
    
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (isToday) return `Today at ${timeStr}`;
    if (isTomorrow) return `Tomorrow at ${timeStr}`;
    return `${date.toLocaleDateString()} at ${timeStr}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "overdue": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleAddFollowUp = () => {
    if (!newFollowUp.contactName || !newFollowUp.scheduledDate) return;

    const followUp: FollowUp = {
      id: Date.now().toString(),
      contactName: newFollowUp.contactName,
      phoneNumber: newFollowUp.phoneNumber,
      scheduledDate: new Date(newFollowUp.scheduledDate),
      notes: newFollowUp.notes,
      priority: newFollowUp.priority,
      status: "pending",
      originalCallId: ""
    };

    setFollowUps(prev => [...prev, followUp]);
    setNewFollowUp({
      contactName: "",
      phoneNumber: "",
      scheduledDate: "",
      notes: "",
      priority: "medium"
    });
    setShowAddForm(false);
  };

  const markAsCompleted = (id: string) => {
    setFollowUps(prev => 
      prev.map(fu => 
        fu.id === id ? { ...fu, status: "completed" as const } : fu
      )
    );
  };

  const deleteFollowUp = (id: string) => {
    setFollowUps(prev => prev.filter(fu => fu.id !== id));
  };

  // Update status based on current time
  const updatedFollowUps = followUps.map(fu => {
    const now = new Date();
    if (fu.status === "pending" && fu.scheduledDate < now) {
      return { ...fu, status: "overdue" as const };
    }
    return fu;
  });

  const pendingCount = updatedFollowUps.filter(fu => fu.status === "pending").length;
  const overdueCount = updatedFollowUps.filter(fu => fu.status === "overdue").length;

  return (
    <div className="p-4 space-y-4">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Follow-ups</h2>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{pendingCount} pending</span>
            {overdueCount > 0 && (
              <span className="text-red-600 font-medium">{overdueCount} overdue</span>
            )}
          </div>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          size="sm"
          className="bg-primary hover:bg-primary-glow"
        >
          <Plus size={16} className="mr-1" />
          Add
        </Button>
      </div>

      {/* Add Follow-up Form */}
      {showAddForm && (
        <Card className="p-4 space-y-4 border-primary/20">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Add Follow-up</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddForm(false)}
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="space-y-3">
            <Input
              placeholder="Contact name"
              value={newFollowUp.contactName}
              onChange={(e) => setNewFollowUp(prev => ({ ...prev, contactName: e.target.value }))}
            />
            
            <Input
              placeholder="Phone number"
              value={newFollowUp.phoneNumber}
              onChange={(e) => setNewFollowUp(prev => ({ ...prev, phoneNumber: e.target.value }))}
            />
            
            <Input
              type="datetime-local"
              value={newFollowUp.scheduledDate}
              onChange={(e) => setNewFollowUp(prev => ({ ...prev, scheduledDate: e.target.value }))}
            />
            
            <select
              value={newFollowUp.priority}
              onChange={(e) => setNewFollowUp(prev => ({ ...prev, priority: e.target.value as any }))}
              className="w-full p-2 border border-input rounded-md bg-background"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <Textarea
              placeholder="Notes..."
              value={newFollowUp.notes}
              onChange={(e) => setNewFollowUp(prev => ({ ...prev, notes: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleAddFollowUp} className="flex-1">
              Add Follow-up
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Follow-ups List */}
      <div className="space-y-3">
        {updatedFollowUps.map((followUp) => (
          <Card 
            key={followUp.id} 
            className={cn(
              "p-4 transition-all duration-200",
              followUp.status === "overdue" && "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10"
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium">{followUp.contactName}</h3>
                  <Badge className={getPriorityColor(followUp.priority)}>
                    {followUp.priority}
                  </Badge>
                  <Badge className={getStatusColor(followUp.status)}>
                    {followUp.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {followUp.phoneNumber}
                </p>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  {followUp.status === "overdue" ? (
                    <AlertCircle size={14} className="text-red-600" />
                  ) : (
                    <Clock size={14} />
                  )}
                  <span className={followUp.status === "overdue" ? "text-red-600" : ""}>
                    {formatDateTime(followUp.scheduledDate)}
                  </span>
                </div>
                
                {followUp.notes && (
                  <p className="text-sm text-foreground/80">{followUp.notes}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {followUp.status !== "completed" && (
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone size={14} className="mr-1" />
                  Call Now
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => markAsCompleted(followUp.id)}
                >
                  <CheckCircle size={14} className="mr-1" />
                  Complete
                </Button>
                
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setEditingId(followUp.id)}
                >
                  <Edit size={14} />
                </Button>
                
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => deleteFollowUp(followUp.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X size={14} />
                </Button>
              </div>
            )}
          </Card>
        ))}

        {updatedFollowUps.length === 0 && (
          <div className="text-center py-8">
            <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No follow-ups scheduled</p>
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(true)}
              className="mt-2"
            >
              Add your first follow-up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUps;