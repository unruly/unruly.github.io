#!/bin/bash

set -x

echo "Updating Jobs XML"

cd $(mktemp -d)

wget  --no-check-certificate -O "jobs.xml" "https://unruly.co/?s=java%20london&feed=rss2"
mv jobs.xml /usr/share/nginx/rss/

echo "Done!"
