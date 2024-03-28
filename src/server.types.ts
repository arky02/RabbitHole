export interface ClassProp {
  school_id: number;
  class_no: number;
  grade: number;
  year: number;
  class_name: string | null;
  class_id: number;
}

export interface createSessionRes {
  data: {
    message: string;
    session_id: number;
    class_id: number;
    session_key: number;
    teacher_id: number;
  };
  status: number;
}
