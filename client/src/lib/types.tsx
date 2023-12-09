export type ErrorDetail = {
  field: string;
  message: string;
};

export type ErrorData = {
  code: string;
  status: number;
  message: string;
  details: ErrorDetail[];
};

export interface RegisterInputType {
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHERS';
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoggedInUser {
  id: string;
  profileId: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface JwtToken {
  user: LoggedInUser;
  iat: number;
  exp: number;
}

export interface Message {
  id: string;
  conversationId: string;
  status?: 'SENDING' | 'DELIVERED' | 'ERROR';
  messageText: string;
  createdAt: string;
  sender: {
    id: string;
    profile: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
  localMessageId?: string;
}

export interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  lastMessageAt: string;
  users: any[];
  messages: {
    id: string;
    messageText: string;
    seenIds: string[];
  };
}
