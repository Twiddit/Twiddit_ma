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
          userId
        }
    
    }
}`;

export const register=gql `
mutation register($username: String!, $email:String!, $password:String!, $birthday: String!, $phone: String!, $description: String!){
  register(registerBody:{
    username:$username
    email: $email,
    password: $password,
    birthday: $birthday,
    phone:$phone,
	  description:$description,  
    profilePhoto:"https://dummyimage.com/640x360/fff/aaa", 
	  
  })
  {
  	message  
  }
}`;

export const changePassword=gql`
mutation password($previous: String!, $new: String!, $authorization: String!){
  password(passwordChangeBody:{
    Previous: $previous
    NewPass: $new,
    Authorization: $authorization
  }) {
    message
  }
}
`

export const updateProfile=gql`
mutation updateProfile($userId: Int!, $email:String!, $phone: String!, $description: String!){
  updateProfile(id: $userId, profile: {
      email: $email
      phone: $phone
      description: $description
  }){
      email
      birthday
      phone
      profile_photo
      description
      username
  }
}

`

export const twidditFeed=gql`
query userFeed($userId: Int!){
  userFeed(userId: $userId){
    user{
      username 
    }
    twiddit {
      twiddit {
        communidditsId
        retwidditId
        text
        imageURL1
        imageURL2
        imageURL3
        imageURL4
        videoURL
      }
      number_of_replies
    }
  }
}
`
export const userProfileData=gql`
query viewProfile($userId: Int!){
  viewProfile(id:$userId){
    username
    email
    birthday
    phone
    profile_photo
    description
  }
}
`

export const userTwiddits=gql`
query MyTwiddits($userId: Int!){
    myTwiddits(userId:$userId){
      user {
        username
      }
      twiddit {
        twiddit {
          _id
          tags
          text
          imageURL1
          imageURL2
          imageURL3
          imageURL4
          communidditsId
          creationDate
          
        }
      }
    }
}

`

export const communidditsAll=gql`
query{
  communidditsAll{
    aboutUs
    name
  }
}
`

export const communidditFeed=gql`
query communidditFeed($communidditId:Int!){
  communidditsFeed(communidditId:$communidditId){
    user {
      username
    }
    twiddit {
      twiddit {
        text
        creationDate
      }
    }
  }
}
`

export const newTwiddit=gql`
mutation createTwiddit($userId: Int!, $text:String!, $creationDate:String!, $imageURL1: String!, $imageURL2: String!, $imageURL3: String!, $imageURL4: String!){
  createTwiddit(twiddit: {
    userId: $userId,
    text: $text,
    creationDate: $creationDate,
    imageURL1: $imageURL1,
    imageURL2: $imageURL2,
    imageURL3: $imageURL3,
    imageURL4: $imageURL4
	}){
    _id
    text
    retwidditId
  }
}`