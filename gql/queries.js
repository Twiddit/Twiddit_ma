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
          tags
          text
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