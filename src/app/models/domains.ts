export interface Data {
  X: number;
  Y: number;
  time: number;
  button: number;
  correct: number;
}

export interface Note {
  noteId: number;
  note: string;
  medUser: User;
  testSessionId: number;
}


export interface User {
  userId: string|number;
  email?: string;
  username?: string;
  role?: Role;
  organization?: Organization;
  lat?: string;
  longitude?: string;
}


export interface Organization {
  name?: string;
}

export interface Role {
  name?: string;
}

