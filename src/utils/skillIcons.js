import { FaCloud, FaCode, FaCuttlefish, FaCss3Alt, FaDatabase, FaDocker, FaGithub, FaGitAlt, FaGlobe, FaHtml5, FaJs, FaLinux, FaMicrochip, FaNetworkWired, FaNodeJs, FaPython, FaReact, FaServer, FaWindows } from 'react-icons/fa'
import { SiCplusplus, SiExpress, SiFastapi, SiMongodb, SiOpencv, SiPytorch, SiStreamlit } from 'react-icons/si'
import { FiBox, FiCode, FiCpu, FiDatabase, FiGitBranch, FiLayers, FiMessageSquare, FiSearch, FiZap } from 'react-icons/fi'

const iconMap = {
  java: { icon: FaCode, color: '#f89820' },
  python: { icon: FaPython, color: '#3776ab' },
  c: { icon: FaCuttlefish, color: '#659ad2' },
  cpp: { icon: SiCplusplus, color: '#00599c' },
  javascript: { icon: FaJs, color: '#f7df1e' },
  react: { icon: FaReact, color: '#61dafb' },
  node: { icon: FaNodeJs, color: '#68a063' },
  express: { icon: SiExpress, color: '#e5e7eb' },
  fastapi: { icon: SiFastapi, color: '#009688' },
  html: { icon: FaHtml5, color: '#e34f26' },
  css: { icon: FaCss3Alt, color: '#1572b6' },
  mongodb: { icon: SiMongodb, color: '#47a248' },
  docker: { icon: FaDocker, color: '#2496ed' },
  git: { icon: FaGitAlt, color: '#f05032' },
  github: { icon: FaGithub, color: '#e5e7eb' },
  linux: { icon: FaLinux, color: '#fcc624' },
  windows: { icon: FaWindows, color: '#0078d4' },
  pytorch: { icon: SiPytorch, color: '#ee4c2c' },
  opencv: { icon: SiOpencv, color: '#5c3ee8' },
  streamlit: { icon: SiStreamlit, color: '#ff4b4b' },
  vscode: { icon: FaCode, color: '#007acc' },
  api: { icon: FaGlobe, color: '#22d3ee' },
  websockets: { icon: FiZap, color: '#22d3ee' },
  microservices: { icon: FaMicrochip, color: '#a855f7' },
  http: { icon: FaNetworkWired, color: '#22d3ee' },
  sql: { icon: FaDatabase, color: '#6366f1' },
  nosql: { icon: FiDatabase, color: '#a855f7' },
  mongoose: { icon: FiDatabase, color: '#880000' },
  'data-model': { icon: FiLayers, color: '#22d3ee' },
  oci: { icon: FaCloud, color: '#f80000' },
  langchain: { icon: FiGitBranch, color: '#22d3ee' },
  rag: { icon: FiSearch, color: '#a855f7' },
  llms: { icon: FiMessageSquare, color: '#6366f1' },
  faiss: { icon: FiDatabase, color: '#22d3ee' },
  whisper: { icon: FiMessageSquare, color: '#a855f7' },
  algorithms: { icon: FiCode, color: '#6366f1' },
  os: { icon: FaServer, color: '#22d3ee' },
  networks: { icon: FaNetworkWired, color: '#22d3ee' },
  dbms: { icon: FiDatabase, color: '#6366f1' },
  oop: { icon: FiBox, color: '#a855f7' },
  'distributed-systems': { icon: FaServer, color: '#22d3ee' },
}

export function getSkillIcon(iconKey) {
  return iconMap[iconKey] || { icon: FiCpu, color: '#94a3b8' }
}

export default iconMap
