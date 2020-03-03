import gql from 'graphql-tag';
/**
 * Query the current users details.
 */
export const CURRENT_USER_QUERY = gql`
  query {
    user {
      id
      email
      lastName
      firstName
    }
  }
`;
export const CURRENT_USER_QUERY_ID = gql`
  query {
    user {
      id
    }
  }
`;

/**
 * Sign up a new user mutation.
 */
export const USER_SIGN_UP_MUTATION = gql`
  mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
    userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
      id
      email
    }
  }
`;
export const TASKS_QUERY = gql`
  query {
    todosList {
      count
      items {
        text
        complited
      }
    }
  }
`;
export const BOOKS_QUERY = gql`
  query {
    booksList {
      count
      items {
        id
        title
        updatedAt
        createdAt
      }
    }
  }
`;
export const BOOKS_SUBSCRIPTION = gql`
  subscription {
    Books(filter: { mutation_in: [create, update] }) {
      node {
        id
        title
        body
        updatedAt
      }
    }
  }
`;
export const ADD_TASK = gql`
  mutation AddTask($data: TaskCreateInput!) {
    taskCreate(data: $data) {
      id
    }
  }
`;
export const UPDATE_TASK_COMPLITED = gql`
  mutation TaskUpdate($id: ID!) {
    taskUpdate(data: { complited: true }, filter: { id: $id }) {
      id
    }
  }
`;
export const UPDATE_TASK_NAME = gql`
  mutation TaskUpdate($id: ID!, $name: String!) {
    taskUpdate(data: { task: $name }, filter: { id: $id }) {
      id
    }
  }
`;
export const TASK_DELETE = gql`
  mutation TaskDelete($id: ID!) {
    taskDelete(filter: { id: $id }) {
      success
    }
  }
`;
export const QUERY_TASK_BY_RANGE = gql`
  query Tasks($start: BigInt!, $end: BigInt!, $user: ID!) {
    tasksList(
      filter: {
        date: { gte: $start, lte: $end }
        user: { every: { id: { equals: $user } } }
        complited: { not_equals: true }
      }
    ) {
      items {
        id
        task
      }
    }
  }
`;
export const QUERY_TASKS_ALL = gql`
  query Tasks($user: ID!) {
    tasksList(filter: { user: { every: { id: { equals: $user } } }, complited: { not_equals: true } }) {
      items {
        id
        task
      }
    }
  }
`;
export const QUERY_TASKS_COMPLITED = gql`
  query Tasks($user: ID!) {
    tasksList(filter: { user: { every: { id: { equals: $user } } }, complited: { equals: true } }) {
      items {
        id
        task
        complited
      }
    }
  }
`;
/* `
const s = gql`
  query MyQuery {
    __typename
    tasksList(
      filter: {
        date: { gte: "21323", lte: "31232" }
        user: { every: { id: { equals: "asdasdasd" } } }
        complited: { not_equals: true }
      }
    ) {
      items {
        id
        task
        complited
      }
    }
  }
`;
` 

taskDelete(filter: {id: "\"asdsadasd\""}) {
    success
  }

*/
