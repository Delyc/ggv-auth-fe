import { gql } from "@apollo/client";

const APPLY_VISA = gql`
  mutation createVisaHolder(
    $passport_no: String!
    $passport_expiry: Date!
    $user: ID!
    $first_name: String!
    $last_name: String!
    $conservation_areas: [ID!]
  ) {
    createVisaHolder(
      data: {
        passport_no: $passport_no
        passport_expiry: $passport_expiry
        user: $user
        first_name: $first_name
        last_name: $last_name
        conservation_areas: $conservation_areas
      }
    ) {
      data {
        id
        attributes {
          first_name
          last_name
          passport_no
          
        }
      }
    }
  }
`;

export { APPLY_VISA };
