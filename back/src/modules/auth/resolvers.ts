// External Packages
import * as jwt from 'jsonwebtoken';

import { pbkdf2Sync } from 'pbkdf2';
import { GraphQLDateTime } from 'graphql-custom-types';

// Utils
import { compose } from '../../utils/composable';
import { authResolver, hashPassword } from '../../utils/auth';

// Entities
import { User } from '../../entities/User';

export const resolvers = {
  Query: {
    // Validate Token
    validateToken: compose(authResolver)(() => {
      return true;
    }),
    // Login
    async login(_: any, args: any) {
      const validatePassword = (key: string, pass: string) => {
        const parts = pass.split('$');
        const iterations = parseInt(parts[1], 10);
        const salt = parts[2];

        return (
          pbkdf2Sync(key, salt, iterations, 32, 'sha256').toString('base64') ===
          parts[3]
        );
      };

      const { email, password } = args;

      const user = await User.findOne({ email });

      if (user === undefined) {
        throw new Error('User not found');
      } else {
        if (!validatePassword(password, user.password)) {
          throw new Error('Password incorrect');
        } else {
          const token = jwt.sign({}, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_TTL,
          });

          return {
            user,
            token,
          };
        }
      }
    },
  },
  Mutation: {
    // Add User
    addUser: compose(authResolver)(async (_: any, args: any) => {
      const { firstName, lastName, email, password } = args;

      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = hashPassword(password);
      await user.save();

      return 'User Created';
    }),
  },
  GraphQLDateTime,
};
