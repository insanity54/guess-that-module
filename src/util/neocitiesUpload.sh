#!/bin/bash

# Requires a .netrc file with neocities.org credentials
# Example .netrc file contents--
#
# machine neocities.org
#     login vocaloid01
#     password rosebud


bindir="$(dirname "$(readlink -fm "$0")")"
cd "${bindir}/../../dist"
find . -type f -exec curl --progress-bar --verbose --netrc-file ../.netrc -n -T {} --create-dirs https://neocities.org/webdav/{} \;

if [ ! $? -eq 0 ]; then
  echo 'there was a problem while uploading files.'
  exit 155
else
  echo 'all done! no errors.'
  exit 0
fi
