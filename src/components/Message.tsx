import React from 'react';
import {View, Text} from 'react-native';
import {messageStyles} from '../styles/styles';

interface MessageProps {
  text: string;
  speaker: string;
  isCurrentUser: boolean;
  isHighlighted?: boolean;
}

export const Message: React.FC<MessageProps> = ({
  text,
  speaker,
  isCurrentUser,
  isHighlighted,
}) => (
  <View style={messageStyles.messageContainer}>
    <Text
      style={[
        messageStyles.speakerName,
        isCurrentUser ? messageStyles.leftSpeaker : messageStyles.rightSpeaker,
      ]}>
      {speaker}
    </Text>
    <View
      style={[
        messageStyles.messageBubble,
        isCurrentUser ? messageStyles.leftBubble : messageStyles.rightBubble,
        isHighlighted && messageStyles.highlighted,
      ]}>
      <Text style={messageStyles.messageText}>{text}</Text>
    </View>
  </View>
);
