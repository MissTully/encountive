export const demoScoringResults = {
  overallScore: 78,
  maxScore: 100,
  competencyScores: [
    { name: "Identity Verification (HIPAA)", score: 1, maxScore: 1 },
    { name: "Privacy Confirmation (HIPAA)", score: 1, maxScore: 1 },
    { name: "Service Recovery", score: 3, maxScore: 4 },
    { name: "Empathy & Rapport", score: 4, maxScore: 5 },
    { name: "Scope Adherence", score: 4, maxScore: 4 },
    { name: "Patient Education", score: 3, maxScore: 4 },
    { name: "Professionalism", score: 4, maxScore: 5 },
    { name: "Clarity", score: 4, maxScore: 5 },
    { name: "Escalation Accuracy", score: 3, maxScore: 4 },
  ],
  strengths: [
    "Acknowledged the patient's frustration about wait time with genuine empathy",
    "Correctly verified patient identity using two-factor verification (name + DOB)",
    "Maintained a calm, patient-paced tone throughout the entire call",
    "Stayed within Medical Assistant scope of practice — appropriately deferred clinical questions",
  ],
  improvements: [
    "Could have confirmed a private setting before discussing health information",
    "Missed opportunity to explain medication side effects in simpler terms",
    "Should have offered to schedule the follow-up appointment before ending the call",
    "Consider using teach-back method to confirm patient understanding of instructions",
  ],
};

export const demoTranscript = [
  {
    id: "demo-1",
    speaker: "system" as const,
    message: "Call connected. Margaret Ellis is now on the line.",
    timestamp: "0:00",
  },
  {
    id: "demo-2",
    speaker: "patient" as const,
    message: "Hello? Is someone finally there? I've been waiting for almost six minutes!",
    timestamp: "0:03",
  },
  {
    id: "demo-3",
    speaker: "learner" as const,
    message: "Hello Mrs. Ellis, thank you so much for your patience. I sincerely apologize for the wait. My name is Sarah, and I'm calling from Dr. Chen's office. How are you doing today?",
    timestamp: "0:08",
  },
  {
    id: "demo-4",
    speaker: "patient" as const,
    message: "Well, I'm a little frustrated to be honest. I had to figure out how to answer this video call thing by myself. My grandson usually helps me with these things.",
    timestamp: "0:22",
  },
  {
    id: "demo-5",
    speaker: "learner" as const,
    message: "I completely understand, Mrs. Ellis, and I appreciate you taking the time to get connected. Technology can be tricky sometimes. Before we continue, I need to verify a couple of things for your privacy. Could you please confirm your full name and date of birth?",
    timestamp: "0:35",
  },
  {
    id: "demo-6",
    speaker: "patient" as const,
    message: "Oh, sure. It's Margaret Ann Ellis, and my birthday is March 14th, 1951.",
    timestamp: "0:52",
  },
  {
    id: "demo-7",
    speaker: "learner" as const,
    message: "Thank you, Mrs. Ellis. That matches our records. Now, I'm calling for your follow-up appointment. Dr. Chen wanted us to check in on your blood pressure readings. Have you been monitoring at home like we discussed?",
    timestamp: "1:05",
  },
  {
    id: "demo-8",
    speaker: "patient" as const,
    message: "Well, I tried a few times but that little machine is so confusing. The numbers keep jumping around. Last time I checked it said 150-something over 90-something. Is that bad?",
    timestamp: "1:20",
  },
  {
    id: "demo-9",
    speaker: "learner" as const,
    message: "Thank you for checking, Mrs. Ellis. I can see that's a bit higher than our target. I'll make sure to note that for Dr. Chen to review. Have you been taking your Lisinopril every day as prescribed?",
    timestamp: "1:40",
  },
  {
    id: "demo-10",
    speaker: "patient" as const,
    message: "I take it most days, but sometimes I forget in the evening. Is that the small white pill?",
    timestamp: "1:55",
  },
];

export const demoFeedback = [
  {
    id: "fb-1",
    type: "success" as const,
    title: "Excellent Service Recovery",
    message: "You acknowledged the patient's frustration about wait time warmly and genuinely.",
    timestamp: "0:08",
  },
  {
    id: "fb-2",
    type: "success" as const,
    title: "HIPAA Compliance ✓",
    message: "Identity verified correctly using two-factor method (name + DOB).",
    timestamp: "0:35",
  },
  {
    id: "fb-3",
    type: "info" as const,
    title: "Privacy Check Missing",
    message: "Consider asking if the patient is in a private location before discussing health details.",
    timestamp: "1:05",
  },
  {
    id: "fb-4",
    type: "success" as const,
    title: "Good Scope Adherence",
    message: "Appropriately noted readings for physician review rather than interpreting them.",
    timestamp: "1:40",
  },
];
