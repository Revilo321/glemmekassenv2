export type ErrorMessage = {
    type: string;
    message: string;
  }
  export type ErrorMessages = {
    [key: string]: ErrorMessage[];
  }