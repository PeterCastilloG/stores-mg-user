export interface User {
  success: boolean;
  data: {
    item: {
      userId: number;
      name: string;
      email: string;
      password: string;
    };
  };
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    success: boolean;
    data: {
      item: {
        userId: number;
        name: string;
        email: string;
        password: string;
      };
    };
  }
}
