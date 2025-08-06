import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  PhoneCall, 
  Delete, 
  PhoneOff,
  User,
  MessageSquare,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DialPadProps {
  onCall: (number: string) => void;
  onEndCall: () => void;
  isInCall: boolean;
}

const DialPad = ({ onCall, onEndCall, isInCall }: DialPadProps) => {
  const [number, setNumber] = useState("");

  const dialButtons = [
    { digit: "1", letters: "" },
    { digit: "2", letters: "ABC" },
    { digit: "3", letters: "DEF" },
    { digit: "4", letters: "GHI" },
    { digit: "5", letters: "JKL" },
    { digit: "6", letters: "MNO" },
    { digit: "7", letters: "PQRS" },
    { digit: "8", letters: "TUV" },
    { digit: "9", letters: "WXYZ" },
    { digit: "*", letters: "" },
    { digit: "0", letters: "+" },
    { digit: "#", letters: "" },
  ];

  const handleDigitPress = (digit: string) => {
    if (!isInCall) {
      setNumber(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (number.trim()) {
      onCall(number);
    }
  };

  const handleClear = () => {
    setNumber("");
  };

  if (isInCall) {
    return (
      <div className="p-6 space-y-8">
        {/* Call Info */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <User size={40} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{number}</h2>
            <p className="text-muted-foreground">Calling...</p>
          </div>
        </div>

        {/* Call Actions */}
        <div className="flex justify-center space-x-6">
          <Button
            size="lg"
            variant="outline"
            className="w-14 h-14 rounded-full"
          >
            <MessageSquare size={24} />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="w-14 h-14 rounded-full"
          >
            <Video size={24} />
          </Button>
          
          <Button
            size="lg"
            onClick={onEndCall}
            className="w-16 h-16 rounded-full bg-danger hover:bg-danger-glow text-danger-foreground"
          >
            <PhoneOff size={28} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Number Display */}
      <div className="text-center py-4">
        <div className="min-h-[3rem] flex items-center justify-center">
          {number ? (
            <div className="space-y-1">
              <p className="text-2xl font-mono tracking-wider">{number}</p>
              <div className="flex justify-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackspace}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Delete size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-foreground text-xs"
                >
                  Clear
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-lg">Enter phone number</p>
          )}
        </div>
      </div>

      {/* Dial Pad Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
        {dialButtons.map((button) => (
          <Button
            key={button.digit}
            variant="outline"
            onClick={() => handleDigitPress(button.digit)}
            className={cn(
              "h-16 rounded-full border-2 hover:border-primary/50",
              "flex flex-col items-center justify-center",
              "transition-all duration-200 active:scale-95",
              "hover:shadow-medium"
            )}
          >
            <span className="text-xl font-semibold">{button.digit}</span>
            {button.letters && (
              <span className="text-xs text-muted-foreground mt-1">
                {button.letters}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Call Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleCall}
          disabled={!number.trim()}
          className={cn(
            "w-16 h-16 rounded-full",
            "bg-success hover:bg-success-glow text-success-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "shadow-medium hover:shadow-strong",
            "transition-all duration-300 active:scale-95"
          )}
        >
          <Phone size={28} />
        </Button>
      </div>
    </div>
  );
};

export default DialPad;