import SoundPlayer from 'react-native-sound-player';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {useEffect, useRef, useState} from 'react';
import {
  loadTranscript,
  setCurrentPhraseIndex,
  setPlaying,
  setAudioProgress,
} from '../features/audioPlayer/audioPlayerSlice';
import {SafeAreaView, StyleSheet} from 'react-native';
import {TranscriptView} from './TranscriptView';
import {AudioControls} from './AudioControls';

const AppContent = () => {
  const dispatch = useDispatch();
  const {
    isPlaying,
    currentPhraseIndex,
    flattenedPhrases,
    pause,
    audioProgress,
  } = useSelector((state: RootState) => state.audioPlayer);

  const [duration, setDuration] = useState<number>(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const finishedPlayingSubscription = useRef<any>(null);

  useEffect(() => {
    try {
      SoundPlayer.loadSoundFile('example_audio', 'mp3');

      SoundPlayer.getInfo().then(info => {
        setDuration(info.duration);
      });
    } catch (error) {
      console.log('Failed to load audio', error);
    }

    const sampleTranscript = {
      pause: 250,
      speakers: [
        {
          name: 'John',
          phrases: [
            {words: 'this is one phrase.', time: 1474},
            {words: 'now the second phrase.', time: 1667},
            {words: 'end with last phrase.', time: 1214},
          ],
        },
        {
          name: 'Jack',
          phrases: [
            {words: 'another speaker here.', time: 1570},
            {words: 'saying her second phrase.', time: 1989},
            {words: 'and eventually finishing up.', time: 1486},
          ],
        },
      ],
    };
    dispatch(loadTranscript(sampleTranscript));

    finishedPlayingSubscription.current = SoundPlayer.addEventListener(
      'FinishedPlaying',
      () => {
        dispatch(setPlaying(false));
        dispatch(setCurrentPhraseIndex(0));
        dispatch(setAudioProgress(0));
      },
    );

    return () => {
      SoundPlayer.stop();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      if (finishedPlayingSubscription.current) {
        finishedPlayingSubscription.current.remove();
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (isPlaying) {
      try {
        SoundPlayer.play();
        progressInterval.current = setInterval(() => {
          SoundPlayer.getInfo().then(info => {
            dispatch(setAudioProgress(info.currentTime));
          });
        }, 100);
      } catch (error) {
        console.log('Playback failed', error);
        dispatch(setPlaying(false));
      }
    } else {
      try {
        SoundPlayer.pause();
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
      } catch (error) {
        console.log('Pause failed', error);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, dispatch]);

  useEffect(() => {
    if (!isPlaying || !flattenedPhrases.length) return;

    let accumulatedTime = 0;
    const currentTime = audioProgress * 1000;

    for (let i = 0; i < flattenedPhrases.length; i++) {
      accumulatedTime += flattenedPhrases[i].time + pause;
      if (currentTime < accumulatedTime) {
        if (i !== currentPhraseIndex) {
          dispatch(setCurrentPhraseIndex(i));
        }
        break;
      }
    }
  }, [
    audioProgress,
    flattenedPhrases,
    currentPhraseIndex,
    pause,
    isPlaying,
    dispatch,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <TranscriptView />
      <AudioControls duration={duration} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AppContent;
