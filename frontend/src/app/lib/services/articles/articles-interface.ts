interface IObjectKeys {
  [key: string]: string | undefined;
}

export interface IArticle  extends IObjectKeys {
  id: string;
  userId?: string;
  title: string;
  body: string;
  updated_at?: string;
  date?: any
  formatDate?: any
}

