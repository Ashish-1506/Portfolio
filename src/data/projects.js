const projects = [
  {
    id: 'cogniflow',
    title: 'CogniFlow – Autonomous Agentic RAG & Live Context Engine',
    tagline: 'Autonomous agentic RAG assistant with dual hierarchical memory.',
    description: 'A stateful, autonomous AI digital assistant with cyclic reasoning, dynamic planning, self-correction, and live external tool execution.',
    highlights: [
      'Engineered a stateful, autonomous AI digital assistant using LangGraph to execute cyclic reasoning, dynamic multi-step planning, self-correction routing, and live external tool execution.',
      'Implemented a Dual Hierarchical Memory Engine utilizing SQLite for short-term session checkpoints and ChromaDB for durable, long-term semantic user fact retrieval.',
      'Integrated Model Context Protocol (MCP) for enterprise data extraction, streaming the agent’s internal execution state to a React 18 UI via WebSockets with full LangSmith observability.',
    ],
    tech: ['LangGraph', 'SQLite', 'ChromaDB', 'MCP', 'React 18', 'WebSockets', 'LangSmith'],
    category: ['AI/ML', 'Full-Stack'],
    github: 'https://github.com/Ashish-1506/CogniFlow',
    demo: '',
    image: 'assets/images/projects/CogniFlow_dashboard.png',
  },
  {
    id: 'resilio',
    title: 'Resilio – AI-Powered Distributed System Reliability Platform',
    tagline: 'AI-powered reliability platform with chaos fault injection and root-cause analysis.',
    description: 'An autonomous reliability platform for containerized microservices, chaos fault injection, observability, diagnosis, and remediation.',
    highlights: [
      'Engineered an autonomous distributed-system reliability platform orchestrating containerized microservices deployed via Docker on a constrained Microsoft Azure virtual machine.',
      'Integrated automated chaos fault injection via the Docker API and real-time OpenTelemetry metric ingestion using Prometheus and WebSockets.',
      'Implemented a dual diagnosis engine featuring a local evidence-based heuristic analyzer and an LLM-driven root-cause analysis agent to detect and remediate cascading failures.',
    ],
    tech: ['Docker', 'Microsoft Azure', 'OpenTelemetry', 'Prometheus', 'WebSockets', 'LLMs'],
    category: ['AI/ML', 'Distributed Systems'],
    github: 'https://github.com/Ashish-1506/Resilio',
    demo: '',
    image: 'assets/images/projects/Resilio_dashboard.png',
  },
  {
    id: 'interviewai',
    title: 'InterviewAI – AI-Powered Interview Preparation Platform',
    tagline: 'Full-stack AI interview preparation platform with voice, scoring and code evaluation.',
    description: 'A full-stack AI platform for resume-aware preparation, real-time interview sessions, evaluation, and personalized candidate analysis.',
    highlights: [
      'Built a full-stack AI system using React, Node.js, FastAPI, MongoDB, and Docker with JWT authentication and resume-aware question generation.',
      'Implemented real-time WebSocket sessions with voice/text responses, speech-to-text, AI scoring, emotion analysis, and isolated code evaluation.',
      'Integrated LangChain, OpenAI/Gemini, FAISS, Whisper, and AI-driven performance reporting for personalized candidate analysis.',
    ],
    tech: ['React', 'Node.js', 'FastAPI', 'MongoDB', 'Docker', 'JWT', 'LangChain', 'OpenAI/Gemini', 'FAISS', 'Whisper'],
    category: ['AI/ML', 'Full-Stack'],
    github: 'https://github.com/Ashish-1506/InterviewAI',
    demo: '',
    image: 'assets/images/projects/InterviewAI_dashboard.png',
  },
]

export default projects