import { Mic, MicOff, Video, VideoOff, PhoneOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SimulationControlsProps {
  onEndCall?: () => void;
  isVideoEnabled?: boolean;
  onToggleVideo?: () => void;
}

const SimulationControls = ({
  onEndCall,
  isVideoEnabled = true,
  onToggleVideo,
}: SimulationControlsProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(isVideoEnabled);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    onToggleVideo?.();
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4 rounded-2xl glass border border-border/50">
      {/* Mute/Unmute */}
      <Button
        variant={isMuted ? "destructive" : "secondary"}
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>

      {/* Video Toggle */}
      <Button
        variant={isVideoOn ? "secondary" : "outline"}
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={handleToggleVideo}
      >
        {isVideoOn ? (
          <Video className="h-5 w-5" />
        ) : (
          <VideoOff className="h-5 w-5" />
        )}
      </Button>

      {/* Speaker Toggle */}
      <Button
        variant={isSpeakerOn ? "secondary" : "outline"}
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={() => setIsSpeakerOn(!isSpeakerOn)}
      >
        {isSpeakerOn ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </Button>

      {/* End Call */}
      <Button
        variant="destructive"
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={onEndCall}
      >
        <PhoneOff className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default SimulationControls;
