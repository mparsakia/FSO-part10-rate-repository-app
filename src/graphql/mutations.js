import { gql } from 'apollo-boost';

export const AUTHORIZE = gql`
  mutation Authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      user {
        id
        username
        reviewCount
      }
      accessToken
      expiresAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      user {
        username
      }
      repositoryId
      id
      rating
      createdAt
      text
    }
  }
`;

export const SIGN_UP = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;
