const about = {
  heading: {
    label: '01. About Me',
    title: 'Who I Am',
  },
  paragraphs: [
    [
      { text: 'I am a Computer Science undergraduate specializing in ' },
      { text: 'Cyber-Physical Systems', emphasis: true },
      { text: ' at VIT Chennai, with experience in ' },
      { text: 'full-stack development', emphasis: true },
      { text: ', backend engineering, and ' },
      { text: 'AI/ML', emphasis: true },
      { text: ' applications.' },
    ],
    [
      { text: 'I build scalable applications and reliable software solutions using Java, Python, JavaScript, React, Node.js, FastAPI, REST APIs, and SQL/NoSQL databases.' },
    ],
    [
      { text: 'My foundation spans data structures and algorithms, operating systems, computer networks, DBMS, and ' },
      { text: 'distributed systems', emphasis: true },
      { text: ', alongside research in deep learning and biomedical image segmentation.' },
    ],
  ],
  quickFactsTitle: 'Quick Facts',
  quickFacts: [
    { label: 'Location', value: 'Chennai, India', iconKey: 'location' },
    { label: 'Degree', value: 'B.Tech CSE, Cyber Physical Systems', iconKey: 'degree' },
    { label: 'University', value: 'VIT Chennai', iconKey: 'university' },
    { label: 'Focus', value: 'Full-Stack, AI/ML, Distributed Systems', iconKey: 'focus' },
    { label: 'Status', value: 'Open to opportunities', iconKey: 'status' },
  ],
  stats: [
    { value: 9.03, decimals: 2, suffix: '', label: 'CGPA', iconKey: 'cgpa' },
    { value: 1, decimals: 0, suffix: '', label: 'Research Publication', iconKey: 'publication' },
    { value: 3, decimals: 0, suffix: '', label: 'Major Projects', iconKey: 'projects' },
    { value: 85.15, decimals: 2, suffix: '%', label: 'Best mIoU on Kvasir-SEG', iconKey: 'miou' },
  ],
  whatDoTitle: 'What I Do',
  whatDo: [
    { title: 'Full-Stack Development', description: 'React, Node.js, FastAPI, REST, WebSockets', iconKey: 'full-stack' },
    { title: 'AI/ML & LLM Applications', description: 'PyTorch, LangChain, RAG, FAISS, Whisper', iconKey: 'ai-ml' },
    { title: 'Backend & Distributed Systems', description: 'Docker, microservices, OpenTelemetry, Prometheus, chaos testing', iconKey: 'backend' },
  ],
  educationLabels: {
    expected: 'Expected',
    cgpa: 'CGPA',
    coursework: 'Relevant Coursework',
  },
}

export default about
