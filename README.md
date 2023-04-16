# wiwa web app

Woodworking Industry Web Application.

- [Apache License 2.0](./LICENSE)

## build

- [Docker](https://docs.docker.com/get-docker/)

```shell
./build.sh
```

or

```shell
docker build -t sk.janobono.wiwa/wiwa-web-app:latest .
```

## local run with ssl

I had a security problem cause my development machine is Hyper-v virtual machine, and I wanted to access
application from host OS. Easiest way for me was to generate certificates and import them into root certificates
on my host.

### generate certificate

```shell
./gen-ssl-cert.sh
```

### start with generated certificate and disabled host checking

```shell
./start-with-ssl.sh
```
