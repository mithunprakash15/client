FROM node:alpine
WORKDIR /
ENV PATH /node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@2.1.3 -g --silent
COPY . ./
CMD ["npm", "start"]