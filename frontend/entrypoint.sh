#!/bin/sh
 
ROOT_DIR=/app
 
echo "Replacing env constants in JS"
for file in $ROOT_DIR/assets/*.js
do
  echo "Processing $file, replacing API_URL with ${VITE_API_URL}...";
 
  sed -i 's|http://API_PLACEHOLDER|'${VITE_API_URL}'|g' $file
 
done