import * as vscode from 'vscode';
import { IssueItem } from '../explorer/item/issue-item';
import { selectAssignee } from '../shared/select-utilities';
import state, { canExecuteJiraAPI, isWorkingIssue, printErrorMessageInOutput } from '../state/state';
import { Command } from './shared/command';

export class ChangeIssueAssigneeCommand implements Command {
  public id = 'jira-plugin.changeIssueAssigneeCommand';

  public async run(issueItem: IssueItem): Promise<void> {
    try {
      if (issueItem && issueItem.issue && canExecuteJiraAPI()) {
        let issue = issueItem.issue;
        // verify if it's the current working issue
        if (!isWorkingIssue(issue.key)) {
          let assignee = await selectAssignee(false, false);
          if (!!assignee) {
            // call Jira API
            const res = await state.jira.setAssignIssue({ issueKey: issue.key, assignee: assignee });
            await vscode.commands.executeCommand('jira-plugin.refresh');
          }
        }
      } else {
        if (canExecuteJiraAPI()) {
          printErrorMessageInOutput('Use this command from Jira Plugin EXPLORER');
        }
      }
    } catch (err) {
      printErrorMessageInOutput(err);
    }
  }
}
