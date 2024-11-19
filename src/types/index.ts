export interface Phrase {
    words: string;
    time: number;
  }
  
  export interface Speaker {
    name: string;
    phrases: Phrase[];
  }
  
  export interface TranscriptMetadata {
    pause: number;
    speakers: Speaker[];
  }