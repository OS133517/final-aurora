FROM nginx

RUN mkdir /app

WORKDIR /app

RUN mkdir ./build

ADD ./build ./build

RUN rm /etc/nginx/conf.d/default.conf
# .d : directory
# default.conf를 삭제한다 

COPY ./nginx.conf /etc/nginx/conf.d
# ./nginx.conf 얘를 대상 위치에 생성 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]