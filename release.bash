#!/usr/bin/env bash

echo "[ Build application... ]"
make build

echo "[ Enter new release version - major.minor.patch ]"
read version

echo "[ Installing a new version and tag ]"
npm version $version

tag="v$version"

echo "[ Update repository ]"
git push origin main
git push origin $tag

echo "[ Create project release ]"

echo "[ Write release note ]"
note_file="release_note"
date +"%d.%m.%Y" > ./$note_file
echo >> ./$note_file
vim -f $note_file
note=$(cat ./$note_file)

gh release create $tag \
  --title "$tag" \
  --notes "$note"

linux=$(echo ./out/make/deb/x64/*.deb)

gh release upload $tag $linux

echo "[ Done ]"
