import BackBtn from "./BackBtn";
import Participant from "./Participant";
import TrialInfo from "./TrialInfo";
import { useState, useEffect } from "react";
import ParticipantMobile from "./ParticipantMobile";
import type { Trial } from "@/components/types/Trial";
import UploadArea from "./UploadArea";
interface acceptProps {
  trial: Trial;
}

export default function DetailBoard({ trial }: acceptProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [trialState] = useState<"待開始" | "進行中" | "已結束" | "通過" | "完美通過">(trial.trialState);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 

  return (
    <div className="flex flex-col gap-6 w-full">
      <BackBtn />
      <TrialInfo trial={trial} />
      {trialState === "進行中" && <UploadArea trial={trial}/>}
      {isMobile ? <ParticipantMobile trial={trial} /> : <Participant trial={trial} />}
    </div>
  );
}
