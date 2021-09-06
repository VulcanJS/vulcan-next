#! /bin/bash
# Utility to run NCC on multiple files
# Will transform ./ts-sources/foobar.ts into a built ./foobar.js
# See https://github.com/vercel/ncc
# NOTE: you are expected to run "yarn run build:scripts" from the project root for path to be correct
vn_scripts_dir=./.vn/scripts
for f in "$vn_scripts_dir/ts-sources"/*
do 
    echo "Build $f"
    fname=`basename "$f"`
    fname_no_ext=`echo "$fname" | cut -d. -f1`
    echo "Filename $fname, without ext $fname_no_ext"
    yarn run ncc build "$f" --no-cache --out "$vn_scripts_dir/dist"
    mv "$vn_scripts_dir/dist/index.js" "$vn_scripts_dir/$fname_no_ext".js
done
rm -R "$vn_scripts_dir/dist"