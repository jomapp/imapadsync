import { AdSyncProcessesOptimizer } from './AdSyncProcessesOptimizer.js';
import { ImapSyncSessionMailbox } from '../../ImapSyncSessionMailbox.js';
import { SyncSessionEventListener } from '../../ImapSyncSession.js';

export class AdSyncSingleProcessesOptimizer extends AdSyncProcessesOptimizer {
  constructor(
    mailboxes: ImapSyncSessionMailbox[],
    syncSessionEventListener: SyncSessionEventListener
  ) {
    super(mailboxes, 0, 0, syncSessionEventListener); // setting optimizationDifference and optimizationInterval to zero (0)
  }

  override startAdSyncOptimizer(): void {
    super.startAdSyncOptimizer();
    this.startSyncSessionProcesses(1);
  }

  override forceStopSyncSessionProcess(
    processId: number,
    _isExceededRateLimit: boolean = false
  ) {
    super.forceStopSyncSessionProcess(processId);
  }
}
