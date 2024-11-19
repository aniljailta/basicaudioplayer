import {StyleSheet, Dimensions} from 'react-native';
import {theme} from './theme';

const {width} = Dimensions.get('window');

export const messageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  messageContainer: {
    marginVertical: theme.spacing.sm,
    maxWidth: width * 0.8,
  },
  speakerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  leftSpeaker: {
    textAlign: 'left',
    color: theme.colors.primary,
  },
  rightSpeaker: {
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  messageBubble: {
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    maxWidth: '80%',
  },
  leftBubble: {
    backgroundColor: theme.colors.gray.light,
    alignSelf: 'flex-start',
  },
  rightBubble: {
    backgroundColor: theme.colors.white,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  highlighted: {
    backgroundColor: theme.colors.secondary,
  },
});

export const controlStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray.medium,
  },
  progressBar: {
    height: theme.spacing.xs,
    backgroundColor: theme.colors.gray.medium,
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.sm,
  },
  progress: {
    width: '20%',
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.small,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  timeText: {
    color: theme.colors.gray.dark,
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
