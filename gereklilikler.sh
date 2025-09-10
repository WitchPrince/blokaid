#!/bin/bash

#npm install ile gereklilikleri kur
npm install
npm audit fix --force

#anchor build ile projeyi derle ve program id almak için anchor deploydaki çıktıyı baz al
anchor build
anchor deploy --provider.cluster devnet
