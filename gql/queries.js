import {gql} from "apollo-boost";

export const login=gql `
query login($email:String!, $password:String!){
    login(loginBody:{
        email: $email,
        password: $password
      }){
        message
        data{
          accessToken
        }
    
    }
}`;

export const register=gql `
mutation register($email:String!, $password:String!, $birthday: String!, $phone: String!, $description: Int!, $username: String!){
  register(registerBody:{
    email: $email,
    password: $password,
    birthday: $birthday,
    phone:$phone,
    profilePhoto:"https://dummyimage.com/640x360/fff/aaa", 
	  description:$description,  
	  username:$username
  })
  {
  	message  
  }
}`;
