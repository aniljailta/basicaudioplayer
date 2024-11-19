import React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {Message} from './Message';
import {messageStyles} from '../styles/styles';

export const TranscriptView: React.FC = () => {
  const {flattenedPhrases, currentPhraseIndex} = useSelector(
    (state: RootState) => state.audioPlayer,
  );

  return (
    <ScrollView style={messageStyles.container}>
      {flattenedPhrases.map((phrase, index) => (
        <Message
          key={index}
          text={phrase.words}
          speaker={phrase.speakerName}
          isCurrentUser={phrase.speakerName === 'John'}
          isHighlighted={index === currentPhraseIndex}
        />
      ))}
    </ScrollView>
  );
};
