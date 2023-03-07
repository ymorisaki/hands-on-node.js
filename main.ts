import * as fs from 'fs'
import * as crypt from 'crypto'

const readStream = (src: string, dest: string, cb: () => void) => {
  fs.createReadStream(src)
    .pipe(crypt.createHash('sha256'))
    .pipe(fs.createWriteStream(dest))
    .on('finish', cb)
}

readStream('src.txt', 'dest.txt', () => console.log('copy end'))