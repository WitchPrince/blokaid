#!/bin/bash


npm install
npm audit fix --force


anchor build
anchor deploy --provider.cluster devnet
