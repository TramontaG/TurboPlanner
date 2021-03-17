# Always initiate the docker file with from command
FROM reactnativecommunity/react-native-android

# Who maintain the image
MAINTAINER Tramonta

# Where is the root folder to init
WORKDIR ./dockerImage

COPY . .

RUN npm run build
COPY ./android/app/build/outputs/apk/release ./dockerImage