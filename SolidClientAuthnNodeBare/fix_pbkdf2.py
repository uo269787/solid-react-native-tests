import re
import fileinput

file = 'node_modules/parse-asn1/node_modules/pbkdf2/lib/default-encoding.js'
with open(file, 'r+') as f:
    code = f.read()
    code = re.sub('global\.(\".*\")', r'\1', code)
    f.seek(0)
    f.write(code)
    f.truncate()