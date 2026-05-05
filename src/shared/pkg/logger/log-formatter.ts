export const formatTimestamp = (date: Date = new Date()): string => {
   const iso = date.toISOString();
   return iso;
};

export const formatLogLevel = (level: string): string => {
   const levels: Record<string, string> = {
      trace: 'TRACE',
      debug: 'DEBUG',
      info: 'INFO',
      warn: 'WARN',
      error: 'ERROR',
      fatal: 'FATAL',
   };

   return levels[level.toLowerCase()] ?? 'UNKNOWN';
};

export const formatLog = (
   timestamp: string,
   level: string,
   context: string,
   message: string,
   metadata?: Record<string, unknown>,
): string => {
   const formattedLevel = formatLogLevel(level);
   const metadataStr = metadata ? ` ${JSON.stringify(metadata)}` : '';

   return `[${timestamp}] [${formattedLevel}] ${context} - ${message}${metadataStr}`;
};
