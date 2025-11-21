export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatConfig {
  title: string;
  subtitle: string;
  placeholder: string;
  welcomeMessage: string;
}
