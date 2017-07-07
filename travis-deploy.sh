#!/usr/bin/env bash

if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
    echo "Not deploying pull request."
    exit
fi

echo -e "\nRunning Travis Deployment"
echo "Setting up Git Access"
openssl aes-256-cbc -K $encrypted_0a6cc1a5146a_key -iv $encrypted_0a6cc1a5146a_iv -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key

# Add the SSH key so it's used on git commands
eval `ssh-agent -s`
ssh-add deploy_key

# Travis uses HTTPS remotes by default, switch it to SSH
HTTPS_URL=$(git config remote.origin.url)
SSH_URL=${HTTPS_URL/https:\/\/github.com\//git@github.com:}

echo -e "\nCopying GitHub-specific files"
cp -rv ./github/* ./build/

echo -e "\nDeploying to GitHub"
TARGET_BRANCH="master"

cd ./build
rm -rf .git

git init
git checkout -B "${TARGET_BRANCH}"

git add -A .
git commit -m "release: Travis Build ${TRAVIS_BUILD_NUMBER}" --author "${GH_COMMIT_AUTHOR} <${GH_COMMIT_EMAIL}>"

git push --force "${SSH_URL}" "${TARGET_BRANCH}"
