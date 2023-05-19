FROM node:18

WORKDIR /home/app

COPY yarn.lock /home/app

RUN yarn install
RUN yarn add expo@^48.0.0
RUN yarn add @react-native-async-storage/async-storage
RUN yarn add @apollo/client graphql

COPY . /home/app
EXPOSE 19000

CMD ["npm", "start"]
