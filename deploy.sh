#!/bin/bash
set -ev && \
cd ./_site && \
git init && \
git config user.name "lacasebiocoutras" && \
git config user.email "lacasebiocoutras.adm@gmail.com" && \
git remote add upstream "https://$GH_TOKEN@github.com/lacasebiocoutras/site.git"  && \
git fetch upstream  && \
git reset upstream/gh-pages  && \
git add -A . && \
git commit -am 'build' && \
git push -q upstream HEAD:gh-pages && \
rm -fr .git && \
cd ../
