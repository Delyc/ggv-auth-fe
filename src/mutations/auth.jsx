import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation  register($username: String!, $password: String!, $email:String!) {
    register(input: {username:$username, email: $email password:$password}) {
        jwt
        user {
            id
            email
            username
        }
    },


}
  
`;



const CREATE_USER_MUTATION = gql`
mutation user_details($data: UserDetailInput!) {
  createUserDetail(data: $data) {
    data {
      attributes {
        first_name
        last_name
      user {
        data {
          id
          attributes {
            email
            username
          }

        }
      }
      }
    }
  }
}
  
  `
const LOGIN_MUTATION = gql`
  mutation  login($username: String!, $password: String!) {
    login(input: {identifier:$username, password:$password}) {
        jwt
        user {
            id
            email
            username
        }
    }
}
    
`;

export const DELETE_USER = gql`
mutation DeleteUsersPermissionsUser($id: ID!) {
  deleteUsersPermissionsUser(id: $id) {
    data {
      id
    }
  }
}
`


export { SIGNUP_MUTATION, LOGIN_MUTATION, CREATE_USER_MUTATION };