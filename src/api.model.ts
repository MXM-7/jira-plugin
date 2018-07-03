export interface Jira {
  serverInfo(): Promise<ServerInfo>;
  search(params: { jql: string }): Promise<Issues>;
  getProjects(): Promise<Project[]>;
  getStatuses(): Promise<Status[]>;
  // getIssue(issue: string): Promise<Issue>;
  // getTransitions(issue: string): Promise<Transitions>;
  // doTransition(issue: string, body: DoTransitionBody): Promise<void>;
  // addComment(issue: string, body: AddCommentBody): Promise<AddCommentResponse>;
}

export interface ServerInfo {
  version: string;
  versionNumbers: number[];
}

export interface Issues {
  issues: Issue[] | undefined;
  maxResults: number;
  startAt: number;
  total: number;
}

export interface Issue {
  id: string;
  key: string;
  fields: {
    summary: string;
    description?: string;
    status: {
      name: string;
    };
  };
}

export interface Project {
  key: string;
  expand: string;
  self: string;
  id: string;
  name: string;
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: any;
}

// export interface AddCommentBody {
//   body: string;
// }

// export interface AddCommentResponse {
//   id: string;
// }

// export interface Transitions {
//   transitions: Transition[];
// }

// export interface Transition {
//   id: string;
//   name: string;
//   to: {
//     name: string;
//   };
// }

// export interface DoTransitionBody {
//   transition: {
//     id: string;
//   };
// }
