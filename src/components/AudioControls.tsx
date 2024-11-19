import React from 'react';
import {Text, View} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  forward,
  rewind,
  setAudioProgress,
  setPlaying,
} from '../features/audioPlayer/audioPlayerSlice';
import {RootState} from '../store';
import {controlStyles} from '../styles/styles';

interface AudioControlsProps {
  duration: number;
}

export const AudioControls: React.FC<AudioControlsProps> = ({duration}) => {
  const dispatch = useDispatch();
  const {isPlaying, audioProgress, currentPhraseIndex, flattenedPhrases} =
    useSelector((state: RootState) => state.audioPlayer);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    try {
      if (isPlaying) {
        SoundPlayer.pause();
      } else {
        SoundPlayer.play();
      }
      dispatch(setPlaying(!isPlaying));
    } catch (error) {
      console.error('Error handling play/pause:', error);
    }
  };

  const handleForward = () => {
    if (currentPhraseIndex < flattenedPhrases.length - 1) {
      const nextPhrase = currentPhraseIndex + 1;
      let timeToSeek = 0;

      for (let i = 0; i < nextPhrase; i++) {
        timeToSeek += (flattenedPhrases[i].time + 250) / 1000;
      }

      try {
        SoundPlayer.seek(timeToSeek);
        dispatch(setAudioProgress(timeToSeek));
        dispatch(forward());
      } catch (error) {
        console.error('Error seeking forward:', error);
      }
    }
  };

  const handleRewind = () => {
    if (currentPhraseIndex > 0) {
      const prevPhrase = currentPhraseIndex - 1;
      let timeToSeek = 0;

      for (let i = 0; i < prevPhrase; i++) {
        timeToSeek += (flattenedPhrases[i].time + 250) / 1000;
      }

      try {
        SoundPlayer.seek(timeToSeek);
        dispatch(setAudioProgress(timeToSeek));
        dispatch(rewind());
      } catch (error) {
        console.error('Error seeking backward:', error);
      }
    } else {
      try {
        SoundPlayer.seek(0);
        dispatch(setAudioProgress(0));
      } catch (error) {
        console.error('Error seeking to start:', error);
      }
    }
  };

  const progress = duration ? (audioProgress / duration) * 100 : 0;

  return (
    <View style={controlStyles.container}>
      <View style={controlStyles.progressBar}>
        <View style={[controlStyles.progress, {width: `${progress}%`}]} />
      </View>
      <View style={controlStyles.timeContainer}>
        <Text style={controlStyles.timeText}>{formatTime(audioProgress)}</Text>
        <Text style={controlStyles.timeText}>{formatTime(duration)}</Text>
      </View>
      <View style={controlStyles.controls}>
        <Icon
          name="fast-rewind"
          size={28}
          color="#000"
          onPress={handleRewind}
        />
        <View style={controlStyles.playButton}>
          <Icon
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={28}
            color="#000"
            onPress={handlePlayPause}
          />
        </View>
        <Icon
          name="fast-forward"
          size={28}
          color="#000"
          onPress={handleForward}
        />
      </View>
    </View>
  );
};
