#!/bin/bash

openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
  -keyout cert.key -out cert.crt -extensions san -config \
  <(
    echo "[req]"
    echo distinguished_name=req
    echo "[san]"
    echo subjectAltName=DNS:localhost,DNS:dev
  ) \
  -subj "/CN=localhost"
