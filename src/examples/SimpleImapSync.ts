import { ImapAdSync } from '../ImapAdSync.js';
import { ImapAccount, ImapSyncState } from '../lib/ImapSyncState.js';
import {
  AdSyncEventListener,
  AdSyncEventType,
} from '../lib/AdSyncEventListener.js';
import { ImapMailbox, ImapMailboxStatus } from '../lib/imapmail/ImapMailbox.js';
import { ImapMail } from '../lib/imapmail/ImapMail.js';
import { ImapError } from '../lib/imapmail/ImapError.js';

class SimpleImapSync implements AdSyncEventListener {
  private imapAdSync = new ImapAdSync(this);

  async runSync() {
    let imapAccount: ImapAccount = {
      host: 'imap.examplemail.com',
      port: 993,
      username: 'username',
      password: '12345678',
    };
    let maxQuota = 25000000000;
    let imapMailboxStates = [];
    let imapSyncState = new ImapSyncState(
      imapAccount,
      maxQuota,
      imapMailboxStates
    );

    await this.imapAdSync.startAdSync(imapSyncState);
  }

  async onMailbox(imapMailbox: ImapMailbox, eventType: AdSyncEventType) {
    console.log(
      `onMailbox ${AdSyncEventType[eventType]} event received => imapMailbox: ${imapMailbox}`
    );
  }

  async onMailboxStatus(imapMailboxStatus: ImapMailboxStatus) {
    console.log(
      `onMailboxStatus event received => imapMailboxStatus: ${imapMailboxStatus}`
    );
  }

  async onMail(imapMail: ImapMail, eventType: AdSyncEventType) {
    console.log(
      `onMail ${AdSyncEventType[eventType]} event received => imapMail: ${imapMail}`
    );
  }

  async onPostpone(postponedUntil: Date) {
    console.log(
      `onPostpone event received => postponedUntil: ${postponedUntil}`
    );
  }

  async onFinish(downloadedQuota: number) {
    console.log(
      `onFinish event received => downloadedQuota: ${downloadedQuota}`
    );
  }

  async onError(imapError: ImapError) {
    console.log(`onError event received => imapError: ${imapError.error}`);
  }
}

const simpleImapSync = new SimpleImapSync();
simpleImapSync.runSync().then(() => {
  console.log(`Simple IMAP synchronization started...`);
});
