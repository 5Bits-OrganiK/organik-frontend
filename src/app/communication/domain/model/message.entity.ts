export class Message {
  id: string;
  sender: string;
  receiver: string;
  subject: string;
  body: string;
  read: boolean;
  starred: boolean;
  sentAt: string;

  constructor(resource: Partial<Message> & Pick<Message, 'id' | 'sender' | 'receiver' | 'subject' | 'body' | 'sentAt'>) {
    this.id = resource.id;
    this.sender = resource.sender;
    this.receiver = resource.receiver;
    this.subject = resource.subject;
    this.body = resource.body;
    this.read = resource.read || false;
    this.starred = resource.starred || false;
    this.sentAt = resource.sentAt;
  }

  markAsRead(): void {
    this.read = true;
  }

  toggleStarred(): void {
    this.starred = !this.starred;
  }
}
