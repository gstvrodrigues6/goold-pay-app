export const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatBigNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

export const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export function formatTimestamp(timestamp: string): string {
  const messageDate = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    // Se foi hoje, mostra apenas a hora
    return messageDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } else if (diffInHours < 24 * 7) {
    // Se foi esta semana, mostra o dia da semana
    return messageDate.toLocaleDateString('pt-BR', {
      weekday: 'short'
    });
  } else {
    // Se foi há mais tempo, mostra a data
    return messageDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}

export function getTotalUnreadCount(conversations: any[]): number {
  return conversations.reduce((total, chat) => total + chat.unreadCount, 0);
}

export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
