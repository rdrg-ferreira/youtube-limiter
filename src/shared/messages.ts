import type { BlockDecision, UsageState } from './types';

export type UsageTickMessage = {     
    type: 'USAGE_TICK';   
    payload: {        
        videoTimeSeconds: number;
        videoId?: string; 
    };                    
};

export type VideoStartedMessage = {
    type: 'VIDEO_STARTED';
    payload: {
        videoId: string;
        title?: string;
    }
};

export type GetStatusMessage = {
    type: 'GET_STATUS';
};

export type RequestUnlockMessage = {
    type: 'REQUEST_UNLOCK';
};

export type UnlockAnswerMessage = {
    type: 'UNLOCK_ASWER';
    payload: {
        challengeId: string;
        answer: string;
    }
}

export type ExtensionMessage =                                     
      | UsageTickMessage
      | VideoStartedMessage  
      | GetStatusMessage   
      | RequestUnlockMessage
      | UnlockAnswerMessage;

export type MessageResponseMap = {
      USAGE_TICK: BlockDecision;
      VIDEO_STARTED: BlockDecision;
      GET_STATUS: { usage: UsageState; decision: BlockDecision };
      REQUEST_UNLOCK: { challengePrompt: string; challengeId: string };
      UNLOCK_ANSWER: { success: boolean; error?: string };
    };