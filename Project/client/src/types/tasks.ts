export type Task = {
  id?: string;
  text: string;

  deadline?: string | null;
  isCompleted?: boolean;
  category?: TASK_CATEGORIES;
};

export enum TASK_CATEGORIES {
  NONE = 0,
  WORK = 1,
  CHORES = 2,
  LEISURE = 3
}