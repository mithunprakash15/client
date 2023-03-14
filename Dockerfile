FROM node:alpine
WORKDIR ./
ENV PATH /node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install --save react@18.1.0 
RUN npm install --save --save-exact react-scripts@5.0.0

COPY . ./
CMD ["npm", "start"]