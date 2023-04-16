#!/bin/bash

DANGEROUSLY_DISABLE_HOST_CHECK=true HTTPS=true SSL_CRT_FILE=cert.crt SSL_KEY_FILE=cert.key yarn start
