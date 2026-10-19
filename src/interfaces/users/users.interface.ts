export interface singUpI {
  userName: string;
  email: string;
  password: string;
}
export interface loginI {
  userName: string;
  email: string;
  password: string;
}

export interface sendMailI {
  email: string;
  type: "VERIFY" | "RESET_PASSWORD";
  userId: number;
}
