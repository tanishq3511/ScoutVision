import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: "us-east-2_PkoPLGONz",
    ClientId: "592pj6sif6nbbhkb67ksdt3iv8"
}

export default new CognitoUserPool(poolData);