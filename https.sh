#!/bin/bash

gen_cert() {
  local val=${1:?Must provide host as arg}
  mkcert -cert-file "certs/$val.crt" -key-file "certs/$val.key" "$val"
}

gen_cert \*.svltkt.dev