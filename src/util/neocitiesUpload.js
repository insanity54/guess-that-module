const NeoCities = require('neocities');
const api = new NeoCities('vocaloid01', process.env.NEOCITIES_API_KEY)
const globby = require('globby');
const path = require('path');

globby(path.join(__dirname, '..', '..', 'dist/*')).then((paths) => {
  // console.log(paths);
  let pathsObject = paths.map((p) => {
    return { name: path.basename(p), path: p };
  });
  console.log(`uploading files to neocities...`);
  api.upload(pathsObject, function(res) {
    console.log(res)
  })
});
