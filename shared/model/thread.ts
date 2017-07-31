

export interface Thread {
  id: number;
  messageIds: number[]
  // number of unread messages
  participants: {[key: number]: number}
}
