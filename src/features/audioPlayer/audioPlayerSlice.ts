import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TranscriptMetadata, Phrase} from '../../types';

interface AudioPlayerState {
  isPlaying: boolean;
  currentPhraseIndex: number;
  flattenedPhrases: Array<{speakerName: string} & Phrase>;
  pause: number;
  audioProgress: number;
}

const initialState: AudioPlayerState = {
  isPlaying: false,
  currentPhraseIndex: 0,
  flattenedPhrases: [],
  pause: 250,
  audioProgress: 0,
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentPhraseIndex: (state, action: PayloadAction<number>) => {
      state.currentPhraseIndex = action.payload;
    },
    setAudioProgress: (state, action: PayloadAction<number>) => {
      state.audioProgress = action.payload;
    },
    loadTranscript: (state, action: PayloadAction<TranscriptMetadata>) => {
      const flattenedPhrases: Array<{speakerName: string} & Phrase> = [];

      const maxPhrases = Math.max(
        ...action.payload.speakers.map(speaker => speaker.phrases.length),
      );

      for (let i = 0; i < maxPhrases; i++) {
        action.payload.speakers.forEach(speaker => {
          if (speaker.phrases[i]) {
            flattenedPhrases.push({
              ...speaker.phrases[i],
              speakerName: speaker.name,
            });
          }
        });
      }

      state.flattenedPhrases = flattenedPhrases;
      state.pause = action.payload.pause;
    },
    forward: state => {
      if (state.currentPhraseIndex < state.flattenedPhrases.length - 1) {
        state.currentPhraseIndex += 1;
      }
    },
    rewind: state => {
      if (state.currentPhraseIndex > 0) {
        state.currentPhraseIndex -= 1;
      }
    },
  },
});

export const {
  setPlaying,
  setCurrentPhraseIndex,
  loadTranscript,
  forward,
  rewind,
  setAudioProgress,
} = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
