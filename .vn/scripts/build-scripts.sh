#! /bin/bash
# Utility to run NCC on multiple files
# Will transform ./ts-sources/foobar.ts into a built ./foobar.js
# See https://github.com/vercel/ncc
# NOTE: you are expected to run "yarn run build:scripts" from the project root for path to be correct
vn_scripts_dir=./.vn/scripts
ts_sources_dir="$vn_scripts_dir/ts-sources"
# The printf strips the root, so result is "db/reset.ts foobar.ts" etc.
for f in `find "$ts_sources_dir"  -type f -name "*.ts" -printf '%P\n'`
do 
    echo "Build $f"
    dname=`dirname "$f"`
    fname=`basename "$f"`
    fname_no_ext=`echo "$fname" | cut -d. -f1`
    echo "Filename $fname, without ext $fname_no_ext"
    yarn run ncc build "$ts_sources_dir/$f" --no-cache --out "$vn_scripts_dir/dist"
    mkdir -p "$vn_scripts_dir/$dname"
    mv "$vn_scripts_dir/dist/index.js" "$vn_scripts_dir/$dname/$fname_no_ext".js
done
rm -R "$vn_scripts_dir/dist"